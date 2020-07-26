/**
 * @file
 * (Re)builds the local file-based cache.
 *
 * TODO ideally this would be hooked into the Sapper app build process (if a
 * pre-build hook existed).
 */

// import * as fs from 'fs';
// import * as path from 'path';
const fs = require('fs');
const path = require('path');
const { walk } = require('./fs');

/**
 * Returns "short_title" if it exists or "title" from given object.
 */
const page_get_title = (o) => {
	return o.short_title ? o.short_title : o.title;
};

/**
 * Builds pages' routing trails dictionary object ("hash table" by slug).
 *
 * It provides levels 1+ menus and ancestor links' active state. This does not
 * work with a tree representing page navigation hierarchy. It is meant for
 * rendering sub-menus of any depth, and for determining which items are to be
 * marked "active" in higher levels (i.e. menu items state, but also
 * breadcrumbs).
 *
 * @returns {Object} keyed by page slug, contains which nav links are active by
 * 	depth level. Level 0 (root) items are read from "menu" content. Level 1+
 *  items are provided by this function.
 */
const build_page_routing_trails = () => {
	const trails = {};
	const pages_by_depth = [];
	const deeper_pages = [];
	let items_left = 0;
	let current_depth = 0;
	let current_depth_paths = [];
	let next_depth_paths = [];
	let page_path = '';
	let page_data = {};
	let parent_page = '';

	// First, organize all pages by depth - regardless of parent-child links.
	// Level 0 (root) : all pages that have no parent.
	walk('src/entities/content/page', '.json').map((file_path) => {
		page_path = path.parse(file_path).name;
		page_data = JSON.parse(fs.readFileSync(file_path).toString());
		page_data.path = page_path;
		if ('parent_page' in page_data) {
			deeper_pages.push(page_data);
		}
		else {
			if (!pages_by_depth[current_depth]) {
				pages_by_depth[current_depth] = [];
			}
			pages_by_depth[current_depth].push(page_data);
			current_depth_paths.push(page_path);
		}
	});

	// Levels 1+.
	items_left = deeper_pages.length;
	while (items_left > 0) {
		next_depth_paths = [];
		deeper_pages.forEach((page_data) => {
			parent_page = typeof page_data.parent_page === 'string' ?
				page_data.parent_page :
				page_data.parent_page.path ;
			if (current_depth_paths.indexOf(parent_page) !== -1) {
				if (!pages_by_depth[current_depth + 1]) {
					pages_by_depth[current_depth + 1] = [];
				}
				pages_by_depth[current_depth + 1].push(page_data);
				next_depth_paths.push(page_data.path);
				items_left--;
			}
		});
		current_depth_paths = next_depth_paths;
		current_depth++;
	}

	// Now, for each page slug, set any parent or ancestor "active" page per level
	// and build levels 1+ nav links ("siblings" menus).
	pages_by_depth.forEach((items, i) => {
		current_depth = i;
		if (!pages_by_depth[current_depth + 1]) {
			return;
		}
		items.map(page_data => {
			page_path = page_data.path;

			// Set 'active' + populate children.
			pages_by_depth[current_depth + 1].forEach(next_depth_item => {
				parent_page = typeof next_depth_item.parent_page === 'string' ?
					next_depth_item.parent_page :
					next_depth_item.parent_page.path ;
				if (parent_page === page_path) {
					if (!trails[next_depth_item.path]) {
						trails[next_depth_item.path] = {};
					}
					trails[next_depth_item.path][`active_lv${current_depth}`] = page_path;
					if (!trails[page_path]) {
						trails[page_path] = {};
					}
					trails[page_path].depth = current_depth;
					trails[page_path].title = page_get_title(page_data);
					if (!trails[page_path].children) {
						trails[page_path].children = [];
					}
					trails[page_path].children.push({
						"weight": typeof next_depth_item.parent_page !== 'string' ?
							next_depth_item.parent_page.weight : 0,
						"path": next_depth_item.path,
						"title": page_get_title(next_depth_item)
					});
				}
			});

			// Finally, build the levels 1+ nav links (siblings).
			for (page_path in trails) {
				page_data = trails[page_path];
				if (page_data.hasOwnProperty('children')) {
					let child_depth = page_data.depth + 1;
					page_data.children.forEach(child_page => {
						if (!trails[child_page.path][`menu_lv${child_depth}`]) {
							trails[child_page.path][`menu_lv${child_depth}`] = '';
						}
						trails[child_page.path][`menu_lv${child_depth}`] = page_path;

						// Also set the parent level menus if available (up to level 0).
						// This is a simple reference to the slug which has the 'children'
						// key (= siblings).
						let back_to_root = page_data.depth;
						while (back_to_root >= 0) {
							if (page_data.hasOwnProperty(`menu_lv${back_to_root}`)) {
								trails[child_page.path][`menu_lv${back_to_root}`] = page_data[`menu_lv${back_to_root}`];
							}
							back_to_root--;
						}

						// Also set the ancestor 'active' if available (up to level 0).
						back_to_root = page_data.depth - 1;
						while (back_to_root >= 0) {
							if (page_data.hasOwnProperty(`active_lv${back_to_root}`)) {
								trails[child_page.path][`active_lv${back_to_root}`] = page_data[`active_lv${back_to_root}`];
							}
							back_to_root--;
						}
					});
				}
			}
		})
	});

	return trails;
}

/**
 * Writes the "routing trails" cache to a JSON static file.
 *
 * @see build_page_routing_trails()
 */
const cache_page_routing_trails = () => {
	fs.writeFileSync('src/cache/page_routing_trails.json', JSON.stringify(build_page_routing_trails()));
}

/**
 * Loads all content entities data ("singleton").
 *
 * TODO evaluate using "proper" OO design pattern implementation instead.
 */
let content_entities_data = null;
const content_entities_load_all = () => {
	if (content_entities_data) {
		return content_entities_data;
	}
	content_entities_data = {};
	walk('src/entities/content', '.json').map(file_path => {
		const content_type = file_path.split('/')[3];
		if (!(content_type in content_entities_data)) {
			content_entities_data[content_type] = [];
		}
		// Attach file path to inject cached results in build_views_results().
		const data = JSON.parse(fs.readFileSync(file_path).toString());
		data.entity_storage = {
			"backend": "file",
			"file_path": file_path
		};
		content_entities_data[content_type].push(data);
	})
	return content_entities_data;
};

/**
 * Loads all content entities data by type.
 */
const content_entities_load_all_by_type = content_type => {
	const content_entities = content_entities_load_all();
	if (!(content_type in content_entities)) {
		return;
	}
	return content_entities[content_type];
};

/**
 * Builds views cache.
 *
 * A view is like a collection of entities to be rendered as a block. It binds
 * together filters, sorting criterias, and presentational options.
 *
 * TODO evaluate "exposed" capability (i.e. using URL params like for pagers).
 */
const build_views_results = () => {
	// Find all occurrences of views in entities.
	const content_entities = content_entities_load_all();
	for (const [content_type, entities] of Object.entries(content_entities)) {
		entities.forEach(data => {
			if (!("content" in data) || typeof data.content !== 'object') {
				return;
			}
			data.content.forEach(content => {
				if (content.c !== 'View') {
					return;
				}
				let results = [];

				// TODO generic filters with AND/OR nestable groups - for now, just take
				// the first and require to filter by type(s) (OR if passing an array).
				const filter = content.props.filters.shift();
				if (typeof filter.type === "string") {
					results = content_entities_load_all_by_type(filter.type);
				}
				else {
					filter.type.forEach(type_filter => results.concat(
						content_entities_load_all_by_type(type_filter)
					));
				}

				// TODO Apply defaults fallback (filter by current route language, set
				// pager to 10 items per page, what display settings to use if not set,
				// etc).

				console.log(results);
			});
		});
	}
};

/**
 * Writes the views cache.
 *
 * Unlike cache_page_routing_trails(), the generated code will be "injected"
 * directly in place (inside the entity definition where the view is placed).
 *
 * @see build_views_results()
 */
const cache_views_results = () => {
	// TODO
	build_views_results();
}

module.exports = {
	"cache_views_results": cache_views_results,
	"cache_page_routing_trails": cache_page_routing_trails
};

/**
 * @file
 * Routing-related implementations.
 */

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

module.exports = {
	"build_page_routing_trails": build_page_routing_trails
};

/**
 * @file
 * Contains actions to run before (re)building the Sapper app.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively gets file paths from given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of file paths sorted by name.
 */
const walk = (dir, extension) => {
	const files = [];
	fs.readdirSync(dir).map(file => {
		if (fs.statSync(path.join(dir, file)).isFile()) {
			if (extension === undefined || path.extname(file) === extension) {
				files.push(path.join(dir, file));
			}
		}
		else {
			files = files.concat(walk(path.join(dir, file), extension))
		}
	});
	return files.sort();
}

/**
 * Builds pages' routing trails dictionary object.
 *
 * It provides levels 1+ menus and ancestor links "active" state.
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
	let current_depth_slugs = [];
	let next_depth_slugs = [];
	let page_slug = '';
	let page_data = {};

	// First, organize all pages by depth - regardless of parent-child links.
	// Level 0 (root) : all pages that have no parent.
	walk('src/content/page', '.json').map((file_path) => {
		page_slug = path.parse(file_path).name;
		page_data = JSON.parse(fs.readFileSync(file_path).toString());
		page_data.slug = page_slug;
		if ('parent_pages' in page_data) {
			deeper_pages.push(page_data);
		}
		else {
			if (!pages_by_depth[current_depth]) {
				pages_by_depth[current_depth] = [];
			}
			pages_by_depth[current_depth].push(page_data);
			current_depth_slugs.push(page_slug);
		}
	});

	// Levels 1+.
	items_left = deeper_pages.length;
	while (items_left > 0) {
		next_depth_slugs = [];
		deeper_pages.forEach((page_data) => {
			page_data.parent_pages.forEach((parent_page) => {
				if (current_depth_slugs.indexOf(parent_page) !== -1) {
					if (!pages_by_depth[current_depth + 1]) {
						pages_by_depth[current_depth + 1] = [];
					}
					pages_by_depth[current_depth + 1].push(page_data);
					next_depth_slugs.push(page_data.slug);
					items_left--;
				}
			});
		});
		current_depth_slugs = next_depth_slugs;
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
			page_slug = page_data.slug;

			// Set 'active' + populate children.
			pages_by_depth[current_depth + 1].forEach(next_depth_item => {
				next_depth_item.parent_pages.forEach((parent_page) => {
					if (parent_page === page_slug) {
						if (!trails[next_depth_item.slug]) {
							trails[next_depth_item.slug] = {};
						}
						trails[next_depth_item.slug][`active_lv${current_depth}`] = page_slug;
						if (!trails[page_slug]) {
							trails[page_slug] = {};
						}
						trails[page_slug].depth = current_depth;
						trails[page_slug].title = page_data.title;
						if (!trails[page_slug].children) {
							trails[page_slug].children = [];
						}
						trails[page_slug].children.push({
							"slug": next_depth_item.slug,
							"title": next_depth_item.title
						});
					}
				})
			});

			// Finally, build the levels 1+ nav links (siblings).
			for (page_slug in trails) {
				page_data = trails[page_slug];
				if (page_data.hasOwnProperty('children')) {
					let child_depth = page_data.depth + 1;
					page_data.children.forEach(child_page => {
						if (!trails[child_page.slug][`menu_lv${child_depth}`]) {
							trails[child_page.slug][`menu_lv${child_depth}`] = [];
						}
						trails[child_page.slug][`menu_lv${child_depth}`] = page_slug;

						// Also set the parent level menus if available (up to level 0).
						// This is a simple reference to the slug which has the 'children'
						// key (= siblings).
						let back_to_root = page_data.depth;
						while (back_to_root >= 0) {
							if (page_data.hasOwnProperty(`menu_lv${back_to_root}`)) {
								trails[child_page.slug][`menu_lv${back_to_root}`] = page_data[`menu_lv${back_to_root}`];
							}
							back_to_root--;
						}

						// Also set the ancestor 'active' if available (up to level 0).
						back_to_root = page_data.depth - 1;
						while (back_to_root >= 0) {
							if (page_data.hasOwnProperty(`active_lv${back_to_root}`)) {
								trails[child_page.slug][`active_lv${back_to_root}`] = page_data[`active_lv${back_to_root}`];
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

cache_page_routing_trails();

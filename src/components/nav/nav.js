/**
 * @file
 * Contains nav-related utilities.
 */

// import { menu_main } from '../../stores/menu_main.js';
import * as menu_main from '../../content/menu/main.json'

/**
 * Returns menu items of given level (= depth) for given path.
 *
 * Level 0 is the main menu, level 1 is subnav, etc.
 *
 * @param {Oject} route
 * @param {Integer} depth
 * @returns {Array} of objects {path, title, is_active}.
 */
const nav_menu_get_items = (route, depth) => {
	const items = [];
	if (!('path' in route) || !('lang' in route) || !(route.lang in menu_main)) {
		return items;
	}

	// Root-level = main menu items : active state is current path.
	if (!depth) {
		menu_main[route.lang].forEach(item => {
			item.is_active = (route.path == item.path);
			items.push(item);
		});
		return items;
	}

	if (!(route.path in route.trails)) {
		return items;
	}
	const current_trail = route.trails[route.path];

	if (depth == current_trail.depth + 1 && 'children' in current_trail) {
		current_trail.children.forEach(item => {
			item.is_active = (item.path == route.path);
			items.push(item);
		});
		return items;
	}

	if (`menu_lv${depth}` in current_trail && current_trail[`menu_lv${depth}`] in route.trails) {
		const parent_trail = route.trails[current_trail[`menu_lv${depth}`]];
		parent_trail.children.forEach(item => {
			item.is_active = (item.path == current_trail[`active_lv${depth}`]) || (item.path == route.path);
			items.push(item);
		});
	}

	return items;
};

export { nav_menu_get_items };

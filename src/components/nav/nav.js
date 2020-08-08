/**
 * @file
 * Contains nav-related utilities.
 */

/**
 * Returns "short_title" if it exists or "title" from given object.
 */
const nav_item_get_title = (o) => {
	return o.short_title ? o.short_title : o.title;
};

/**
 * Returns menu items of given level (= depth) for given route.
 *
 * Level 0 is the main menu, level 1 is subnav, etc.
 *
 * @param {Oject} global_data
 * @param {Oject} route
 * @param {Integer} depth
 * @returns {Array} of objects {path, title, is_active}.
 */
const nav_menu_get_items = (global_data, route, depth) => {
	const items = [];
	if (!('path' in route) || !('lang' in route)) {
		return items;
	}

	// Root-level = main menu items : active state is current path, or it can be
	// specifically provided through model.parent_page.
	// @see src/routes/[year([0-9]+)]/[month([0-9]+)]/[slug].svelte
	// @see src/components/layout/LayoutContentPage.svelte
	if (!depth) {
		let active_lv0_path = route.path;
		if (route.path in route.trails && `active_lv${depth}` in route.trails[route.path]) {
			active_lv0_path = route.trails[route.path][`active_lv${depth}`];
		}
		let localized_menu_items = route.lang in global_data.menu_main ?
			global_data.menu_main[route.lang] :
			global_data.menu_main[global_data.default_lang];
		localized_menu_items.forEach(item => {
			item.is_active = (
				item.path == active_lv0_path
				|| (('parent_page' in route) && item.path == route.parent_page)
			);
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
		return items.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
	}

	if (`menu_lv${depth}` in current_trail && current_trail[`menu_lv${depth}`] in route.trails) {
		const parent_trail = route.trails[current_trail[`menu_lv${depth}`]];
		parent_trail.children.forEach(item => {
			item.is_active = (item.path == current_trail[`active_lv${depth}`]) || (item.path == route.path);
			items.push(item);
		});
	}
	return items.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
};

/**
 * Returns breadcrumb items for given route (except the current page title).
 *
 * @param {Oject} global_data
 * @param {Oject} route
 * @param {Oject} model
 * @returns {Array} of objects {path, title}.
 */
const nav_breadcrumb_get_items = (global_data, route, model) => {
	const items = [];
	if (!('path' in route) || !('lang' in route) || !(route.lang in global_data.translations)) {
		return items;
	}

	// The 1st item in breadcrumb will always be the homepage.
	items.push({
		"title": global_data.translations[route.lang]["Home"],
		"path": ""
	});

	// Lookup parents trail if page has any parent.
	if (!('parent_page' in model)) {
		return items;
	}

	const parent_path = typeof model.parent_page === 'string' ?
		model.parent_page :
		model.parent_page.path;
	if (!(parent_path in route.trails)) {
		return items;
	}

	// We will need to reverse the order because we start from deepest level.
	const items_reversed = [];

	items_reversed.push({
		"title": nav_item_get_title(route.trails[parent_path]),
		"path": parent_path
	});

	let back_to_root = route.trails[parent_path].depth;
	while (back_to_root >= 0) {
		if (route.trails[parent_path].hasOwnProperty(`active_lv${back_to_root}`)) {
			items_reversed.push({
				"title": nav_item_get_title(route.trails[`active_lv${back_to_root}`]),
				"path": route.trails[`active_lv${back_to_root}`].path
			});
		}
		back_to_root--;
	}

	items_reversed.reverse();
	items_reversed.forEach(item => items.push(item));

	return items;
};

export { nav_item_get_title, nav_menu_get_items, nav_breadcrumb_get_items };

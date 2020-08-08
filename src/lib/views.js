/**
 * @file
 * Views-related implementations.
 *
 * TODO [wip] currently not feature complete - missing :
 * - real filters implementation (AND/OR nestable groups - for now, we just take
 *   the first and require to filter by type(s) (OR if passing an array).
 * - pagers
 * - sorts
 * - exposed sorts & filters
 * - default language filter using currently active language ?
 */

const fs = require('fs');
const { walk } = require('./fs');
const { content_entities_load_all, content_entities_load_all_by_type, content_entities_get_path } = require('./entity');

const views_default_props = {
	"display": {
		"c": "ViewDisplayGrid",
		"props": {
			"align": "center",
			"space": "large",
			"view_mode": "Card"
		}
	},
	"filters": {
		"op": "AND",
		"items": []
	},
	"sorts": [
		{ "published": "desc" }
	],
	"pager": {"items": 10}
};

/**
 * Main views processing.
 *
 * Transforms settings into results.
 */
const views_get_results = (settings) => {
	let results = [];

	// Get all results matching the filters.
	// TODO in a traditional setup, this would be a database query builder,
	// and if we were to make something generic / reusable here, we'd need
	// to implement a convenient way to switch approaches.
	// TODO generic filters with AND/OR nestable groups - for now, just take
	// the first and require to filter by type(s) (OR if passing an array).
	const filter = settings.filters.items[0];
	if (typeof filter.type === "string") {
		results = content_entities_load_all_by_type(filter.type);
	}
	else {
		filter.type.forEach(type_filter => results.concat(
			content_entities_load_all_by_type(type_filter)
		));
	}

	// URL to content entities is the path to the JSON data file relative to
	// the 'src/entities/content/<type>' folder.
	results.forEach((result, j) => {
		results[j].path = content_entities_get_path(result);
	});

	// Process the results to shave off some weight (no need to store entire
	// content entities).
	// TODO for non file-based storage, a complete round trip to fetch the
	// results in a more traditional fashion would be needed.
	// For now, hardcode this approach.
	return results.map(result => views_process_result(result, settings));
};

/**
 * Merges views props with default settings.
 */
const views_get_settings = (props) => {
	const settings = views_default_props;

	// Views display settings.
	if ("display" in props) {
		settings.display = {...settings.display, ...props.display};
	}

	// TODO wip : when array, assume first group items.
	// Views filters.
	if ("filters" in props) {
		settings.filters = {...settings.filters, ...props.filters};
	}

	// Views pager settings.
	if ("pager" in props) {
		settings.pager = {...settings.pager, ...props.pager};
	}

	return settings;
};

/**
 * Removes unused fields from entities data.
 *
 * Only keeps the values that will actually be used by the rendering.
 */
const views_process_result = (result, settings) => {
	// We may not need configurable fields for content entities (loosely modelled
	// after Drupal nodes) in this type of project.
	const fields_blacklist = [
		"content",
		"storage",
		"short_title",
		"translations"
	];

	// Do the shaving.
	Object.keys(result).forEach(key => {
		if (fields_blacklist.indexOf(key) !== -1) {
			delete result[key];
		}
	})

	return result;
};

/**
 * Builds views cache.
 *
 * A view is like a collection of entities to be rendered as a block. It binds
 * together filters, sorting criterias, and presentational options.
 *
 * TODO evaluate "exposed" capability (i.e. using URL params like for pagers).
 */
const build_views_cache = () => {
	const views_cache = [];

	// Find all occurrences of views in entities.
	const content_entities = content_entities_load_all();
	for (const [content_type, entities] of Object.entries(content_entities)) {
		entities.forEach(data => {
			if (!("content" in data) || typeof data.content !== 'object') {
				return;
			}

			// In case several views are set in the same content, we need to
			// differenciate them.
			let view_nb = 0;

			data.content.forEach((content, i) => {
				if (content.c !== 'View') {
					return;
				}
				if (!("props" in content)) {
					content.props = {};
				}
				data.storage.i = view_nb;

				const settings = views_get_settings(content.props);
				const results = views_get_results(settings);

				// Assemble as a single object for storage in cache backend.
				views_cache.push({
					"source": data.storage,
					"settings": settings,
					"results": results,
				});

				view_nb++;
			});
		});
	}

	// TODO wip :
	// Find all occurrences of views in route handlers.
	walk('src/routes', '.svelte').map(file_path => {
		const source_code = fs.readFileSync(file_path).toString();
		// source_code.replace(/<View ([^>]*)/gm, (match, capture) => {
		source_code.replace(
			/<!-- placeholder:\/\/src\/lib\/views.js\?([^ ]*) -->/gm,
			(match, capture) => {
				// console.log(capture);
				var searchParams = new URLSearchParams(capture);
				for (let p of searchParams) {
					console.log(p);
				}
			}
		);
	});

	return views_cache;
};

module.exports = {
	"build_views_cache": build_views_cache
};

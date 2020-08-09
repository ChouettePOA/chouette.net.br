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
	"pager": {"items": 10},
	"exposed": {}
};

/**
 * Main views processing.
 *
 * Transforms settings into results.
 */
const views_get_results = (settings) => {
	let results = [];

	// TODO [wip] evaluate if nested filter groups are useful, and how to approach
	// the implementation. For now, only AND root group filters are implemented.
	const f = views_process_filters(settings.filters);
	if ('content_types' in f) {
		f.content_types.forEach(ct => {
			// results.concat(content_entities_load_all_by_type(ct));
			content_entities_load_all_by_type(ct).forEach(r => results.push(r));
		});
	}

	// TODO [wip] map entity references (for now always assume tags).
	if ('referencing' in f) {
		results.forEach((result, i) => {
			if (!('tags' in result)) {
				results.splice(i, 1);
				return;
			}
			f.referencing.forEach(ref => {
				if (!result.tags.includes(ref)) {
					results.splice(i, 1);
				}
			});
		});
	}

	// URL to content entities is the path to the JSON data file relative to
	// the 'src/entities/content/<type>' folder.
	results.forEach((result, j) => {
		results[j].path = content_entities_get_path(result);
	});

	// Process the results to shave off some weight (no need to store entire
	// content entities).
	return results.map(result => views_process_result(result, settings));
};

/**
 * Breaks down potentially nested filter groups into parts easier to work with.
 *
 * TODO [wip] prototype currently only working for a single AND root group.
 */
const views_process_filters = (filters) => {
	const verbose = [];
	const content_types = [];
	const referencing = [];

	if ('items' in filters) {
		filters.items.forEach(f => {
			Object.keys(f).forEach(key => {
				switch (key) {
					case 'by_term':
						verbose.push(filters.op + " referencing: " + f[key]);

						// TODO [wip] map entity references (for now always assume tags).
						referencing.push(f[key]);

						break;

					case 'in':
						verbose.push(filters.op + " in: " + f[key]);

						// TODO [wip] For now, just work with content entities. Need to
						// support any entity type though. Add the necessary helpers in
						// src/lib/entity.js
						if (f[key].indexOf('content/') === 0) {
							content_types.push(f[key].replace('content/', ''));
						}

						break;
				}
			});
		});
	}

	// TODO [wip] Nested groups.
	else if ('group' in filters) {
		let { nested_verbose_str, nested_content_types } = views_process_filters(filters.group);
		verbose.push(
			filters.op + ' ( ' + nested_verbose_str + ' )'
		);
		content_types.concat(nested_content_types);
	}

	const verbose_str = verbose.join(' ');
	return { verbose_str, content_types };
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

	// Views filters.
	// When array, assume it's the items of the first group.
	if ("filters" in props) {
		const passed_filters = Array.isArray(props.filters) ?
			{"items":props.filters} :
			props.filters;
		settings.filters = {...settings.filters, ...passed_filters};
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
	});

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

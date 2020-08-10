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
const {
	content_entities_get_path,
	content_entities_load_all,
	content_entities_load_all_by_type,
	taxonomy_terms_load_all,
	taxonomy_terms_load_all_by_vocabulary
} = require('./entity');

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
const views_get_results = (settings, args = []) => {
	let results = [];
	const f = views_process_filters(settings.filters);

	// Debug
	// console.log(settings.filters.items);
	// console.log(f);

	// TODO [wip] evaluate if nested filter groups are useful, and how to approach
	// the implementation. For now, only OR root group filters are implemented.
	if ('content_types' in f) {
		f.content_types.forEach(ct => {
			content_entities_load_all_by_type(ct).forEach(r => results.push({...r}));
		});
	}

	// TODO [wip]
	if ('referencing' in f && f.referencing.length) {
		const ref_def = f.referencing[0];

		if ('arg' in ref_def && args.length) {
			results.forEach((result, i) => {
				if (ref_def.entity_type == 'term') {
					if (!('tags' in result)) {
						results.splice(i, 1);
						return;
					}

					const arg_val = args[ref_def.arg.i - 1];

					if (!result.tags.includes(arg_val)) {
						results.splice(i, 1);
					}
				}
			});
		}
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
					case 'referencing':
						verbose.push(filters.op + " referencing: " + f[key]);

						// TODO [wip] map entity references (for now always assume tags).
						referencing.push(views_extract_filter(key, f[key]));

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
	return { verbose_str, content_types, referencing };
};

/**
 * Converts a single views filter value into entity type, bundle, and arg.
 *
 * @param {String} filter_type : Examples :
 *  - referencing
 *  - in
 * @param {String} filter_value : Examples :
 *  - 'term/tag:$1'
 *  - 'content/blog'
 *
 * @return {Object} {entity_type, bundle, arg}
 */
const views_extract_filter = (filter_type, filter_value) => {
	let arg = null;
	const f_item = {};
	const value_parts = filter_value.split('/');

	value_parts.forEach(v => {
		if (v.indexOf(':') !== -1) {
			const arg_parts = v.split(':');
			arg = {
				"i": arg_parts[1].replace('$', ''),
				"entity_type": value_parts[0],
				"filter_type": filter_type,
				"bundle": arg_parts[0]
			};
		}
	});

	f_item[filter_type] = filter_value;
	f_item.entity_type = value_parts[0];

	if (arg) {
		f_item.arg = arg;
		f_item.bundle = arg.bundle;
	}
	else {
		f_item.bundle = value_parts[1];
	}

	return f_item;
};

/**
 * Merges views props with default settings.
 */
const views_get_settings = (props) => {
	const settings = {...views_default_props};

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
	// result = {...result};

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
 * Gets the pre-compiled cache file path corresponding to views props and args.
 */
const views_get_cache_file_path = (stringified_props, args_arr = []) => {
	let tail = '';
	while (args_arr.length) {
		tail += "/" + args_arr.shift();
	}
	if (!tail.length) {
		tail = '/default';
	}
	return `src/cache/views/${views_hash_props(stringified_props)}${tail}.json`;
};

/**
 * Converts a string into a 53-bit hash.
 *
 * @see https://stackoverflow.com/a/52171480/2592338
 */
const views_hash_props = (str, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
	h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
	return 4294967296 * (2097151 & h2) + (h1>>>0);
};

/**
 * Converts "stringified" views props into object.
 *
 * Example of stringified_props :
 *  f.0.referencing=term/tag:$1&f.0.in=content/blog
 *
 * Rules :
 * - filters & sorts keys are grouped by numerical counter (starting from 0)
 * - filters values are always prefixed by <entity_type>/<bundle> (wildcard : *)
 * - arguments are integers separated from filters using ':' and prefixed by '$'
 */
const views_extract_stringified_props = (stringified_props) => {
	const props = {...views_default_props};
	const args = [];
	const searchParams = new URLSearchParams(stringified_props);

	let max_filter_group_nb = 0;

	for (let p of searchParams) {
		const key_parts = p[0].split('.');
		switch (key_parts[0]) {

			// Views filters.
			case 'f':
				const filter_group = key_parts[1];
				const filter_type = key_parts[2];
				if (filter_group > max_filter_group_nb) {
					max_filter_group_nb = filter_group;
				}
				const extracted_filter = views_extract_filter(filter_type, p[1]);
				props.filters.items.push(extracted_filter);
				if (extracted_filter.arg) {
					args.push(extracted_filter.arg);
				}
				break;

			// TODO [wip] Views sorts.
			case 's':
				break;

			// TODO [wip] Views pagers.
			case 'p':
				break;
		}
	}

	return {props, args};
};

/**
 * Generates cache entries based on filters and arguments.
 */
const views_generate_cache_entries = (o) => {
	const {props, args, stringified_props} = o;
	const cache_entries = [];
	const settings = views_get_settings(props);

	if (!args || !args.length) {
		const results = views_get_results(settings);
		cache_entries.push({
			"settings": settings,
			"results": results
		});

		return cache_entries;
	}

	// With arguments, we will need much more processing.
	// Generate all possible arguments to generate all cache files.
	const args_values = [];
	const args_results = [];

	args.forEach(arg => {
		args_values[arg.i] = [];

		// First, load all entities data.
		switch (arg.entity_type) {
			case 'content':
				if ('bundle' in arg && arg.bundle.length) {
					args_results[arg.i] = content_entities_load_all_by_type(arg.bundle);
				}
				else {
					args_results[arg.i] = content_entities_load_all();
				}
				break;

			case 'term':
				if ('bundle' in arg && arg.bundle.length) {
					args_results[arg.i] = taxonomy_terms_load_all_by_vocabulary(arg.bundle);
				}
				else {
					args_results[arg.i] = taxonomy_terms_load_all();
				}
				break;
		}

		// Depending on the type of filter, we may need to keep only 1 key.
		switch (arg.filter_type) {
			// TODO [wip] do the other types.
			case 'referencing':
				args_results[arg.i].forEach(data => {
					// Terms translations share the same UUID (the plan was to use
					// different keys like "uuid_fr" for example).
					// Here, we only need results by tag, whichever language the tag is,
					// because it represents the same "reference" - so, deduplicate.
					if (args_values[arg.i].indexOf(data.uuid) === -1) {
						args_values[arg.i].push(data.uuid);
					}
				})
				break;
		}
	});

	// TODO [wip] match filters with arg position + combinatory expanding.
	// For now, process just a single arg.
	args_values.forEach((arg_values, i) => {
		arg_values.forEach(val => {
			cache_entries.push({
				"storage": {
					"backend": "file",
					"file_path": views_get_cache_file_path(stringified_props, [val])
				},
				"settings": settings,
				"results": views_get_results(settings, [val])
			});
		});
	});

	return cache_entries;
};

/**
 * Builds views cache.
 */
const build_views_cache = () => {
	const views_in_routes_cache = [];
	const views_in_entities_cache = [];

	// Find all occurrences of views in entities.
	// The cache rebuild process will inject cache entries "in place", so in this
	// case, the entire entity data is returned (it will be entirely rewritten).
	const content_entities = content_entities_load_all();
	for (const [content_type, entities] of Object.entries(content_entities)) {
		entities.forEach(data => {
			if (!("content" in data) || typeof data.content !== 'object') {
				return;
			}
			data.content.forEach((content, i) => {
				if (content.c !== 'View') {
					return;
				}
				if (!("props" in content)) {
					content.props = {};
				}
				// Without args, a single cache entry is returned.
				const cache_entries = views_generate_cache_entries(content);
				if (cache_entries.length) {
					data.content[i].props.cache = cache_entries.pop();
					views_in_entities_cache.push(data);
				}
			});
		});
	}

	// Find all occurrences of views in route handlers.
	walk('src/routes', '.svelte').map(file_path => {
		const source_code = fs.readFileSync(file_path).toString();

		// Debug
		// source_code.replace(/<View ([^>]*)/gm, (match, capture) => {

		source_code.replace(
			/<!-- placeholder:\/\/src\/lib\/views.js\?([^ ]*) -->/gm,
			(match, stringified_props) => {
				const {props, args} = views_extract_stringified_props(stringified_props);
				const cache_entries = views_generate_cache_entries({props, args, stringified_props});
				if (cache_entries.length) {
					cache_entries.forEach(cache_entry => {
						views_in_routes_cache.push(cache_entry);
					});
				}
			}
		);
	});

	// return views_cache;
	return {views_in_routes_cache, views_in_entities_cache};
};

module.exports = {
	"build_views_cache": build_views_cache
};

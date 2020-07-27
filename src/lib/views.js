/**
 * @file
 * Views-related implementations.
 */

const fs = require('fs');
const { walk } = require('./fs');

// TODO [wip] reevaluate architecture.
const views_default_props = {
	"display": {
		"type": "ViewDisplayGrid",
		"variant": "inline-block",
		"options": ["center", "gutter-l"],
		"view_mode": "Card"
	},
	"filters": {
		"op": "OR",
		"items": []
	},
	"sorts": [
		{ "published": "desc" }
	],
	"pager": {"items": 10}
};

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
 * For file-based storage, results will not need to be stored as the whole
 * entity. Instead, only keep the values that will actually be used by the
 * rendering.
 */
const views_result_process_for_file_storage = (result, settings) => {
	const fields_whitelist = [];

	// Sorting criterias will impact what data we need to retain.
	settings.sorts.forEach(sort => fields_whitelist.push(Object.keys(sort).pop()));

	// Implement "field" mapping by view mode. We may not need configurable fields
	// for content entities (modelled after Drupal nodes) in this type of project.
	switch (settings.display.view_mode) {
		case "Card":
			fields_whitelist.push("tags");
			fields_whitelist.push("title");
			fields_whitelist.push("published");
			fields_whitelist.push("description");
			break;
	}

	// Do the shaving.
	Object.keys(result).forEach(key => {
		if (fields_whitelist.indexOf(key) === -1) {
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

				let results = [];
				const settings = views_default_props;
				settings.view_id = view_nb;
				view_nb++;

				// Views display settings.
				if ("display" in content.props) {
					settings.display = {...settings.display, ...content.props.display};
				}

				// Views filters.
				if ("filters" in content.props) {
					settings.filters = {...settings.filters, ...content.props.filters};
				}

				// Views pager settings.
				if ("pager" in content.props) {
					settings.pager = {...settings.pager, ...content.props.pager};
				}

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

				// Process the results to shave off some weight (no need to store entire
				// content entities).
				// TODO for non file-based storage, a complete round trip to fetch the
				// results in a more traditional fashion would be needed.
				// For now, hardcode this approach.
				results = results.map(result => views_result_process_for_file_storage(result, settings));

				// Assemble as a single object for storage in cache backend.
				// Update : it's easier (for now) to just return the modified entity
				// data to write.
				// views_cache.push({
				// 	"source": data.entity_storage,
				// 	"settings": settings,
				// 	"results": results,
				// });
				data.content[i].cache = {
					"settings": settings,
					"results": results
				};
				views_cache.push(data);
			});
		});
	}

	return views_cache;
};

module.exports = {
	"build_views_cache": build_views_cache
};

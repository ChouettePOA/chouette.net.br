/**
 * @file
 * Views-related implementations.
 */

const fs = require('fs');
const path = require('path');
const { walk } = require('./fs');

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

module.exports = {
	"build_views_results": build_views_results
};

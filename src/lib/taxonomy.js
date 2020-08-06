/**
 * @file
 * Taxonomy-related implementations.
 */

const { content_entities_load_all_by_type, content_entities_get_path } = require('./entity');

/**
 * Builds taxonomy cache (all vocabularies at once).
 */
const build_taxonomy_cache = () => {
	terms = {};

	content_entities_load_all_by_type('taxonomy').forEach(data => {
		// URLs to terms page (path).
		data.path = content_entities_get_path(data);

		const vocabulary = data.path.split('/')[0];
		if (!(vocabulary in terms)) {
			terms[vocabulary] = {};
		}

		// All terms are keyed by UUID to allow renaming, translating, etc. without
		// having to impact other entities referencing taxonomy terms.
		const uuid = data.uuid;

		// We won't need to store the following keys.
		const fields_blacklist = [
			"uuid",
			"storage"
		];
		Object.keys(data).forEach(key => {
			if (fields_blacklist.indexOf(key) !== -1) {
				delete data[key];
			}
		})

		terms[vocabulary][uuid] = data;
	});

	return terms;
};

module.exports = {
	"build_taxonomy_cache": build_taxonomy_cache
};

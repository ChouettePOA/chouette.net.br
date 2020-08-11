/**
 * @file
 * Taxonomy-related implementations.
 */

const { taxonomy_terms_load_all, content_entities_get_path } = require('./entity');

/**
 * Builds taxonomy cache (all vocabularies at once).
 *
 * The difference with taxonomy_terms_load_all() or
 * taxonomy_terms_load_all_by_vocabulary() is that here, the terms are keyed by
 * vocabulary + uuid + language (instead of being just arrays by vocabulary).
 */
const build_taxonomy_cache = () => {
	structured_terms = {};

	for (const [vocabulary, terms] of Object.entries(taxonomy_terms_load_all())) {
		terms.forEach(data => {
			// URLs to terms page (path).
			data.path = content_entities_get_path(data);

			// All terms are keyed by UUID to allow renaming, translating, etc. without
			// having to impact other entities referencing taxonomy terms.
			const uuid = data.uuid;

			// Also keyed by lang to facilitate translations (fallbacks to default
			// language defined in src/entities/config/global.json).
			const lang = data.lang;

			// We won't need to store the following keys.
			const fields_blacklist = [
				"uuid",
				"lang",
				"storage"
			];
			Object.keys(data).forEach(key => {
				if (fields_blacklist.indexOf(key) !== -1) {
					delete data[key];
				}
			});

			if (!(vocabulary in structured_terms)) {
				structured_terms[vocabulary] = {};
			}
			if (!(uuid in structured_terms[vocabulary])) {
				structured_terms[vocabulary][uuid] = {};
			}

			structured_terms[vocabulary][uuid][lang] = data;
		});
	}

	return structured_terms;
};

module.exports = {
	"build_taxonomy_cache": build_taxonomy_cache
};

/**
 * @file
 * Taxonomy-related implementations.
 */

const fs = require('fs');
const { walk } = require('./fs');

/**
 * Builds taxonomy cache (all vocabularies at once).
 */
const build_taxonomy_cache = () => {
	terms = {};

	walk('src/entities/content/taxonomy', '.json').map(file_path => {
		const vocabulary = file_path.split('/')[4];
		if (!(vocabulary in terms)) {
			terms[vocabulary] = {};
		}

		const data = JSON.parse(fs.readFileSync(file_path).toString());

		// Generate URLs to terms page (path).
		data.path = file_path;
		data.path = data.path.replace('src/entities/content/taxonomy/', '');
		data.path = data.path.replace(new RegExp('\.json$'), '');

		// All terms are keyed by UUID to allow renaming, translating, etc. without
		// having to impact other entities referencing taxonomy terms.
		const uuid = data.uuid;
		delete data.uuid;
		terms[vocabulary][uuid] = data;
	});

	return terms;
};

module.exports = {
	"build_taxonomy_cache": build_taxonomy_cache
};

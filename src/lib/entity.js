/**
 * @file
 * Entity-related implementations.
 */

const fs = require('fs');
const { walk } = require('./fs');

/**
 * Loads all content entities data ("singleton").
 *
 * TODO evaluate using "proper" OO design pattern implementation instead.
 */
let content_entities = null;
const content_entities_load_all = () => {
	if (content_entities) {
		return content_entities;
	}
	content_entities = {};
	walk('src/entities/content', '.json').map(file_path => {
		const content_type = file_path.split('/')[3];
		if (!(content_type in content_entities)) {
			content_entities[content_type] = [];
		}
		// Attach file path to inject cached results in build_views_results().
		const data = JSON.parse(fs.readFileSync(file_path).toString());
		data.storage = {
			"backend": "file",
			"file_path": file_path
		};
		content_entities[content_type].push(data);
	});
	return content_entities;
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
 * Gets taxonomy terms from all vocabularies.
 */
let term_entities = null;
const taxonomy_terms_load_all = () => {
	if (term_entities) {
		return term_entities;
	}
	term_entities = {};
	walk('src/entities/taxonomy', '.json').map(file_path => {
		const vocabulary = file_path.split('/')[3];
		if (!(vocabulary in term_entities)) {
			term_entities[vocabulary] = [];
		}
		const data = JSON.parse(fs.readFileSync(file_path).toString());
		data.storage = {
			"backend": "file",
			"file_path": file_path
		};
		term_entities[vocabulary].push(data);
	});
	return term_entities;
};

/**
 * Loads all taxonomy terms data by vocabulary.
 */
const taxonomy_terms_load_all_by_vocabulary = vocabulary => {
	const term_entities = taxonomy_terms_load_all();
	if (!(vocabulary in term_entities)) {
		return;
	}
	return term_entities[vocabulary];
};

/**
 * Gets content entity path.
 *
 * For file-based storage, the URL of content entities is the path to the JSON
 * data file relative to the 'src/entities/content/<type>' folder.
 */
const content_entities_get_path = (entity) => {
	if (!("storage" in entity)) {
		return;
	}

	let path = '';

	if (entity.storage.backend === 'file') {
		path = entity.storage.file_path;
		path = path.replace(new RegExp('src/entities/content/[^/]+/'), '');
		path = path.replace(new RegExp('src/entities/taxonomy/'), '');
		path = path.replace(new RegExp('\.json$'), '');
	}

	return path;
};

module.exports = {
	"content_entities_get_path": content_entities_get_path,
	"content_entities_load_all": content_entities_load_all,
	"content_entities_load_all_by_type": content_entities_load_all_by_type,
	"taxonomy_terms_load_all": taxonomy_terms_load_all,
	"taxonomy_terms_load_all_by_vocabulary": taxonomy_terms_load_all_by_vocabulary
};

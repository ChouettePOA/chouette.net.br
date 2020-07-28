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

	console.log("reloading content entities");

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
	})
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
 * Gets content entity path.
 */
const content_entities_get_path = (content_type, entity) => {
	if (!("storage" in entity)) {
		return;
	}
	if (entity.storage.backend === 'file') {
		return entity.storage.file_path.replace("src/entities/content/" + content_type, '');
	}
};

module.exports = {
	"content_entities_get_path": content_entities_get_path,
	"content_entities_load_all": content_entities_load_all,
	"content_entities_load_all_by_type": content_entities_load_all_by_type
};

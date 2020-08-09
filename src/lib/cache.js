/**
 * @file
 * (Re)builds the local file-based cache.
 *
 * TODO ideally this would be hooked into the Sapper app build process (or
 * integrated into the build tool configuration).
 */

const fs = require('fs');
const { build_page_routing_trails } = require('./routing');
const { build_views_cache } = require('./views');
const { build_taxonomy_cache } = require('./taxonomy');

/**
 * Writes the "routing trails" cache to a JSON static file.
 *
 * @see build_page_routing_trails()
 */
const cache_page_routing_trails = () => {
	fs.writeFileSync('src/cache/page_routing_trails.json', JSON.stringify(build_page_routing_trails()));
}

/**
 * Writes the views cache.
 *
 * Unlike cache_page_routing_trails(), the generated code will be "injected"
 * directly in place (inside the entity definition where the view is placed).
 *
 * @see build_views_results()
 */
const cache_views_results = () => {
	build_views_cache().forEach(data => {
		// TODO wip refacto in progress see src/lib/views.js
		// console.log(data);
		// const file_path = data.storage.file_path;
		// delete data.storage;
		// fs.writeFileSync(file_path, JSON.stringify(data, null, '	'));
		console.log(views_get_cache_file_path({"test":"hello"}));
	});
	console.log(views_get_cache_file_path({"test":"hello"}));
}

function views_get_cache_file_path(props) {
	const hash = views_hash_props(props);

	return hash;
}
function views_hash_props(props, seed = 0) {
	const str = JSON.stringify(props);
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
}

/**
 * Writes the taxonomy terms cache.
 *
 * @see build_taxonomy_cache()
 */
const cache_taxonomy_terms = () => {
	for (const [vocabulary, terms] of Object.entries(build_taxonomy_cache())) {
		fs.writeFileSync(`src/cache/${vocabulary}.json`, JSON.stringify(terms));
	}
}

module.exports = {
	"cache_views_results": cache_views_results,
	"cache_page_routing_trails": cache_page_routing_trails,
	"cache_taxonomy_terms": cache_taxonomy_terms
};

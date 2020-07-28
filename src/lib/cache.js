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
		const file_path = data.storage.file_path;
		delete data.storage;
		fs.writeFileSync(file_path, JSON.stringify(data, null, '	'));
	})
}

module.exports = {
	"cache_views_results": cache_views_results,
	"cache_page_routing_trails": cache_page_routing_trails
};

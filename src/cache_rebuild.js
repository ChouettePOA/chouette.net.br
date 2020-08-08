/**
 * @file
 * (Re)builds the local file-based cache & other dynamic files.
 *
 * TODO ideally this would be hooked into the Sapper app build process (if a
 * pre-build hook existed).
 */

const { cache_page_routing_trails, cache_views_results, cache_taxonomy_terms } = require('./lib/cache');

cache_page_routing_trails();
cache_views_results();
cache_taxonomy_terms();

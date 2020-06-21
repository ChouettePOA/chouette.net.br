/**
 * @file
 * (Re)builds the local file-based cache.
 *
 * TODO ideally this would be hooked into the Sapper app build process (if a
 * pre-build hook existed).
 */

const { cache_page_routing_trails } = require('./lib/cache');

cache_page_routing_trails();

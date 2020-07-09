/**
 * @file
 * (Re)builds the local file-based cache & other dynamic files.
 *
 * TODO ideally this would be hooked into the Sapper app build process (if a
 * pre-build hook existed).
 */

const { cache_page_routing_trails } = require('./lib/cache');
const { content_component_update } = require('./lib/content_component');

cache_page_routing_trails();
content_component_update();

import { writable } from 'svelte/store';
import * as cached_trails from '../cache/page_routing_trails.json'
import * as global_data from '../content/global_data.json'

// TODO why does the import for page_routing_trails.json add a 'default' key ?
export const route = writable({
	"path": '/',
	"lang": 'pt',
	"title": global_data.site_name,
	"trails": cached_trails.default,
	"site_name": global_data.site_name
});

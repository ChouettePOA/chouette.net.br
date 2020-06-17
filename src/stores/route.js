import { writable } from 'svelte/store';
import * as cached_trails from '../cache/page_routing_trails.json'
import * as global_data from '../content/global_data.json'

export const route = writable({
	"slug": '/',
	"lang": 'pt',
	"title": global_data.site_name,
	"trails": cached_trails,
	"site_name": global_data.site_name
});

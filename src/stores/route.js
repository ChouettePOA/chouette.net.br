import { writable } from 'svelte/store';
import * as cached_trails from '../cache/page_routing_trails.json'

export const route = writable({
	"path": "",
	"lang": "pt",
	"title": '',
	"trails": cached_trails.default
});

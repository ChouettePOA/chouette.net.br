// import { derived } from 'svelte/store'
import { writable } from 'svelte/store';
import * as cached_trails from '../cache/page_routing_trails.json'
import { global_data } from './global_data.js';
// import { stores } from '@sapper/app';

// const { page } = stores();

// export const route = derived([page, global_data], ([$page, $global_data]) => {
// 	return {
// 		slug: $page.path ? $page.path : '/',
// 		lang: 'pt',
// 		title: $global_data.site_name,
// 		trails: trails,
// 		site_name: $global_data.site_name
// 	};
// });

// export const route = derived(global_data, $global_data => {
// 	return {
// 		slug: '/',
// 		lang: 'pt',
// 		title: $global_data.site_name,
// 		trails: trails,
// 		site_name: $global_data.site_name
// 	};
// });

export const route = writable({
	"slug": '/',
	"lang": 'pt',
	"title": global_data.site_name,
	"trails": cached_trails,
	"site_name": global_data.site_name
});

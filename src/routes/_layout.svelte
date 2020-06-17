<script>
	// import { setContext } from 'svelte';
	// import { writable, derived } from 'svelte/store'
	// import { derived } from 'svelte/store'
	// import { global_data } from '../stores/global_data.js';
	// import { page_routing_trails } from '../stores/page_routing_trails.js';

	// TODO [evol] deprecate FontFaceObserver ?
	// @see src/template.html (classes on <body>)
	// import FontFaceObserver from 'fontfaceobserver';

	// export let segment;

	// Use the context API to have all components inherit the routing context.
	// setContext('route', {
	// 	slug: segment ? segment : '/',
	// 	lang: 'pt',
	// 	title: "Chouette - Institut de Français",
	// 	trails: $page_routing_trails,
	// 	site_name: $global_data.site_name
	// });


	// Also inherit all arbitrary globals.
	// setContext('globals', $global_data);

	// import { stores } from '@sapper/app';
	// import { route } from '../stores/route.js';

	// const { page } = stores();

	// route.update(existing => {
	// 	existing.slug = $page.path;
	// 	return existing;
	// });

</script>

<!-- @see src/template.html -->
<slot></slot>

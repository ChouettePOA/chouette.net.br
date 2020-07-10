<script>
	import { getContext } from 'svelte';
	const global_data = getContext('global_data');

	// export let title = '';
	// export const description = '';
	// export const image = '/theme/chouette-logo-1200x630.png';
	// export const path = '';
	// export const base_url = 'process.env.BASE_URL';
	// export const twitter_card = 'summary_large_image';
	// export const site_name = global_data.site_name;
	// export const image_alt = '';

	// if (title != site_name) {
	// 	title += ' | ' + site_name;
	// }

	export let route = {};
</script>

<!-- <svelte:head>
	<title>{ title }</title>
	<meta property="og:title" content="{ title }">
	<meta property="og:description" content="{ description }">
	<meta property="og:image" content="{ base_url + image }">
	<meta property="og:url" content="{ base_url + path }">
	<meta name="twitter:card" content="{ twitter_card }">
	<meta property="og:site_name" content="{ site_name }">
	{#if image_alt}
		<meta name="twitter:image:alt" content="{ image_alt }">
	{/if}
</svelte:head> -->

<!-- DEBUG -->
<pre>Meta.svelte : route = {JSON.stringify(route, null, 2)}</pre>
<!-- <pre>Meta.svelte : props = {JSON.stringify({title: title, description: description, image: image, path: path, base_url: base_url, twitter_card: twitter_card, site_name: site_name, image_alt: image_alt}, null, 2)}</pre> -->

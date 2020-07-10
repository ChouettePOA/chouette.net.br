<script>
	import { route } from '../stores/route.js';
	import { getContext } from 'svelte';
	const global_data = getContext('global_data');
</script>

<svelte:head>
	<title>{ $route.title + (($route.title != global_data.site_name) ? ' | ' + global_data.site_name : '') }</title>
	<meta property="og:title" content="{ $route.title }">
	<meta property="og:description" content="{ $route.description }">
	<meta property="og:image" content="{ 'process.env.BASE_URL' + $route.image ? $route.image : '/theme/chouette-logo-1200x630.png' }">
	<meta property="og:url" content="{ 'process.env.BASE_URL' + $route.path ? $route.path : '' }">
	<meta name="twitter:card" content="{ $route.twitter_card ? $route.twitter_card : 'summary_large_image' }">
	<meta property="og:site_name" content="{ global_data.site_name }">
	<meta name="twitter:image:alt" content="{ $route.image_alt ? $route.image_alt : global_data.site_name }">
</svelte:head>

<!-- DEBUG -->
<!-- <pre>Meta.svelte : $route = {JSON.stringify($route, null, 2)}</pre> -->

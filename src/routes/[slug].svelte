<script context="module">

	/**
	 * Implements Sapper route preload "hook".
	 *
	 * Provides page data ("model").
	 *
	 * @param page : object containing `{ path, params, query }`.
	 * @param session : used for credentialled requests.
	 * @return object : page data (model).
	 *
	 * @see src/routes/[slug].json.js
	 */
	export async function preload(page, session) {
		// The `slug` parameter is available because this file is called
		// `[slug].svelte`.
		const { slug } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		const res = await this.fetch(`${slug}.json`);
		const model = await res.json();

		model.slug = slug;

		return { model };
	}
</script>

<script>
	import { afterUpdate } from 'svelte';
	import { route } from '../stores/route.js';
	import Header from '../components/header/Header.svelte';
	import Content from '../components/Content.svelte';

	export let model;

	/**
	 * Implements Svelte afterUpdate "hook".
	 *
	 * Update current route page title from page data (model) for all descendant
	 * components once the DOM is in sync with data.
	 *
	 * This prevents out-of-sync state when the routing store is updated from the
	 * async preloaded data.
	 *
	 * @see preload()
	 */
	afterUpdate(async () => {
		if ('title' in model && 'slug' in model) {
			route.update(existing => {
				existing.title = model.title;
				existing.path = model.slug;
				existing.lang = model.lang;
				return existing;
			});
		}
	});
</script>

<svelte:head>
	<title>{ $route.title } | { $route.site_name }</title>
	{#if $route.description }
		<meta name="description" content="{ $route.description }">
	{/if}
	{#if $route.poster_image }
		<meta property="og:image" content="{ $route.poster_image }">
	{:else}
		<meta property="og:image" content="/theme/chouette-logo-1200x630.png">
	{/if}
</svelte:head>

<Header {model} />

<main id="main-content">
	<Content content={model.content} />
</main>

<!-- DEBUG -->
<!-- <pre>[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
<!-- <pre>[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->

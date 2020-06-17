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
	// import { getContext, setContext } from 'svelte';
	import { route } from '../stores/route.js';
	import Header from '../components/header/Header.svelte';

	// const route = getContext('route');
	export let model;

	// Update current route page title from page data (model) for all descendant
	// components.
	// @see preload()
	if ('title' in model && 'slug' in model) {
		// route.title = model.title;
		// setContext('route', route);
		route.update(existing => {
			existing.title = model.title;
			existing.slug = model.slug;
			// Workaround (wtf) insertion of a 'default' key in trails object.
			if ('default' in existing.trails) {
				existing.trails = {...existing.trails, ...existing.trails.default}
				delete existing.trails.default;
			}
			return existing;
		});
	}
</script>

<svelte:head>
	<title>{ $route.title } | { $route.site_name }</title>
</svelte:head>

<Header { model } />

<main id="main-content">
	<h1>{ $route.title }</h1>
</main>

<!-- <pre>[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
<!-- <pre>[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->

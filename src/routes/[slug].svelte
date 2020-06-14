<script context="module">

	/**
	 * Implements Sapper route preload "hook".
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

		if (model && slug) {
			model.active_slug = slug;
		}

		return { model };
	}
</script>

<script>
	import Header from '../components/header/Header.svelte';

	export let model;
</script>

<svelte:head>
	<title>{ model.title } | Chouette - Institut de Français</title>
</svelte:head>

<Header {model} />

<main id="main-content">
	<h1>{ model.title }</h1>
</main>

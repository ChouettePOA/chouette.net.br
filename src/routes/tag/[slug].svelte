<script context="module">
	import * as tags_data from '../../cache/tag.json';
	import { views_get_cache_file_path } from '../views-cache/_views_cache.js';
	const tags = tags_data.default;

	/**
	 * Gets a single tag UUID by path (slug).
	 */
	const tag_get_uuid_by_path = (path) => {
		for (const [uuid, data] of Object.entries(tags)) {
			for (const [lang, term] of Object.entries(data)) {
				if (term.path === path) {
					return uuid;
				}
			}
		}
	}

	/**
	 * Implements Sapper route preload "hook".
	 *
	 * @param page : object containing `{ path, params, query }`.
	 * @param session : used for credentialled requests.
	 * @return object : custom props.
	 */
	export async function preload(page, session) {
		const { slug } = page.params;
		const full_slug = 'tag/' + slug;

		const uuid = tag_get_uuid_by_path(full_slug);
		const views_props = `f[0][by_term]=$1&f[0][in]=content/blog`;

		// Debug
		const cache = views_get_cache_file_path(views_props, uuid);

		return { full_slug, cache };
	}
</script>

<script>
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	import LayoutContentPage from '../../components/layout/LayoutContentPage.svelte';
	import View from '../../components/content/View.svelte';

	export let full_slug;
	export let cache;

	const global_data = getContext('global_data');
	let model = {};

	for (const [uuid, data] of Object.entries(tags)) {
		if ($route.lang in data && data[$route.lang].path === full_slug) {
			model = data[$route.lang];
			model.lang = $route.lang;
			model.uuid = uuid;
		}
		else if (global_data.default_lang in data && data[global_data.default_lang].path === full_slug) {
			model = data[global_data.default_lang];
			model.lang = global_data.default_lang;
			model.uuid = uuid;
		}
	}

	model.slug = full_slug;

	// Specific nav state for tags pages.
	// @see src/components/layout/LayoutContentPage.svelte
	// @see src/components/nav/nav.js
	model.parent_page = 'blog';
</script>

<LayoutContentPage {model}>

	<!-- placeholder://src/lib/views.js?f[0][by_term]=$1&f[0][in]=content/blog -->
	<!-- <View filters={[
		{ "in": "content/blog" },
		{ "by_term": model.uuid }
	]} /> -->
	<!-- <View {cache} /> -->

	<!-- DEBUG -->
	<pre>tag/[slug].svelte : cache = {JSON.stringify(cache, null, 2)}</pre>
	<!-- <pre>tag/[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : full_slug = {JSON.stringify(full_slug, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : tags = {JSON.stringify(tags, null, 2)}</pre> -->

</LayoutContentPage>

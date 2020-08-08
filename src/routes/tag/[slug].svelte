<script context="module">
	import * as tags_data from '../../cache/tag.json';
	const tags = tags_data.default;

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
		return { full_slug };
	}
</script>

<script>
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	import LayoutContentPage from '../../components/layout/LayoutContentPage.svelte';

	export let full_slug;

	const global_data = getContext('global_data');
	let model = {};

	for (const [uuid, data] of Object.entries(tags)) {
		if ($route.lang in data && data[$route.lang].path === full_slug) {
			model = data[$route.lang];
			model.lang = $route.lang;
		}
		else if (global_data.default_lang in data && data[global_data.default_lang].path === full_slug) {
			model = data[global_data.default_lang];
			model.lang = global_data.default_lang;
		}
	}

	model.slug = full_slug;

	// Specific nav state for tags pages.
	// @see src/components/layout/LayoutContentPage.svelte
	// @see src/components/nav/nav.js
	model.parent_page = 'blog';
</script>

<LayoutContentPage {model}>
	<!-- DEBUG -->
	<!-- <pre>tag/[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : full_slug = {JSON.stringify(full_slug, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : tags = {JSON.stringify(tags, null, 2)}</pre> -->
</LayoutContentPage>

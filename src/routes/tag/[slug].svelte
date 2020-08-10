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
	};

	/**
	 * Implements Sapper route preload "hook".
	 *
	 * @param page : object containing `{ path, params, query }`.
	 * @param session : used for credentialled requests.
	 * @return object : custom props.
	 *
	 * @see src/routes/views-cache/[...slug].json.js
	 */
	export async function preload(page, session) {
		const { slug } = page.params;
		const full_slug = 'tag/' + slug;

		const uuid = tag_get_uuid_by_path(full_slug);
		const cached_views_data = [];
		const views_on_this_page = [
			{
				"stringified_props": "f.0.referencing=term/tag:$1&f.0.in=content/blog",
				"args": [uuid]
			}
		];

		for (let i = 0; i < views_on_this_page.length; i++) {
			const v = views_on_this_page[i];
			const views_cache_path = views_get_cache_file_path(v.stringified_props, v.args);
			const res = await this.fetch(`views-cache/${views_cache_path}`);

			if (res.status !== 200) {
				this.error(res.status, `The path ${views_cache_path} was not found`);
				return {};
			}

			cached_views_data.push(await res.json());
		}

		return { full_slug, uuid, cached_views_data };
	}
</script>

<script>
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	import LayoutContentPage from '../../components/layout/LayoutContentPage.svelte';
	import View from '../../components/content/View.svelte';

	export let full_slug;
	export let uuid;
	export let cached_views_data;

	const global_data = getContext('global_data');
	let model = {};

	if ($route.lang in tags[uuid]) {
		model = tags[uuid][$route.lang];
		model.lang = $route.lang;
	}
	else if (global_data.default_lang in tags[uuid]) {
		model = tags[uuid][global_data.default_lang];
		model.lang = global_data.default_lang;
	}

	model.uuid = uuid;
	model.slug = full_slug;

	// Specific nav state for tags pages.
	// @see src/components/layout/LayoutContentPage.svelte
	// @see src/components/nav/nav.js
	model.parent_page = 'blog';
</script>

<LayoutContentPage {model}>

	<!-- placeholder://src/lib/views.js?f.0.referencing=term/tag:$1&f.0.in=content/blog -->
	<View cache={cached_views_data[0]} />

	<!--
		<View filters={[
			{ "in": "content/blog" },
			{ "referencing": "term/tag:" + model.uuid }
		]} />
	-->

	<!-- DEBUG -->
	<!-- <pre>tag/[slug].svelte : cached_view1_data = {JSON.stringify(cached_view1_data, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : full_slug = {JSON.stringify(full_slug, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->
	<!-- <pre>tag/[slug].svelte : tags = {JSON.stringify(tags, null, 2)}</pre> -->

</LayoutContentPage>

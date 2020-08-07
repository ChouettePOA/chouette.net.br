<script context="module">
	import * as tags_data from '../../cache/tag.json';
	const tags = tags_data.default;

	/**
	 * Implements Sapper route preload "hook".
	 *
	 * Provides page data ("model").
	 *
	 * @param page : object containing `{ path, params, query }`.
	 * @param session : used for credentialled requests.
	 * @return object : page data (model).
	 */
	export async function preload(page, session) {
		const { slug } = page.params;
		let model = {};
		for (const [uuid, data] of Object.entries(tags)) {
			if (data.path == 'tag/' + slug) {
				model = data;
				model.slug = data.path;
			}
		}
		return { model };
	}
</script>

<script>
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	import LayoutContentPage from '../../components/layout/LayoutContentPage.svelte';

	export let model;

	model.title = $route.lang in model ?
		model[$route.lang].title :
		model[global_data.default_lang].title;
</script>

<LayoutContentPage {model}>
	<!-- DEBUG -->
	<!-- <pre>tag/[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
	<pre>tag/[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre>
</LayoutContentPage>

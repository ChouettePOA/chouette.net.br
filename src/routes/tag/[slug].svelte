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
		// model.slug = slug;
		// return { model };
	}
</script>

<script>
	export let model;
</script>

<!-- DEBUG -->
<!-- <pre>tag/[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
<pre>tag/[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre>

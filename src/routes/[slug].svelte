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
		const { slug } = page.params;
		const res = await this.fetch(`${slug}.json`);

		if (res.status !== 200) {
			this.error(res.status, `The path ${slug} was not found`);
			return {};
		}

		const model = await res.json();
		model.slug = slug;
		return { model };
	}
</script>

<script>
	import LayoutContentPage from '../components/layout/LayoutContentPage.svelte';
	// placeholder://src/preprocess.js
	export let model;
</script>

<LayoutContentPage {model}>
	{#each model.content as { c, props }}
		<!-- placeholder://src/preprocess.js -->
	{/each}
</LayoutContentPage>

<!-- DEBUG -->
<!-- <pre>[slug].svelte : route = {JSON.stringify($route, null, 2)}</pre> -->
<!-- <pre>[slug].svelte : model = {JSON.stringify(model, null, 2)}</pre> -->

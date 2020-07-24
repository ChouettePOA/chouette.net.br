<script context="module">

	/**
	 * Implements Sapper route preload "hook".
	 *
	 * Provides blog post data ("model").
	 *
	 * @param page : object containing `{ path, params, query }`.
	 * @param session : used for credentialled requests.
	 * @return object : page data (model).
	 *
	 * @see src/routes/blog/[...post].json.js
	 */
	export async function preload(page, session) {
		let {year, month, slug} = page.params;
		const res = await this.fetch(`${year}/${month}/${slug}.json`);

		if (res.status !== 200) {
			this.error(res.status, `The path ${year}/${month}/${slug} was not found`);
			return {};
		}

		const model = await res.json();
		model.slug = `${year}/${month}/${slug}`;

		// Specific nav state for blog posts.
		// @see src/components/layout/LayoutContentPage.svelte
		// @see src/components/nav/nav.js
		model.active_path = 'blog';

		return { model };
	}
</script>

<script>
	import LayoutContentPage from '../../../components/layout/LayoutContentPage.svelte';
	// placeholder://src/preprocess.js
	export let model;
</script>

<LayoutContentPage {model}>
	{#each model.content as { c, props }}
		<!-- placeholder://src/preprocess.js -->
	{/each}
</LayoutContentPage>

<script>
	/**
	 * @file
	 * This accepts a number of items which have 1 paragraph of text and 1 image,
	 * and optionally a title.
	 *
	 * The layout will depend on the number of paragraphs / image pairs.
	 */
	import Responsive from '../Responsive.svelte';
	export let items = [];
</script>

<Responsive w="43rem" attr={{ "class":"c-media-grid bg-content p-v--l" }}>
	{#each items as item, i}
		<div class="c-media-grid__img { i % 2 == 0 ? '' : 'is-odd' }" style="--row:{i + 1}">
			<img src="{ item.image }" alt="{ item.image_alt }" />
		</div>
		<div class="c-media-grid__body { i % 2 == 0 ? '' : 'is-odd' }" style="--row:{i + 1}">
			{#if item.title }
				<h2 class="c-title-1">{ item.title }</h2>
			{/if}
			<div class="s-rich-text">{@html item.text }</div>
		</div>
	{/each}
</Responsive>

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

<style>
	.container {
		display: grid;
		grid-template-columns: auto 30rem 30rem auto;
		column-gap: 1rem;
		row-gap: 1rem;
	}
</style>

<Responsive w="33rem" attr={{ "class":"bg-content" }}>
	<div class="container">
		{#each items as item}
			<div class="img">
				<img src="{ item.image }" alt="{ item.image_alt }" />
			</div>
			<div class="body">
				{#if item.title }
					<h2 class="c-title-1">{ item.title }</h2>
				{/if}
				<div class="s-rich-text">{ item.text }</div>
			</div>
		{/each}
	</div>
</Responsive>

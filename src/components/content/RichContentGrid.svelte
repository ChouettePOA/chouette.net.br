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
		gap: 1rem;
		grid-template-columns: auto 30rem 30rem auto;
		grid-template-rows: auto;
	}
	.container > * {
		grid-row: var(--row);
	}
	.img {
		grid-column: 2;
	}
	.img.img--odd {
		grid-column: 3;
	}
	.body {
		grid-column: 3;
	}
	.body.body--odd {
		grid-column: 2;
	}
</style>

<Responsive w="43rem, 75rem" attr={{ "class":"bg-content p-v--l" }}>
	<div class="container">
		{#each items as item, i}
			<div class="img { `img--${i % 2 == 0 ? 'even' : 'odd'}` }" style="--row:{i + 1}">
				<img src="{ item.image }" alt="{ item.image_alt }" />
			</div>
			<div class="body { `body--${i % 2 == 0 ? 'even' : 'odd'}` }" style="--row:{i + 1}">
				{#if item.title }
					<h2 class="c-title-1">{ item.title }</h2>
				{/if}
				<div class="s-rich-text">{ item.text }</div>
			</div>
		{/each}
	</div>
</Responsive>

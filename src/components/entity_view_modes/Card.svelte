<script>
	import Text from '../text/Text.svelte';
	import Tag from '../text/Tag.svelte';

	export let title;
	export let path;
	export let description;
	export let published;
	export let image;
	export let tags;

	if (!image) {
		image = '/theme/article-default-500x309.jpg';
	}
</script>

<article class="c-card fx-focus-shadow--ahf fx-scale-up--ahf">
	<div class="c-card__img">
		<img alt="{ title }" src="{ image }" />
	</div>
	<h2 class="c-title-1">
		<a class="no-b" href="/{ path }">
			{ title }
		</a>
	</h2>
	<div class="content s-node-content">
		<Text text={ description } />
	</div>
	<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom m-t--s">
		<small class="o-tgrid__item">
			{#each tags as uuid}
				<Tag {uuid} />
			{/each}
		</small>
		<small class="o-tgrid__item u-right u-nowrap">
			{ published }
		</small>
	</div>
</article>

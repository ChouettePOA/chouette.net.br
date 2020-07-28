<script>
	import Text from '../text/Text.svelte';
	export let cache = {};
</script>

<!-- DEBUG -->
<!-- <pre>View.svelte : cache = {JSON.stringify(cache, null, 2)}</pre> -->

<div class="m-v--xl p-tablet-max-h">
	<div class="o-ibgrid o-ibgrid--center o-ibgrid--gutter-l o-ibgrid--vgutter-l">
		<div class="o-ibgrid__item u-maxw-typo-s">
			{#each cache.results as { title, published, description, path }}
				<article class="c-card fx-focus-shadow--ahf fx-scale-up--ahf">
					<div class="c-card__img">
						<img alt="{title}" src="/theme/article-default-500x309.jpg" />
					</div>
					<h2 class="c-title-1">
						<a class="no-b" href="/{path}">
							{title}
						</a>
					</h2>
					<div class="content s-node-content">
						<Text text={description} />
					</div>
					<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom m-t--s">
						<small class="o-tgrid__item">
							<!-- <a href="/tag/chanson" class="no-b">#chanson</a>
							<a href="/tag/paroles" class="no-b">#paroles</a> -->
						</small>
						<small class="o-tgrid__item u-right u-nowrap">
							{published}
						</small>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>

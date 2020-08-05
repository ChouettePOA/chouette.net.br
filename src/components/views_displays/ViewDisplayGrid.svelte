<script>
	// placeholder://src/preprocess.js#entity_view_modes

	export let results = [];
	export let align = '';
	export let space = '';
	export let view_mode = '';

	const c = view_mode;
</script>

<!-- DEBUG -->
<!-- <pre>ViewDisplayGrid.svelte : results = {JSON.stringify(results, null, 2)}</pre> -->

<div class="o-ibgrid { align === 'center' ? 'o-ibgrid--center' : '' } { space === 'large' ? 'o-ibgrid--gutter-l o-ibgrid--vgutter-l' : '' }">
	{#each results as props}
		<div class="o-ibgrid__item u-maxw-typo-s">
			<!-- placeholder://src/preprocess.js#entity_view_modes -->
		</div>
	{/each}
</div>

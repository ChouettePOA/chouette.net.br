<script>
	/**
	 * @file
	 * Contains other "content" components that need to be laid out as an
	 * inline-block grid.
	 *
	 * TODO wip: workaround circular dependency error (deal breaker) ?
	 */
	// placeholder://src/preprocess.js
	export let content = [];
</script>

<div class="bg-content p-percent">
	<div class="o-ibgrid o-ibgrid--center o-ibgrid--gutter-l m-t--l s-rich-text">
		{#each content as { c, props }}
			<div class="o-ibgrid__item">
				<!-- placeholder://src/preprocess.js -->
			</div>
		{/each}
	</div>
</div>

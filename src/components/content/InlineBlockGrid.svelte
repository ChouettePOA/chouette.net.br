<script>
	/**
	 * @file
	 * Contains other "content" components that need to be laid out as an
	 * inline-block grid.
	 *
	 * TODO wip: workaround circular dependency error (deal breaker) ?
	 */
	import Lede from './Lede.svelte';
	import Map from './Map.svelte';
	import MediaGrid from './MediaGrid.svelte';
	import Table from './Table.svelte';
	import TextCentered from './TextCentered.svelte';
	import TextGrid from './TextGrid.svelte';
	export let content = [];
</script>

<div class="bg-content p-percent">
	<div class="o-ibgrid o-ibgrid--center o-ibgrid--gutter-l m-t--l s-rich-text">
		{#each content as { c, props }}
			<div class="o-ibgrid__item">
				{#if c === 'Lede'}
					<Lede {...props} />
				{:else if c === 'Map'}
					<Map {...props} />
				{:else if c === 'MediaGrid'}
					<MediaGrid {...props} />
				{:else if c === 'Table'}
					<Table {...props} />
				{:else if c === 'TextCentered'}
					<TextCentered {...props} />
				{:else if c === 'TextGrid'}
					<TextGrid {...props} />
				{/if}
			</div>
		{/each}
	</div>
</div>

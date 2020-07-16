<script>
	import InlineBlockGrid from './content/InlineBlockGrid.svelte';
	import Lede from './content/Lede.svelte';
	import Map from './content/Map.svelte';
	import MediaGrid from './content/MediaGrid.svelte';
	import Table from './content/Table.svelte';
	import TextCentered from './content/TextCentered.svelte';
	import TextGrid from './content/TextGrid.svelte';
	export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'InlineBlockGrid'}
		<InlineBlockGrid {...props} />
	{:else if c === 'Lede'}
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
{/each}

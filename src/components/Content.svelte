<script>
import Lede from './content/Lede.svelte';
import Map from './content/Map.svelte';
import MediaGrid from './content/MediaGrid.svelte';
import TextCentered from './content/TextCentered.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Lede'}
		<Lede {...props} />
	{:else if c === 'Map'}
		<Map {...props} />
	{:else if c === 'MediaGrid'}
		<MediaGrid {...props} />
	{:else if c === 'TextCentered'}
		<TextCentered {...props} />
	{/if}
{/each}

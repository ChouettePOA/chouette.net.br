<script>
import Lede from './content/Lede.svelte';
import Pimg from './content/Pimg.svelte';
import RichContentGrid from './content/RichContentGrid.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Lede'}
		<Lede {...props} />
	{:else if c === 'Pimg'}
		<Pimg {...props} />
	{:else if c === 'RichContentGrid'}
		<RichContentGrid {...props} />
	{/if}
{/each}

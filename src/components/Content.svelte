<script>
import Lede from './content/Lede.svelte';
import Pimg from './content/Pimg.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Lede'}
		<Lede {...props} />
	{:else if c === 'Pimg'}
		<Pimg {...props} />
	{/if}
{/each}

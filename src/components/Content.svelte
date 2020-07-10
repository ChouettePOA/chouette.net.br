<script>
import Lede from './content/Lede.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Lede'}
		<Lede {...props} />
	{/if}
{/each}

<script>
import Meta from '../components/Meta.svelte';
import Text from '../components/text/Text.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Meta'}
		<Meta {...props} />
	{:else if c === 'Text'}
		<Text {...props} />
	{/if}
{/each}

<script>
import Text from '../components/text/Text.svelte';
export let content = [];
</script>

{#each content as { c, props }}
	{#if c === 'Text'}
		<Text {...props} />
	{/if}
{/each}

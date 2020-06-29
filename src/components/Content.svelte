<script>
import { onMount } from 'svelte';
import Text from '../components/text/Text.svelte';
export let content = [];

onMount(() => {
	content.forEach(component => {
		switch (component.c) {
			case 'Text':
				const text = new Text({
					target: document.querySelector('#content'),
					props: component.props
				});
				break;
		}
	});
});
</script>

<!-- {#each content as { c, props }}
	<svelte:component this={c} {...props} />
{/each} -->

<div id="content"></div>

<!-- DEBUG -->
<pre>Content.svelte : content = {JSON.stringify(content, null, 2)}</pre>

<script context="module">
	import * as tags_data from '../../cache/tags.json';
	const tags = tags_data.default;
</script>

<script>
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';

	export let uuid;
	export let no_link = false;
	export let attr = {};

	let link = '';
	let title = '';
	const global_data = getContext('global_data');

	if (!('class' in attr)) {
		attr.class = 'c-tag';
	}

	if (uuid && tags[uuid]) {
		title = $route.lang in tags[uuid] ?
			tags[uuid][$route.lang].title :
			tags[uuid][global_data.default_lang].title;
		if (!no_link) {
			link = tags[uuid].path;
		}
	}
</script>

<!-- DEBUG -->
<pre>Tag.svelte : results = {JSON.stringify(tags, null, 2)}</pre>

{#if no_link}
	<span {...attr}>
		{@html title}
	</span>
{:else}
	<a href="{ link }" {...attr}>
		{@html title}
	</a>
{/if}

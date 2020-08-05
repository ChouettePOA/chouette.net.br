<script>
	// placeholder://src/preprocess.js#views_displays

	export let cache = {};
	export let space = 'large';

	const c = cache.settings.display.c;
	const props = cache.settings.display.props;

	props.results = cache.results;
</script>

<!-- DEBUG -->
<!-- <pre>View.svelte : cache = {JSON.stringify(cache, null, 2)}</pre> -->

<div class="{ space === 'large' ? 'm-v--xl p-tablet-max-h' : '' }">
	<!-- placeholder://src/preprocess.js#views_displays -->
</div>

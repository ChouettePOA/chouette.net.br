<script>
	// placeholder://src/preprocess.js#views_displays

	export let space = 'large';

	// export let filters = {};
	// export let sorts = {};
	// export let display = {};
	// export let pager = {};
	// export let exposed = {};
	// const cache = preload({filters, sorts, display, pager, exposed});

	export let cache = {};

	// Variables "c" and "props" are required to use the dynamic components below.
	// They are used by any component in src/components/views_displays
	// @see src/preprocess.js
	const c = cache.settings.display.c;
	const props = cache.settings.display.props;
	props.results = cache.results;
</script>

<!-- DEBUG -->
<!-- <pre>View.svelte : cache = {JSON.stringify(cache, null, 2)}</pre> -->

<div class="{ space === 'large' ? 'm-v--xl p-tablet-max-h' : '' }">
	<!-- placeholder://src/preprocess.js#views_displays -->
</div>

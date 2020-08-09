<script context="module">

	/**
	 * TODO failed test (fetch cannot be used outside of routes).
	 *
	 * Fetches pre-compiled cache files based on props.
	 */
	export async function preload(props) {
		// Cache files are named using the props passed to each view instance.
		// const res = await this.fetch(views_get_cache_file_path(props));
		// if (res.status !== 200) {
		// 	this.error(res.status, `The path views-cache/${full_slug} was not found`);
		// 	return {};
		// }
		// return await res.json();
	}

	/**
	 * Gets the pre-compiled cache file path corresponding to the props.
	 */
	export function views_get_cache_file_path(props) {
		// console.log(`views-cache/${views_hash_props(JSON.stringify(props))}.json`);
		return `views-cache/${views_hash_props(JSON.stringify(props))}.json`;
	}

	/**
	 * Converts a string into a 53-bit hash.
	 *
	 * @see https://stackoverflow.com/a/52171480/2592338
	 */
	export function views_hash_props(str, seed = 0) {
		let h1 = 0xdeadbeef ^ seed;
		let h2 = 0x41c6ce57 ^ seed;
		for (let i = 0, ch; i < str.length; i++) {
			ch = str.charCodeAt(i);
			h1 = Math.imul(h1 ^ ch, 2654435761);
			h2 = Math.imul(h2 ^ ch, 1597334677);
		}
		h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
		h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
		return 4294967296 * (2097151 & h2) + (h1>>>0);
	}

</script>

<script>
	// placeholder://src/preprocess.js#views_displays

	export let filters = {};
	export let sorts = {};
	export let display = {};
	export let pager = {};
	export let exposed = {};

	export let space = 'large';

	// TODO failed test - use https://github.com/kaisermann/svelte-loadable instead ?
	const cache = preload({filters, sorts, display, pager, exposed});

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

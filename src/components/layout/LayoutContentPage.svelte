<script>
	import { afterUpdate } from 'svelte';
	import { route } from '../../stores/route.js';
	import Header from '../header/Header.svelte';
	import Footer from '../Footer.svelte';

	export let model;

	/**
	 * Implements Svelte afterUpdate "hook".
	 *
	 * Update current route page title from page data (model) for all descendant
	 * components once the DOM is in sync with data.
	 *
	 * This prevents out-of-sync state when the routing store is updated from the
	 * async preloaded data.
	 */
	afterUpdate(async () => {
		if ('title' in model && 'slug' in model) {
			route.update(existing => {
				existing.title = model.title;
				existing.path = model.slug;
				existing.lang = model.lang;
				existing.description = model.description;
				existing.image = model.poster_image;
				return existing;
			});
		}
	});
</script>

<Header {model} />

<main id="main-content">
	<slot />
</main>

<Footer />

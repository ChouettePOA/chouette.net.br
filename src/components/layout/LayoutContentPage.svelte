<script>
	import { afterUpdate } from 'svelte';
	import { route } from '../../stores/route.js';
	import Header from '../header/Header.svelte';
	import Footer from '../Footer.svelte';

	export let model;

	/**
	 * TODO verify if in some cases it's faster to call this twice - in <script>
	 * scope directly + in afterUpdate(), see below.
	 */
	const update_route = model => {
		if ('title' in model && 'slug' in model) {
			route.update(existing => {
				existing.title = model.title;
				existing.path = model.slug;
				existing.lang = model.lang;
				existing.description = model.description;
				existing.image = model.poster_image;

				// Allow to specify active menu items through the route store.
				// @see src/routes/[year([0-9]+)]/[month([0-9]+)]/[slug].svelte
				// @see src/components/nav/nav.js
				if ('active_path' in model) {
					existing.active_path = model.active_path;
				}
				else if ('active_path' in existing) {
					delete existing.active_path;
				}

				return existing;
			});
		}
	}

	update_route(model);

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
		update_route(model);
	});
</script>

<Header {model} />

<main id="main-content">
	<slot />
</main>

<Footer />

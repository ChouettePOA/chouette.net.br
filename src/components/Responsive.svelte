<script context="module">
	let ro = null;

	/**
	 * Provides a singleton ResizeObserver object for reuse across all instances
	 * of this component.
	 */
	const resize_observer_singleton = () => {
		if (ro) {
			return ro;
		}

		ro = new ResizeObserver(function(entries) {
			entries.forEach(function(entry) {

				// Default breakpoints that should apply to all observed elements that
				// don't define their own custom breakpoints are hardcoded below.
				var breakpoints = entry.target.dataset.breakpoints ?
					JSON.parse(entry.target.dataset.breakpoints) :
					{SM: 384, MD: 576, LG: 768, XL: 960};

				// Use the data-obsevering attribute to target observed elements in CSS.
				if (entry.width === 0) {
					entry.target.dataset.observing = false;
				} else {
					entry.target.dataset.observing = true;
				}

				// Update the matching breakpoints on the target element.
				Object.keys(breakpoints).forEach(function(breakpoint) {
					var minWidth = breakpoints[breakpoint];
					if (entry.contentRect.width >= minWidth) {
						entry.target.classList.add(breakpoint);
					} else {
						entry.target.classList.remove(breakpoint);
					}
				});
			});
		});

		return ro;
	}
</script>

<script>
	import { onMount, onDestroy } from 'svelte';
	export let props = {};
	let component_dom_element;

	/**
	 * Implements Svelte onMount() hook.
	 *
	 * Adds the DOM element corresponding to this component instance to the list
	 * observed by our ResizeObserver singleton.
	 *
	 * @see resize_observer_singleton()
	 */
	onMount(async () => {
		const ro = resize_observer_singleton();
		ro.observe(component_dom_element);
	});

	/**
	 * Implements Svelte onDestroy() hook.
	 *
	 * Removes the DOM element corresponding to this component instance from the
	 * list observed by our ResizeObserver singleton.
	 *
	 * @see resize_observer_singleton()
	 */
	onDestroy(async () => {
		if (component_dom_element) {
			const ro = resize_observer_singleton();
			ro.unobserve(component_dom_element);
		}
	});
</script>

<div bind:this={component_dom_element} {...props}>
  <slot></slot>
</div>

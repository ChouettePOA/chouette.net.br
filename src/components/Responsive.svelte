<script context="module">

	// Unique reference shared by all instances of this component. Must only be
	// initialized on the client, because there's no such thing as ResizeObserver
	// API for server-side rendering.
	// @see resize_observer_singleton()
	// @see onMount()
	let ro = null;

	/**
	 * Utility to convert any CSS value in pixels.
	 *
	 * Required by the ResizeObserver API because ContentRect values are in pixels.
	 * Temporarily creates an empty div inside the element (position:'absolute')
	 * to measure the real pixel value given by the browser, of any CSS unit.
	 *
	 * @see observed_element_toggle_classes()
	 */
	const resize_observer_get_pixels = (value, el) => {
		let test = document.createElement('div');
		Object.assign(test.style, {
			position: 'absolute',
			width: value
		});
		el.target.appendChild(test);
		let pixels = test.offsetWidth;
		el.target.removeChild(test);
		return pixels;
	};

	/**
	 * Utility to provide a prefix for classes.
	 *
	 * TODO implement a way to override this.
	 */
	const observed_element_get_prefix = () => '';

	/**
	 * Utility to toggle classes on individual elements.
	 */
	const observed_element_toggle_classes = (watched, dimension, value, contentRect) => {
		const length = dimension === 'w' ? contentRect.width : contentRect.height;
		const q = length <= resize_observer_get_pixels(value, watched);
		watched.target.classList.toggle(`${observed_element_get_prefix()}${dimension}-lte-${value}`, q);
		watched.target.classList.toggle(`${observed_element_get_prefix()}${dimension}-gt-${value}`, !q);
	};

	/**
	 * Individual "watched" element process.
	 *
	 * Assigns classes according to the space available around given DOM element.
	 * Based on @Heydon's watched-box implementation.
	 *
	 * Default breakpoints that should apply to all observed elements that don't
	 * define their own custom breakpoints are hardcoded below.
	 *
	 * See https://github.com/Heydon/watched-box
	 */
	const observed_element_update = (watched) => {
		const contentRect = watched.contentRect;

		const widths = watched.target.dataset.widthBreaks;
		if (widths && widths.length) {
			widths.replace(/ /g, '').split(',').forEach(width => {
				observed_element_toggle_classes(watched, 'w', width, contentRect);
			});
		}

		const heights = watched.target.dataset.heightBreaks;
		if (heights && heights.length) {
			heights.replace(/ /g, '').split(',').forEach(height => {
				observed_element_toggle_classes(watched, 'h', height, contentRect);
			});
		}

		// Orientation classes to mimic the orientation @media query.
		const ratio = contentRect.width / contentRect.height;
		watched.target.classList.toggle(`${observed_element_get_prefix()}is-landscape`, ratio > 1);
		watched.target.classList.toggle(`${observed_element_get_prefix()}is-portrait`, ratio < 1);
		watched.target.classList.toggle(`${observed_element_get_prefix()}is-square`, ratio == 1);
	};

	/**
	 * Gets the singleton ResizeObserver object.
	 *
	 * Provides the same object for reuse across all instances of this component.
	 */
	const resize_observer_singleton = () => {
		if (ro) {
			return ro;
		}
		ro = new ResizeObserver((entries) => {
			entries.forEach((watched) => observed_element_update(watched));
		});
		return ro;
	}
</script>

<script>
	import { onMount, onDestroy } from 'svelte';

	export let attr = {};
	export let w = '';
	export let h = '';

	let component_instance;

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
		ro.observe(component_instance);
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
		if (component_instance) {
			const ro = resize_observer_singleton();
			ro.unobserve(component_instance);
		}
	});
</script>

<div bind:this={component_instance} data-width-breaks={w} data-height-breaks={h} {...attr}>
  <slot></slot>
</div>

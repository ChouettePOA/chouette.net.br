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
	const ro_get_pixels = (value, el) => {
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
	const ro_get_class_prefix = () => '';

	/**
	 * Utility to toggle classes on individual elements.
	 */
	const observed_element_toggle_classes = (watched, dimension, value, contentRect) => {
		const length = dimension === 'w' ? contentRect.width : contentRect.height;
		const q = length <= ro_get_pixels(value, watched);
		watched.target.classList.toggle(`${ro_get_class_prefix()}${dimension}-lte-${value}`, q);
		watched.target.classList.toggle(`${ro_get_class_prefix()}${dimension}-gt-${value}`, !q);
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
		watched.target.classList.toggle(`${ro_get_class_prefix()}is-landscape`, ratio > 1);
		watched.target.classList.toggle(`${ro_get_class_prefix()}is-portrait`, ratio < 1);
		watched.target.classList.toggle(`${ro_get_class_prefix()}is-square`, ratio == 1);
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
	export let attr = {};
	export let w = '';
	export let h = '';

	/**
	 * Implements Svelte 'use' hook (action).
	 *
	 * Called when an element is created = mounted in the DOM.
	 * Can return an object with a destroy method that is called after the element
	 * is unmounted.
	 */
	const init = component_instance => {
		const ro = resize_observer_singleton();
		ro.observe(component_instance);

		return {
			destroy() {
				ro.unobserve(component_instance);
			}
		};
	};
</script>

<div use:init data-width-breaks={w} data-height-breaks={h} {...attr}>
  <slot></slot>
</div>

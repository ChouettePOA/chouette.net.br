<script context="module">
	// import Responsive from '../../node_modules/watched-box/watched-box.min.js';
</script>

<script>
	import { onMount, onDestroy } from 'svelte';
	import { ro } from '../lib/responsive-components.js';

	export let props = {};
	let el;

	onMount(async () => ro.observe(el));
	// onDestroy(() => ro.unobserve(el));
</script>

<div bind:this={el} data-observe-resizes {...props}>
  <slot></slot>
</div>

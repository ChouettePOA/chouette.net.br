<script>
	/**
	 * @file
	 * A simple horizontal, medium sized, centered text component.
	 */
	import Text from '../text/Text.svelte';
	export let text = '';
</script>

<Text {text} attr={{ "class":"u-center c-text-block u-fs-m s-rich-text p-v--xl" }} />

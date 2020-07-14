<script>
	import Text from '../text/Text.svelte';
	import Responsive from '../Responsive.svelte';
	export let text = '';
</script>

<style>
/* .SM */
</style>

<Responsive w="33rem, 57rem, 95rem" attr={{ "class":"m-v--xl p-percent-h" }}>
	<Text {text}
		options={{ "dropcap":true, "dropcap_variant":"u-dropcap--l" }}
		attr={{ "class":"c-text-block u-fs-m" }} />
</Responsive>

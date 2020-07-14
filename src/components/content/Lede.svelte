<script>
	import Text from '../text/Text.svelte';
	import Responsive from '../Responsive.svelte';
	export let text = '';
</script>

<style>
/* .SM */
</style>

<Responsive attr={{ "class":"m-v--xl p-percent-h", "data-width-breaks":"15rem, 30rem, 50rem" }}>
	<Text {text}
		options={{ "dropcap":true, "dropcap_variant":"u-dropcap--l" }}
		attr={{ "class":"c-text-block u-fs-m" }} />
</Responsive>

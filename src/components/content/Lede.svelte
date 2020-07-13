<script>
	import Text from '../text/Text.svelte';
	import Responsive from '../Responsive.svelte';
	export let text = '';
</script>

<Responsive>
	<div class="m-v--xl p-percent-h">
		<Text {text}
			options={{ "dropcap":true, "dropcap_variant":"u-dropcap--l" }}
			attr={{ "class":"c-text-block u-fs-m" }} />
	</div>
</Responsive>

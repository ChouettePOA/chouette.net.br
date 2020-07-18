<script>
	import Text from '../text/Text.svelte';
	export let text = '';
</script>

<div class="m-v--xl p-percent-h">
	<Text {text} dropcap={true} dropcap_variant="u-dropcap--l"
		attr={{ "class":"c-text-block u-fs-m" }} />
</div>

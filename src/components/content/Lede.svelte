<script>
	import Text from '../text/Text.svelte';
	import WatchedBox from '../WatchedBox.svelte';
	export let text = '';
</script>

<WatchedBox widthBreaks="70ch, 900px" heightBreaks="50vh, 60em">
	<div class="m-v--xl p-percent-h">
		<Text {text}
			options={{ "dropcap":true, "dropcap_variant":"u-dropcap--l" }}
			attr={{ "class":"c-text-block u-fs-m" }} />
	</div>
</WatchedBox>

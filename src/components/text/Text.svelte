<script>
	import DropCap from "./DropCap.svelte";

	export let attr = {
		class: "clearfix"
	};
	export let options = {
		dropcap: false,
		dropcap_variant: "u-dropcap",
	};
	export let text = '';

	let first_word = "";
	if (options.dropcap) {
		first_word = text.replace(/ .*/, "");
		text = text.substr(first_word.length);
	}
</script>

<p {...attr}>
	{#if options.dropcap}
		<DropCap text={first_word} variant={options.dropcap_variant} />
	{/if}
	{@html text}
	<slot />
</p>

<script>
	/**
	 * @file
	 * Paragraph of text with optional dropcap.
	 */
	import DropCap from "./DropCap.svelte";

	export let text = '';
	export let attr = {};
	export let dropcap = false;
	export let dropcap_variant = "u-dropcap";

	let first_word = "";
	if (dropcap) {
		first_word = text.replace(/ .*/, "");
		text = text.substr(first_word.length);
	}
</script>

<p {...attr}>
	{#if dropcap}
		<DropCap text={first_word} variant={dropcap_variant} />
	{/if}
	{@html text}
</p>

<script>
	/**
	 * @file
	 * Paragraphs of text displayed as inline-block grid.
	 */
	import Text from '../text/Text.svelte';
	export let items = [];
</script>

<div class="p-percent">
	<div class="o-ibgrid o-ibgrid--center o-ibgrid--gutter-percent">
		{#each items as item, i}
			<div class="o-ibgrid__item u-fs-m u-desktop-w-1of2">
				<Text text={item.text}
					options={{ "dropcap":true, "dropcap_variant":"u-dropcap--l" }}
					attr={{ "class":"p-b--l c-text-block s-rich-text" }} />
			</div>
		{/each}
	</div>
</div>

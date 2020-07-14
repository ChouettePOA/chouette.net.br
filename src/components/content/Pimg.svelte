<script>
	import Responsive from '../Responsive.svelte';
	import Text from '../text/Text.svelte';

	export let title = '';
	export let image = '';
	export let image_alt = '';
	export let text = '';
</script>

<style>
</style>

<Responsive w="33rem" attr={{ "class":"c-pimg bg-content" }}>
	<div class="c-pimg__inner-wrap o-tablet-media">
		<div class="o-tablet-media__img c-pimg__img u-tablet-w-1of3 u-desktop-w-1of2">
			<img src="{ image }" alt="{ image_alt }" />
		</div>
		<div class="o-tablet-media__body c-pimg__text u-tablet-w-2of3 u-desktop-w-1of2">
			<h2 class="c-title-1">{ title }</h2>
			<div class="s-rich-text">
				<Text {text} />
			</div>
		</div>
	</div>
</Responsive>

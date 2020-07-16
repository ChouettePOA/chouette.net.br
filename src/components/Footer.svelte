<script context="module">
	import * as footer_data from '../content/block/footer.json'
</script>

<script>
	// import { getContext } from 'svelte';
	import { route } from '../stores/route.js';
	const footer = footer_data[$route.lang];
	// const global_data = getContext('global_data');
</script>

<footer class="p-percent">
	<hr class="m-b">
	<div class="o-ibgrid o-ibgrid--gutter-percent o-ibgrid--middle u-center">
		<div class="o-ibgrid__item">
			<div class="p-percent">
				<picture class="bg-content u-round p--xl">
					<source type="image/svg+xml" srcset="/theme/chouette.svg">
					<img src="/theme/chouette.png" alt="{ footer.mascott_alt }">
				</picture>
			</div>
		</div>
		<div class="o-ibgrid__item">
			<h2 class="c-title p-b">
				{ footer.phone_cta }
				<span class="icon-mobile fx-rotate-20"></span>
			</h2>
			<div class="u-fs-l s-rich-text">
				<div class="m-t">
					<span class="u-thin">{ footer.phone_label }</span> : { footer.phone }
					<br />
					<span class="u-thin">{ footer.email_label }</span> :
					<span class="u-nowrap">
						<a href="mailto:{ footer.email }">{ footer.email }</a>
					</span>
				</div>
			</div>
			<a class="u-inline-block m-t" href="https://www.facebook.com/chouettepoa">facebook.com/chouettepoa</a>
		</div>
	</div>
	<div class="u-center u-fs-xl u-nowrap">• •</div>
	<div class="p-percent-h u-center">
		Copyright © 2015–{ new Date().getFullYear() }<br />
		{ footer.ltda_name }
		<abbr title="{ footer.ltda_label }">{ footer.ltda_acronym }</abbr>
	</div>
</footer>

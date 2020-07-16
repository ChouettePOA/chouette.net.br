<script>
	/**
	 * @file
	 * Contains the Google map with the school address.
	 */
	import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	const global_data = getContext('global_data');
</script>

<section class="p-mobile-percent">
  <h2 class="p bg-content">
    <span class="icon-location"></span>
		{ global_data.ui_i10n[$route.lang]["Address"] }
	</h2>
  <address class="p-h p-b bg-content">
		{@html global_data.address_lines.join('<br />') }
	</address>
  <div class="FlexEmbed js-mousewheel-scroll-iframe-fix">
    <div class="FlexEmbed-ratio FlexEmbed-ratio--3by1 FlexEmbed-tablet-ratio--2by1 FlexEmbed-mobile-ratio--square"></div>
    <div class="FlexEmbed-content FlexEmbed-content--inner-max">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2266279498663!2d-51.217256284891555!3d-30.030355481887412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979aebf2e6ffd%3A0xe68a061be23d5b7a!2sChouette+-+Institut+de+Fran%C3%A7ais!5e0!3m2!1sen!2sbr!4v1461939808156" style="border: 0px none; pointer-events: none;" allowfullscreen="" width="600" height="450" frameborder="0" title="{ global_data.site_name }"></iframe>
		</div>
    <div class="FlexEmbed-overlay o-vcenter fx-fade js-iframe-scroll-overlay is-on" aria-hidden="true">
      <span class="FlexEmbed-overlay__text">Click or tap to activate</span>
    </div>
  </div>
</section>

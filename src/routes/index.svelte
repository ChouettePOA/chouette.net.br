<script context="module">
	import * as homepage_masthead from '../entities/block/homepage_masthead.json'
</script>

<script>
	import { route } from '../stores/route.js';
	import { getContext } from 'svelte';
	import { nav_menu_get_items } from '../components/nav/nav.js';
	import MenuMain from '../components/nav/MenuMain.svelte';
	import DropCap from '../components/text/DropCap.svelte';
	import Footer from '../components/Footer.svelte';

	const global_data = getContext('global_data');

	route.update(existing => {
		existing.path = "";
		existing.title = global_data.site_name;
		existing.description = "Escola de língua francesa em Porto Alegre para ensinar e trocar conhecimentos e experiências em torno da cultura francófona.";
		existing.lang = "pt";
		return existing;
	});

	const header = homepage_masthead[$route.lang];
	let menu_main_items = nav_menu_get_items(global_data, $route, 0);
</script>

<!-- DEBUG -->
<!-- <pre>index.svelte : global_data = {JSON.stringify(global_data, null, 2)}</pre> -->
<!-- <pre>index.svelte : $route = {JSON.stringify($route, null, 2)}</pre> -->
<!-- <pre>index.svelte : menu_main_items = {JSON.stringify(menu_main_items, null, 2)}</pre> -->
<!-- <pre>index.svelte : nav_menu_get_items($route) = {JSON.stringify(nav_menu_get_items($route), null, 2)}</pre> -->
<!-- <pre>index.svelte : $route.trails = {JSON.stringify($route.trails, null, 2)}</pre> -->

<div class="u-bg-white">
	<div class="c-header c-header--home u-relative">
		<div class="c-header__inner-wrap">

			<div class="c-header__bg">
				<img class="c-header__bg-img" src="/theme/wing.svg" alt="" role="presentation" />
			</div>

			<header>
				<div class="c-header__nav p--s">
					<MenuMain bind:items={menu_main_items} />
				</div>
				<h1 class="c-header__logo bg-content u-center">
					<div class="c-header__logo-img">
						<img src="/theme/chouette-logo.svg" alt="{ global_data.site_name }" />
					</div>
				</h1>
			</header>

			<section class="p-percent">
				<h2 class="c-header__title u-fontB">
					<span class="c-header__title-p1 u-block">{ header.title_p1 }</span>
					<span class="c-header__title-p2 u-block">{ header.title_p2 }</span>
				</h2>
				<div class="c-header__intro c-text-block u-fs-m">
					<DropCap text={ header.intro_p1 } />
					<p class="m-t">{ header.intro_p2 }</p>
				</div>
			</section>

			<section class="c-header__part2">
				<h2 class="c-header__courses-title p-mobile-percent u-fontB">
					<span class="c-header__courses-title-p1 u-block u-light">{ header.courses_p1 }</span>
					<span class="c-header__courses-title-p2 u-block u-light">{ header.courses_p2 }</span>
				</h2>
				<div class="c-header__courses-list c-text-block">
					<ul class="list-disc p-mobile-percent">
						{#each header.courses_text_lines as course_text_line}
							<li>{ course_text_line }</li>
						{/each}
					</ul>
				</div>
			</section>

		</div>
	</div>
</div>

<!-- <main id="main-content"></main> -->
<Footer />

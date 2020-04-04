<script>
	import Nav from '../../components/Nav.svelte';
	import { site_information } from '../../stores/site_information.js';
	export let segment;
	export const site_name = site_information.site_name;
	export const header = site_information.homepage.header;
</script>

<div class="u-bg-white">
	<div class="c-header c-header--home u-relative">
		<div class="c-header__inner-wrap">
			<picture class="c-header__bg">
				<source type="image/svg+xml" srcset="/img/wing.svg">
				<img class="c-header__bg-img" src="/img/wing.png" alt="" role="presentation" />
			</picture>
			<header>
				<div class="c-header__nav p--s">
					<Nav {segment}/>
				</div>
				<h1 class="c-header__logo bg-content u-center">
					<picture class="c-header__logo-img">
						<source type="image/svg+xml" srcset="/img/chouette-logo.svg">
						<img src="/img/chouette-logo.png" alt="{ site_name } - Cursos de Francês" />
					</picture>
				</h1>
			</header>

			<div class="c-header__tools">
				<!-- <?php include '_page_top.tpl.inc'; ?> -->
			</div>

			<section class="p-percent">
				<h2 class="c-header__title u-fontB">
					<span class="c-header__title-p1 u-block">{ header.title_p1 }</span>
					<span class="c-header__title-p2 u-block">{ header.title_p1 }</span>
				</h2>
				<div class="c-header__intro c-text-block u-fs-m">
					<p>{ header.intro_p1 }</p>
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

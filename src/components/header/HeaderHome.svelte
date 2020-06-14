<script>
	import Nav from '../../components/Nav.svelte';
	import DropCap from '../../components/text/DropCap.svelte';
	import { site_information } from '../../stores/site_information.js';

	const model = {
		lang: 'pt',
		active_slug: '/'
	}

	export const site_name = $site_information.site_name;
	export const header = $site_information.homepage.header;
</script>

<div class="u-bg-white">
	<div class="c-header c-header--home u-relative">
		<div class="c-header__inner-wrap">
			<div class="c-header__bg">
				<img class="c-header__bg-img" src="/theme/wing.svg" alt="" role="presentation" />
			</div>
			<header>
				<div class="c-header__nav p--s">
					<Nav {model} />
				</div>
				<h1 class="c-header__logo bg-content u-center">
					<div class="c-header__logo-img">
						<img src="/theme/chouette-logo.svg" alt="{ site_name } - Cursos de Francês" />
					</div>
				</h1>
			</header>

			<div class="c-header__tools">
				<!-- <?php include '_page_top.tpl.inc'; ?> -->
			</div>

			<section class="p-percent">
				<h2 class="c-header__title u-fontB">
					<span class="c-header__title-p1 u-block">{ header.title_p1 }</span>
					<span class="c-header__title-p2 u-block">{ header.title_p2 }</span>
				</h2>
				<div class="c-header__intro c-text-block u-fs-m">
					<!-- <p>{ header.intro_p1 }</p> -->
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

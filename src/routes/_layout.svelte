<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

{#if segment === undefined}
	<div class="u-bg-white">
		<div class="c-header c-header--home u-relative">
			<div class="c-header__inner-wrap">
				<picture class="c-header__bg">
					<source type="image/svg+xml" srcset="<!-- <?php print url($theme_path . '/img/wing.svg'); ?> -->">
					<img class="c-header__bg-img" src="<!-- <?php print url($theme_path . '/img/wing.png'); ?> -->" alt="" role="presentation" />
				</picture>
				<header>
					<div class="c-header__nav p--s">
						<Nav {segment}/>
					</div>
					<h1 class="c-header__logo bg-content u-center">
						<picture class="c-header__logo-img">
							<source type="image/svg+xml" srcset="<!-- <?php print url($theme_path . '/img/chouette-logo.svg'); ?> -->">
							<img src="<!-- <?php print url($theme_path . '/img/chouette-logo.png'); ?> -->" alt="Chouette Institut de Français - Cursos de Francês" />
						</picture>
					</h1>
				</header>

				<div class="c-header__tools">
					<!-- <?php include '_page_top.tpl.inc'; ?> -->
				</div>

				<section class="p-percent">
					<h2 class="c-header__title u-fontB">
						<span class="c-header__title-p1 u-block"><!-- <?php print $chouette_home_header_title_p1; ?> --></span>
						<span class="c-header__title-p2 u-block"><!-- <?php print $chouette_home_header_title_p2; ?> --></span>
					</h2>
					<div class="c-header__intro c-text-block u-fs-m">
						<p><!-- <?php print $chouette_home_header_intro_p1; ?> --></p>
						<p class="m-t"><!-- <?php print $chouette_home_header_intro_p2; ?> --></p>
					</div>
				</section>

				<section class="c-header__part2">
					<h2 class="c-header__courses-title p-mobile-percent u-fontB">
						<span class="c-header__courses-title-p1 u-block u-light"><!-- <?php print $chouette_home_header_courses_title_p1; ?> --></span>
						<span class="c-header__courses-title-p2 u-block u-light"><!-- <?php print $chouette_home_header_courses_title_p2; ?> --></span>
					</h2>
					<div class="c-header__courses-list c-text-block">
						<ul class="list-disc p-mobile-percent">
							<!-- <?php foreach ($chouette_home_header_courses_list_items as $course_text_line) : ?> -->
								<li><!-- <?php print t($course_text_line); ?> --></li>
							<!-- <?php endforeach; ?> -->
						</ul>
					</div>
				</section>
			</div>
		</div>
	</div>
{:else}
	<div class="c-menu-main p">
		<div class="c-text-block--xl">
			<Nav {segment}/>
		</div>
	</div>
	<header class="bg-content m-b--l p-h">
		<div class="c-breadcrumb c-text-block--xl p-t--l">
			<nav class="c-breadcrumb__inner-wrap" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
				<!-- <?php print $breadcrumb; ?> -->
			</nav>
		</div>
		<div class="c-text-block--xxl">
			<div class="o-ibgrid o-ibgrid--middle o-ibgrid--gutter o-ibgrid--inward o-ibgrid--center o-ibgrid--nowrap">
				<!-- <?php if ($logo): ?> -->
					<div class="o-ibgrid__item u-mxw-1of3">
						<a class="m-center p p-tablet--l no-p-l u-center u-inline-block no-underline u-mxw-logo-pic" href="<!-- <?php print $front_page; ?> -->" title="<!-- <?php print t('Home'); ?> -->" rel="home">
							<picture>
								<source type="image/svg+xml" srcset="<!-- <?php print url($theme_path . '/img/chouette.svg'); ?> -->">
								<img class="c-header__bg-img" src="<!-- <?php print url($theme_path . '/img/chouette.png'); ?> -->" alt="Chouette Institut de Français - Cursos de Francês" />
							</picture>
						</a>
					</div>
				<!-- <?php endif; ?> -->
				<!-- <?php if ($title): ?> -->
					<div class="o-ibgrid__item u-mxw-2of3">
						<!-- <?php print render($title_prefix); ?> -->
						<h1 class="c-title p-percent-v"<!-- <?php print $title_attributes; ?> -->>
							<!-- <?php print $title; ?> -->
						</h1>
						<!-- <?php print render($title_suffix); ?> -->
					</div>
				<!-- <?php endif; ?> -->
			</div>
			<!-- <?php if (!empty($subnav)): ?> -->
				<div class="u-center u-bottom">
					<div class="u-inline-block">
						<!-- <?php foreach ($subnav as $depth => $nav_links): ?> -->
							<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom">
								<!-- <?php foreach ($nav_links as $nav_link): ?> -->
									<div class="o-tgrid__item">
										<!-- <?php print $nav_link; ?> -->
									</div>
								<!-- <?php endforeach; ?> -->
							</div>
						<!-- <?php endforeach; ?> -->
					</div>
				</div>
			<!-- <?php endif; ?> -->
		</div>
	</header>
{/if}

<main id="main-content">
	<slot></slot>
</main>

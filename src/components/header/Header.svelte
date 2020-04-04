<script>
	import Nav from '../../components/Nav.svelte';
	// import { site_information } from '../../stores/site_information.js';
	// export const site_name = site_information.site_name;
	export let segment;
</script>

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
					<a class="m-center p p-tablet--l no-p-l u-center u-inline-block no-underline u-mxw-logo-pic" href="/" title="Home" rel="home">
						<picture>
							<source type="image/svg+xml" srcset="/img/chouette.svg">
							<img class="c-header__bg-img" src="/img/chouette.png" alt="Chouette Institut de Français - Cursos de Francês" />
						</picture>
					</a>
				</div>
			<!-- <?php endif; ?> -->
			<!-- <?php if ($title): ?> -->
				<div class="o-ibgrid__item u-mxw-2of3">
					<!-- <?php print render($title_prefix); ?> -->
					<h1 class="c-title p-percent-v">
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

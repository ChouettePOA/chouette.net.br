<script>
	import Nav from '../../components/Nav.svelte';
	// import { site_information } from '../../stores/site_information.js';
	// export const site_name = site_information.site_name;

	export let model;
</script>

<div class="c-menu-main p">
	<div class="c-text-block--xl">
		<Nav {model} />
	</div>
</div>

<header class="bg-content m-b--l p-h">
	<div class="c-breadcrumb c-text-block--xl p-t--l">

		<!-- Microformat based on https://css-tricks.com/markup-for-breadcrumbs/ -->
		<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__inner-wrap">
      <a itemprop="url" href="/" rel="home">
				<span itemprop="title">
					Início
				</span>
			</a>

			{#if model.parent_pages}
				{#each model.parent_pages as { p_slug, p_title }, i}
					<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
					<span class="c-breadcrumb__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
						<a itemprop="url" href={ p_slug }>
							<span itemprop="title">
								{ p_title }
							</span>
						</a>
					</span>
				{/each}
			{/if}

			<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
			<span itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__item u-color-secondary">
				<span itemprop="title">
					Sobre a Escola
				</span>
			</span>
		</div>

	</div>
	<div class="c-text-block--xxl">
		<div class="o-ibgrid o-ibgrid--middle o-ibgrid--gutter o-ibgrid--inward o-ibgrid--center o-ibgrid--nowrap">
			<!-- <?php if ($logo): ?> -->
				<div class="o-ibgrid__item u-mxw-1of3">
					<a class="m-center p p-tablet--l no-p-l u-center u-inline-block no-underline u-mxw-logo-pic" href="/" title="Home" rel="home">
						<img class="c-header__bg-img" src="/theme/chouette.svg" alt="Chouette Institut de Français - Cursos de Francês" />
					</a>
				</div>
			<!-- <?php endif; ?> -->
			<!-- <?php if ($title): ?> -->
				<div class="o-ibgrid__item u-mxw-2of3">
					<!-- <?php print render($title_prefix); ?> -->
					<h1 class="c-title p-percent-v">
						<!-- <?php print $title; ?> -->
						{ model.page_title }
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

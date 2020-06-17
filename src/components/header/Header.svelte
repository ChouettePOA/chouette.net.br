<script>
	// import { getContext } from 'svelte';
	import { route } from '../../stores/route.js';
	import MenuMain from '../nav/MenuMain.svelte';

	export let model;
	// const route = getContext('route');

	// const routing_trail = page_routing_trails[model.active_slug];
	// const menu_lv1 = $page_routing_trails[routing_trail.menu_lv1].children;
	// const menu_lv1 = [];
	// const test = page_routing_trails[routing_trail.menu_lv1];

	const slug = $route.slug;
	const menu_lv1 = 'menu_lv1' in $route.trails[slug] ? $route.trails[slug].menu_lv1 : [];

</script>

<div class="c-menu-main p">
	<div class="c-text-block--xl">
		<MenuMain />
	</div>
</div>

<!-- <pre>Header.svelte : route = {JSON.stringify($route, null, 2)}</pre>
<pre>Header.svelte : model = {JSON.stringify(model, null, 2)}</pre> -->
<pre>Header.svelte : menu_lv1 = {JSON.stringify(menu_lv1, null, 2)}</pre>
<!-- <pre>Header.svelte : slug = {JSON.stringify(slug, null, 2)}</pre> -->
<!-- <pre>Header.svelte : $route.trails = {JSON.stringify($route.trails, null, 2)}</pre> -->
<pre>Header.svelte : $route.trails[slug] = {JSON.stringify($route.trails[slug], null, 2)}</pre>
<!-- <pre>{JSON.stringify(routing_trail)}</pre> -->
<!-- <pre>{JSON.stringify(routing_trail.active_lv0)}</pre> -->
<!-- <pre>{JSON.stringify(routing_trail.menu_lv1)}</pre> -->
<!-- <pre>{JSON.stringify(page_routing_trails['sobre-a-escola'])}</pre> -->

<header class="bg-content m-b--l p-h">
	<div class="c-breadcrumb c-text-block--xl p-t--l">

		<!-- Microformat based on https://css-tricks.com/markup-for-breadcrumbs/ -->
		<!-- TODO nest parent levels -->
		<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__inner-wrap">
      <a itemprop="url" href="/" rel="home">
				<span itemprop="title">
					Início
				</span>
			</a>

			<!-- TODO [wip] fetch from active_lv* keys in menu_trails -->
			<!-- {#if model.parent_pages}
				{#each model.parent_pages as slug}
					<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
					<span class="c-breadcrumb__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
						<a itemprop="url" href={ slug }>
							<span itemprop="title">
								<!-- { menu_trails[slug].title } --
								{ slug }
							</span>
						</a>
					</span>
				{/each}
			{/if} -->

			<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
			<span itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__item u-color-secondary">
				<span itemprop="title">
					{ model.title }
				</span>
			</span>
		</div>

	</div>
	<div class="c-text-block--xxl">

		<div class="o-ibgrid o-ibgrid--middle o-ibgrid--gutter o-ibgrid--inward o-ibgrid--center o-ibgrid--nowrap">
			<div class="o-ibgrid__item u-mxw-1of3">
				<a class="m-center p p-tablet--l no-p-l u-center u-inline-block no-underline u-mxw-logo-pic" href="/" title="Home" rel="home">
					<img class="c-header__bg-img" src="/theme/chouette.svg" alt="Chouette Institut de Français - Cursos de Francês" />
				</a>
			</div>
			<div class="o-ibgrid__item u-mxw-2of3">
				<h1 class="c-title p-percent-v">
					{ model.title }
				</h1>
			</div>
		</div>

		<!-- TODO handle active trail (child pages must show subnav) -->
		<!-- {#if menu_lv1}
			<div class="u-center u-bottom">
				<div class="u-inline-block">
					<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom">
						{#each menu_lv1 as { slug, title }, i}
							<div class="o-tgrid__item">
								<a href="/{ slug }" class="c-subnav-link">{ title }</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if} -->

	</div>
</header>

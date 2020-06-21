<script>
	import MenuMain from '../nav/MenuMain.svelte';
	import { nav_menu_get_items, nav_breadcrumb_get_items } from '../nav/nav.js';
	import { route } from '../../stores/route.js';

	export let model;
	// export let route;

	// let menu_main_items = nav_menu_get_items($route, 0);
	let menu_main_items = [];
	let menu_subnav_items = [];
	let breadcrumb_items = [];
	const unsubscribe = route.subscribe(value => {
		menu_main_items = nav_menu_get_items(value, 0);
		menu_subnav_items = nav_menu_get_items(value, 1);
		breadcrumb_items = nav_breadcrumb_get_items(value, model);
	});
</script>

<div class="c-menu-main p">
	<div class="c-text-block--xl">
		<MenuMain bind:items={menu_main_items} />
	</div>
</div>

<!-- DEBUG -->
<!-- <pre>Header.svelte : breadcrumb_items = {JSON.stringify(breadcrumb_items, null, 2)}</pre> -->
<!-- <pre>Header.svelte : menu_subnav_items = {JSON.stringify(menu_subnav_items, null, 2)}</pre> -->
<!-- <pre>Header.svelte : model = {JSON.stringify(model, null, 2)}</pre> -->
<!-- <pre>Header.svelte : route = {JSON.stringify(route, null, 2)}</pre> -->
<!-- <pre>Header.svelte : menu_lv1 = {JSON.stringify(menu_lv1, null, 2)}</pre> -->
<!-- <pre>Header.svelte : slug = {JSON.stringify(slug, null, 2)}</pre> -->
<!-- <pre>Header.svelte : $route.trails = {JSON.stringify($route.trails, null, 2)}</pre> -->
<!-- <pre>Header.svelte : $route.trails[slug] = {JSON.stringify($route.trails[slug], null, 2)}</pre> -->
<!-- <pre>Header.svelte : menu_main_items = {JSON.stringify(menu_main_items, null, 2)}</pre> -->

<header class="bg-content m-b--l p-h">
	<div class="c-breadcrumb c-text-block--xl p-t--l">

		<!-- Microformat based on https://css-tricks.com/markup-for-breadcrumbs/ -->
		<!-- TODO nest parent levels -->
		<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__inner-wrap">
			{#if breadcrumb_items.length}
				{#each breadcrumb_items as { path, title }, i}
					{#if i > 0}
						<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
					{/if}
					<span class="c-breadcrumb__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
						<a itemprop="url" href="/{ path }" rel=prefetch>
							<span itemprop="title">
								{ title }
							</span>
						</a>
					</span>
				{/each}
			{/if}
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

		{#if menu_subnav_items.length}
			<div class="u-center u-bottom">
				<div class="u-inline-block">
					<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom">
						{#each menu_subnav_items as { path, title, is_active }, i}
							<div class="o-tgrid__item">
								<a href="/{ path }" class="c-subnav-link{ is_active ? ' active' : '' }" rel=prefetch>{ title }</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

	</div>
</header>

<script>
	import { menu_main } from '../../stores/menu_main.js';
	import { route } from '../../stores/route.js';

	const current_route_slug = $route.slug;
	const active_lv0 = current_route_slug in $route.trails && 'active_lv0' in $route.trails[current_route_slug] ?
		$route.trails[current_route_slug].active_lv0 :
		current_route_slug;

	export let items = $menu_main[$route.lang];
</script>

<!-- DEBUG -->
<!-- <pre>MenuMain.svelte : current_route_slug = {current_route_slug}</pre> -->
<!-- <pre>MenuMain.svelte : active_lv0 = {JSON.stringify(active_lv0, null, 2)}</pre> -->
<!-- <pre>MenuMain.svelte : $route.trails[current_route_slug] = {JSON.stringify($route.trails[current_route_slug], null, 2)}</pre> -->

<nav class="c-header__menu o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet u-fontB">
	{#each items as { title, slug }, i}
		<div class="o-grid__item c-menu-main__item{ active_lv0 === slug ? ' is-active' : '' }">
			{#if active_lv0 === slug}
				<span class="c-menu-main__deco">
					<img class="c-menu-main__deco-img" src="/theme/wing.svg" alt="" role="presentation" />
				</span>
			{/if}
			<a rel=prefetch aria-current={ active_lv0 === slug ? "page" : undefined } href="/{ slug }" class="c-menu-main__link u-uppercase">
				{ title }
			</a>
		</div>
	{/each}
</nav>

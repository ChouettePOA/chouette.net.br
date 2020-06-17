<script>
	import { getContext } from 'svelte';
	import { menu_main } from '../../stores/menu_main.js';

	const route = getContext('route');
	const active_trail = route.slug in route.trails ? route.trails[route.slug] : {};

	export let items = $menu_main[route.lang];
</script>

<!-- DEBUG -->
<pre>route.trails = {JSON.stringify(route.trails)}</pre>
<pre>route.slug = {JSON.stringify(route.slug)}</pre>
<pre>active_trail = {JSON.stringify(active_trail)}</pre>

<nav class="c-header__menu o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet u-fontB">
	{#each items as { title, slug }, i}
		<div class="o-grid__item c-menu-main__item{ route.slug === slug ? ' is-active' : '' }">
			<!-- TODO handle active trail (parent page must stay active) -->
			{#if route.slug === slug}
				<span class="c-menu-main__deco">
					<img class="c-menu-main__deco-img" src="/theme/wing.svg" alt="" role="presentation" />
				</span>
			{/if}
			<a rel=prefetch aria-current={ route.slug === slug ? "page" : undefined } href="/{ slug }" class="c-menu-main__link u-uppercase">
				{ title }
			</a>
		</div>
	{/each}
</nav>

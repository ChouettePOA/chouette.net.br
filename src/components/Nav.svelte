<script>
	import { menu_main } from '../stores/menu_main.js';

	export let model;
	export let items = $menu_main[model.lang];
</script>

<nav class="c-header__menu o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet u-fontB">
	{#each items as { title, slug }, i}
		<div class="o-grid__item c-menu-main__item{ model.active_slug === slug ? ' is-active' : '' }">
			<!-- TODO handle active trail (parent page must stay active) -->
			{#if model.active_slug === slug}
				<span class="c-menu-main__deco">
					<img class="c-menu-main__deco-img" src="/theme/wing.svg" alt="" role="presentation" />
				</span>
			{/if}
			<a rel=prefetch aria-current={ model.active_slug === slug ? "page" : undefined } href="/{ slug }" class="c-menu-main__link u-uppercase">
				{ title }
			</a>
		</div>
	{/each}
</nav>

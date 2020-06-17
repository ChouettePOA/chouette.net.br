<script>
	export let items = [];
</script>

<!-- DEBUG -->
<!-- <pre>MenuMain.svelte : items = {JSON.stringify(items, null, 2)}</pre> -->

<nav class="c-header__menu o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet u-fontB">
	{#each items as { title, path, is_active }, i}
		<div class="o-grid__item c-menu-main__item{ is_active ? ' is-active' : '' }">
			{#if is_active}
				<span class="c-menu-main__deco">
					<img class="c-menu-main__deco-img" src="/theme/wing.svg" alt="" role="presentation" />
				</span>
			{/if}
			<a rel=prefetch aria-current={ is_active ? "page" : undefined } href="/{ path }" class="c-menu-main__link u-uppercase">
				{ title }
			</a>
		</div>
	{/each}
</nav>

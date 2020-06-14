<script>
	export let model;
	export let slug = model ? model.slug : '';
</script>

<nav class="o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet c-header__menu u-fontB">
	<div class="first collapsed o-grid__item c-menu-main__item">
		<a rel=prefetch aria-current='{slug === "sobre-a-escola" ? "page" : undefined}' href="/sobre-a-escola" class="c-menu-main__link u-uppercase">Sobre</a>
	</div>
	<div class="leaf o-grid__item c-menu-main__item">
		<a rel=prefetch aria-current='{slug === "horarios" ? "page" : undefined}' href="/horarios" class="c-menu-main__link u-uppercase">Horários</a>
	</div>
	<div class="leaf o-grid__item c-menu-main__item">
		<a rel=prefetch aria-current='{slug === "valores-2020" ? "page" : undefined}' href="/valores-2020" class="c-menu-main__link u-uppercase">Preços</a>
	</div>
	<div class="leaf o-grid__item c-menu-main__item">
		<a rel=prefetch aria-current='{slug === "blog" ? "page" : undefined}' href="/blog" class="c-menu-main__link u-uppercase">Blog</a>
	</div>
	<div class="last leaf o-grid__item c-menu-main__item">
		<a rel=prefetch aria-current='{slug === "aulas-online" ? "page" : undefined}' href="/aulas-online" class="c-menu-main__link u-uppercase">Aulas online</a>
	</div>
</nav>

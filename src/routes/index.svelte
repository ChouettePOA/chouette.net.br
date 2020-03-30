<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Chouette - Institut de Français</title>
</svelte:head>

<div class="u-bg-white">
	<div class="c-header c-header--home u-relative">
		<div class="c-header__inner-wrap">

			<picture class="c-header__bg">
				<source type="image/svg+xml" srcset="/img/wing.svg">
				<img class="c-header__bg-img" src="/img/wing.png" alt="" role="presentation">
			</picture>

			<header>
				<div class="c-header__nav p--s">
					<nav class="o-grid o-grid--wrap-until-tablet o-grid--center o-grid--middle o-grid--vgutter-s-until-tablet c-header__menu u-fontB">
						<div class="first collapsed o-grid__item c-menu-main__item">
							<a href="/sobre-a-escola" class="c-menu-main__link u-uppercase">Sobre</a>
						</div>
						<div class="leaf o-grid__item c-menu-main__item">
							<a href="/horarios" class="c-menu-main__link u-uppercase">Horários</a>
						</div>
						<div class="leaf o-grid__item c-menu-main__item">
							<a href="/valores-2020" class="c-menu-main__link u-uppercase">Preços</a>
						</div>
						<div class="leaf o-grid__item c-menu-main__item">
							<a href="/blog" class="c-menu-main__link u-uppercase">Blog</a>
						</div>
						<div class="last leaf o-grid__item c-menu-main__item">
							<a href="/sua-chouette-o-seu-espaco-personalizado" class="c-menu-main__link u-uppercase">Sua chouette</a>
						</div>
					</nav>
				</div>
				<h1 class="c-header__logo bg-content u-center">
					<picture class="c-header__logo-img">
						<source type="image/svg+xml" srcset="/img/chouette-logo.svg">
						<img src="/img/chouette-logo.png" alt="Chouette Institut de Français - Cursos de Francês">
					</picture>
				</h1>
			</header>

			<section class="p-percent">
				<h2 class="c-header__title u-fontB">
					<span class="c-header__title-p1 u-block">Escola de francês</span>
					<span class="c-header__title-p2 u-block">em Porto Alegre, RS</span>
				</h2>
				<div class="c-header__intro c-text-block u-fs-m">
					<p><span class="u-dropcap">N</span>a Chouette você aprende francês com um método exclusivo e atual, concebido pelos próprios professores que possuem uma grande vivência na França e experiência no ensino do idioma no Brasil.</p>
					<p class="m-t">Venha conhecer nosso espaço no Bom Fim !</p>
				</div>
			</section>

			<section class="c-header__part2">
				<h2 class="c-header__courses-title p-mobile-percent u-fontB">
					<span class="c-header__courses-title-p1 u-block u-light">Cursos</span>
					<span class="c-header__courses-title-p2 u-block u-light">de francês</span>
				</h2>
				<div class="c-header__courses-list c-text-block">
					<ul class="list-disc p-mobile-percent">
						<li>Aulas em grupo de até 6 pessoas</li>
						<li>Aulas particulares</li>
						<li>Turmas especiais com ritmo e metodologia adaptados para todas as idades</li>
						<li>Conversação para níveis avançado e intermediário</li>
						<li>Aulas de improvisação teatral, estudo de textos literários e culinária em francês</li>
						<li>Material didático próprio e exclusivo</li>
					</ul>
				</div>
			</section>

		</div>
	</div>
</div>

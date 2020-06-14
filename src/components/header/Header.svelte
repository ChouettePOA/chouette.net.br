<script>
	import Nav from '../../components/Nav.svelte';

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
		<!-- TODO nest parent levels -->
		<div itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="c-breadcrumb__inner-wrap">
      <a itemprop="url" href="/" rel="home">
				<span itemprop="title">
					Início
				</span>
			</a>

			{#if model.parent_pages}
				{#each model.parent_pages as { slug, title }, i}
					<span class="icon-chevron-right p-h--s c-breadcrumb__sep" aria-hidden="true"></span>
					<span class="c-breadcrumb__item" itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
						<a itemprop="url" href={ slug }>
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

		<!-- TODO handle active trail (child pages must show subnav) -->
		{#if model.child_pages}
			<div class="u-center u-bottom">
				<div class="u-inline-block">
					<div class="o-tgrid o-tgrid--gutter o-tgrid--bottom">
						{#each model.child_pages as { slug, title }, i}
							<div class="o-tgrid__item">
								<a href="/{ slug }" class="c-subnav-link">{ title }</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

	</div>
</header>

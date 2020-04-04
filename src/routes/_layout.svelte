<script>
	// TODO [evol] deprecate FontFaceObserver ?
	// @see src/template.html (classes on <body>)
	// import FontFaceObserver from 'fontfaceobserver';

	import Header from '../components/header/Header.svelte';
	import HeaderHome from '../components/header/HeaderHome.svelte';

	export let segment;
</script>

<!-- Homepage -->
{#if segment === undefined}
	<HeaderHome {segment}/>
<!-- Normal pages -->
{:else}
	<Header {segment}/>
{/if}

<main id="main-content">
	<slot></slot>
</main>

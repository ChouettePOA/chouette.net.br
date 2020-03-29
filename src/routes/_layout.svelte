<script>
	import Nav from '../components/Nav.svelte';
  import { onMount } from 'svelte'

	export let segment;

  onMount(async () => {
    const base = [...document.head.children].find(x => x.nodeName === 'BASE')
    if (base) base.remove()
  })
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

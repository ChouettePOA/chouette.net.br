<script context="module">
	import * as global_data from '../entities/global_data.json';
</script>

<script>
	import { setContext } from 'svelte';
	import Meta from '../components/Meta.svelte';
	import Footer from '../components/Footer.svelte';

	setContext('global_data', global_data);
</script>

<Meta />

<!-- @see src/template.html -->
<slot></slot>

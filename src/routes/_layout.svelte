<script context="module">
	import * as global_data from '../entities/config/global.json';
	import * as translation_data from '../entities/config/translation.json';
	import * as menu_main from '../entities/menu/main.json'
</script>

<script>
	import { setContext } from 'svelte';
	import Meta from '../components/Meta.svelte';
	import Footer from '../components/Footer.svelte';

	const globals = global_data.default;
	globals.translations = translation_data.default;
	globals.menu_main = menu_main.default;

	setContext('global_data', globals);
</script>

<Meta />

<!-- @see src/template.html -->
<slot></slot>

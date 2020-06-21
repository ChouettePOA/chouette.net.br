<script context="module">
import * as global_data from '../content/global_data.json';
</script>

<script>
	import { setContext } from 'svelte';
	setContext('global_data', global_data);
</script>

<!-- @see src/template.html -->
<slot></slot>

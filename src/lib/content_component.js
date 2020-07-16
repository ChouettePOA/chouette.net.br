/**
 * @file
 * Updates the Content component.
 *
 * This component allows to dynamically render any combination of other
 * components based on JSON data.
 *
 * Svelte requires client-side rendering for its dynamic component instanciation
 * syntax, or using onMount() callback - either way, server-side rendering
 * cannot produce the output we need.
 *
 * So, we rewrite dynamically the Content.svelte component whenever necessary.
 * This script scans the src/components folder and looks for Svelte components,
 * then basically imports all components found and writes the switch / case
 * logic.
 */

const fs = require('fs');
const path = require('path');
const { walk } = require('./fs');

/**
 * Writes the 'Content.svelte' component contents.
 */
const content_component_update = () => {
	let n = 0;
	let component = '';
	let generated_op = '';
	let generated_imports = '';
	let generated_contents = '';

	walk('src/components/content', '.svelte').map((file_path) => {
		component = path.parse(file_path).name;
		file_path = file_path.replace('src/components/', './');

		// Some exclusions - i.e. Content component itself, main menu, etc.
		// Update : we now only look for "rich content" components inside the
		// 'content' subfolder. No more exclusions.
		// switch (component) {
		// 	case 'Content':
		// 	case 'MenuMain':
		// 	case 'Header':
		// 	case 'DropCap':
		// 		return;
		// }

		if (n === 0) {
			generated_op = '#if';
		}
		else {
			generated_imports += "\n";
			// generated_contents += "\n";
			generated_op = ':else if';
		}
		n++;

		generated_imports += `	import ${component} from '${file_path}';`;
		generated_contents += `{${generated_op} c === '${component}'}
		<${component} {...props} />
	`;
	});

	const file_contents = `<script>
${generated_imports}
	export let content = [];
</script>

{#each content as { c, props }}
	${generated_contents}{/if}
{/each}
`

	fs.writeFileSync('src/components/Content.svelte', file_contents);

	// TODO workaround circular dependency error... Deal breaker ?
	// fs.writeFileSync('src/components/ContentInner.svelte', file_contents);
}

module.exports = {
	"content_component_update": content_component_update
};

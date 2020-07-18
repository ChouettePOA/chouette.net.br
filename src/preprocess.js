/**
 * @file
 * Implements a custom Svelte compiler preprocessor.
 *
 * Attempt to workaround Svelte inability to do dynamic SSR components.
 */

import * as path from 'path';
import * as fs from 'fs';

const imports_placeholder = '// placeholder://src/preprocess.js';
const content_placeholder = '<!-- placeholder://src/preprocess.js -->';

/**
 * Recursively gets file paths from given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of file paths sorted by name.
 */
const walk = (dir, extension) => {
	let files = [];
	fs.readdirSync(dir).map(file => {
		if (fs.statSync(path.join(dir, file)).isFile()) {
			if (extension === undefined || path.extname(file) === extension) {
				files.push(path.join(dir, file));
			}
		}
		else {
			files = files.concat(walk(path.join(dir, file), extension))
		}
	});
	return files.sort();
}

/**
 * Transforms components source code at compile time.
 *
 * Caveat : no variables or props are assigned any value. It's just processing
 * the file contents.
 *
 * See https://svelte.dev/docs#svelte_preprocess
 */
const markup_alter = (content, filename) => {
	if (!content.includes(imports_placeholder) || !content.includes(content_placeholder)) {
		return content;
	}

	const preprocessed_component = path.parse(filename).name;

	let n = 0;
	let component = '';
	let generated_op = '';
	let generated_imports = '';
	let generated_contents = '';
	let relative_path_prefix = '';

	walk('src/components/content', '.svelte').map((file_path) => {
		component = path.parse(file_path).name;

		// Do not include a component inside itself.
		if (preprocessed_component == component) {
			return;
		}

		relative_path_prefix = path.relative(path.dirname(filename), path.dirname(path.resolve(file_path)));
		if (relative_path_prefix === '') {
			relative_path_prefix = '.';
		}
		file_path = file_path.replace('src/components/content/', relative_path_prefix + '/');

		if (n === 0) {
			generated_op = '#if';
		}
		else {
			generated_imports += "\n	";
			generated_op = ':else if';
		}
		n++;

		generated_imports += `import ${component} from '${file_path}';`;
		generated_contents += `{${generated_op} c === '${component}'}\n		<${component} {...props} />\n	`;
	});

	generated_contents += '{/if}';

	content = content.replace(imports_placeholder, generated_imports);
	content = content.replace(content_placeholder, generated_contents);

	return content;
};

export default {
	markup: ({ content, filename }) => {
		return {
			code: markup_alter(content, filename)
		};
	}
};

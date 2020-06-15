/**
 * @file
 * Contains actions to run before building Sapper app.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Gets all files in given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of files sorted by name.
 */
function getFilenames(dir, extension) {
	return fs
		.readdirSync(dir)
		.filter(
			file => fs.statSync(path.join(dir, file)).isFile() &&
				(extension === undefined || path.extname(file) === extension)
		)
		.sort();
}

/**
 * Recursively gets file paths from given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of file paths sorted by name.
 */
function walk(dir, extension) {
	const files = [];
	fs.readdirSync(dir).map(file => {
		if (fs.statSync(path.join(dir, file)).isFile()) {
			if (extension === undefined || path.extname(file) === extension) {
				files.push(path.join(dir, file));
			}
		}
		else {
			files = files.concat(getFilenames(path.join(dir, file), extension))
		}
	});
	return files.sort();
}

/**
 * Builds the "routing trails" cache.
 */
function cache_build_routing_trails() {
	const trails = [];
	walk('src/content/page', '.json').map((file_path) => {
		const data = JSON.parse(fs.readFileSync(file_path).toString());
		// console.log(data);
		if ("parent_pages" in data) {
			const child_slug = path.parse(file_path).name;
			data.parent_pages.map(item => item.slug in trails ?
				trails[item.slug].push(child_slug) : trails[item.slug] = [child_slug]);
		}
		console.log(trails);
	});
}

cache_build_routing_trails();

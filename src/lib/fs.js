/**
 * @file
 * File system related shared utilities.
 */

// import * as fs from 'fs';
// import * as path from 'path';
const fs = require('fs');
const path = require('path');

/**
 * Recursively gets file paths from given dir.
 *
 * @param {String} dir
 * @param {String} extension optional: filter by file extension.
 * @returns {Array} List of file paths sorted by name.
 */
const walk = (dir, extension) => {
	const files = [];
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

module.exports = { "walk": walk };

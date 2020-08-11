/**
 * @file
 * Custom sapper export wrapper script.
 *
 * It seems the crawler is unable to follow links that are rendered to the DOM
 * during the Svelte afterUpdate "hook".
 * @see src/routes/[...slug].svelte
 *
 * This script adds all page paths using the '--entry' arg.
 */

// import * as fs from 'fs';
// import * as path from 'path';
// import { exec } from 'child_process';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const paths = [];
const dir = 'src/entities/content/page';

fs.readdirSync(dir).map(file => {
	if (fs.statSync(path.join(dir, file)).isFile()) {
		paths.push('/' + path.parse(file).name);
	}
});

exec(
	`npx sapper export --legacy --entry '${paths.join(' ')}'`,
	(err, stdout, stderr) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`stdout:\n${stdout}`);
		console.log(`stderr:\n${stderr}`);
	}
);

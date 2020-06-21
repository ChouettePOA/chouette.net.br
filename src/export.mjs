/**
 * @file
 * Custom sapper export wrapper script.
 *
 * It seems the crawler is unable to follow links that are rendered to the DOM
 * during the Svelte afterUpdate "hook".
 * @see src/routes/[slug].svelte
 *
 * This script manually adds the paths that are missed using the '--entry' arg.
 */

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

const paths_arr = [];
const dir = 'src/content/page';

fs.readdirSync(dir).map(file => {
	if (fs.statSync(path.join(dir, file)).isFile()) {
		paths_arr.push('/' + path.parse(file).name);
	}
});

exec(`npx sapper export --legacy --entry '${paths_arr.join(' ')}'`);

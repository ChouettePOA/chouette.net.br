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
// import * as menu_main from './content/menu/main.json'

// List all paths that are not level 0 pages (i.e. the ones in main menu).
// Update : just add them all instead (idempotent).
let manual_entries = '';
const dir = 'src/content/page';
fs.readdirSync(dir).map(file => {
	if (fs.statSync(path.join(dir, file)).isFile()) {
		manual_entries = manual_entries + " --entry '/" + path.parse(file).name + "'";
	}
});

console.log(manual_entries);

exec(`sapper export --legacy ${manual_entries}`);

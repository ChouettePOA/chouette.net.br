/**
 * @file
 * Implements pre-commit git hook.
 *
 * TODO [wip] rebuild page routing trails cache, then stage if changed before
 * committing.
 */

const { exec } = require('child_process');
const { cache_page_routing_trails } = require('../lib/cache');

cache_page_routing_trails();

exec(
	"git diff --name-only --cached",
	(err, stdout, stderr) => {
		if (err) {
			console.log(err);
			return;
		}
		// TODO [wip] look for the cache file. If changed, stage it.
		console.log(stdout);
	}
);

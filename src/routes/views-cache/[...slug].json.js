/**
 * @file
 * Provides views cache objects (pre-compiled results).
 *
 * @see src/lib/views.js
 * @see src/lib/cache.js
 */

const fs = require('fs');

export async function get(req, res, next) {
	const { slug } = req.params;

	const file = slug.join('/') + '.json';
	const content_json = fs.readFileSync(file).toString();

	if (content_json) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(content_json);
	}
	else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

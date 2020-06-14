
const fs = require('fs');

/**
 * @file
 * Maps content data for pages routes.
 *
 * @see src/routes/[slug].svelte
 */
export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;
	const file = 'src/content/page/' + slug + '.json';

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

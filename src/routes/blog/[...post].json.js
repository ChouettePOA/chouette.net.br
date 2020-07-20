/**
 * @file
 * Maps content data for blog post routes.
 *
 * @see src/routes/blog/[...post].svelte
 */

const fs = require('fs');

export async function get(req, res, next) {
	let [year, month, slug] = req.params.post;
	const file = `src/content/blog/${year}/${month}/${slug}.json`;

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

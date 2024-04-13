import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	// "Static" assets (e.g. logo img, favicon, robots.txt, etc).
	eleventyConfig.addPassthroughCopy({ "src/static": '.' });

	return {
		dir: {
			input: "src/routes",
			output: "public",
			includes: "../includes", 	// relative to input directory
			layouts: "../layouts", 		// relative to input directory
			data: "../data" 					// relative to input directory
		}
	};
};

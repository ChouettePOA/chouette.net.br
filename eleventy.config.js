import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";

// import { CleanCSS } from "clean-css";
import pkg from 'clean-css';
const { CleanCSS } = pkg;

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./components/**/*.webc",
			"npm:@11ty/is-land/*.webc",
			"npm:@11ty/eleventy-img/*.webc"
		]
	});

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	// "Static" assets (e.g. logo img, favicon, robots.txt, etc).
	eleventyConfig.addPassthroughCopy({ "src/static": '.' });

	// Minify CSS.
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

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

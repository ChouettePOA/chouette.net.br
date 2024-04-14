import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import bundlerPlugin from "@11ty/eleventy-plugin-bundle";

// // import { CleanCSS } from "clean-css";
// import pkg from 'clean-css';
// const { CleanCSS } = pkg;

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

// const { eleventyImagePlugin } = require("@11ty/eleventy-img");
import { eleventyImagePlugin } from "@11ty/eleventy-img";

const core11tyOptions = {
	dir: {
		input: "src/routes",
		output: "public",
		includes: "../includes", 	// relative to input directory
		layouts: "../layouts", 		// relative to input directory
		data: "../data" 					// relative to input directory
	}
};

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	// Required by pluginWebc.
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// Webc components "autoload" + load "vendor" components.
	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./src/components/**/*.webc",
			"npm:@11ty/is-land/*.webc",
			"npm:@11ty/eleventy-img/*.webc"
		]
	});

	// Assets optimization.
	eleventyConfig.addPlugin(bundlerPlugin, {
		transforms: [
			async function(content) {
				if (this.type === 'css') {
					// Same as Eleventy transforms, this.page is available here.
					const result = await postcss([autoprefixer, cssnano]).process(content, {
						from: this.page.inputPath,
						to: null
					});
					return result.css;
				}
				return content;
			}
		]
	});

	// Responsive images.
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		formats: ["webp", "jpeg"],
		urlPath: "/img/optimized/",
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	// "Static" assets (e.g. logo img, favicon, robots.txt, etc).
	eleventyConfig.addPassthroughCopy({ "src/static": '.' });

	return core11tyOptions;
};

import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import bundlerPlugin from "@11ty/eleventy-plugin-bundle";
import liteYoutube from "eleventy-plugin-lite-youtube";

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import htmlmin from "html-minifier";
import utopia from "postcss-utopia";

const core11tyOptions = {
	dir: {
		input: "src/routes",
		output: "docs",
		includes: "../includes",  // relative to input directory
		layouts: "../layouts",    // relative to input directory
		data: "../data"           // relative to input directory
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

	// Image plugin.
	// @link https://www.11ty.dev/docs/plugins/image/#webc
	// TODO [evol] compare with https://github.com/ascorbic/unpic-img
	eleventyConfig.addPlugin(eleventyImagePlugin, {
		formats: ["webp", "jpeg"],
		widths: [150, 300, 500, 900],
		urlPath: "/img/",
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	// Lite YouTube.
	// @link https://github.com/ulfschneider/eleventy-plugin-lite-youtube
	eleventyConfig.addPlugin(liteYoutube);

	// HTML minification.
	eleventyConfig.addTransform("htmlmin", function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}
		return content;
	});

	// Transform CSS files in input (src/routes) "as is"
	// (i.e. src/routes/main.css -> /main.css processed by postcss).
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async (content, srcFilePath) => {
			return async () => {
				const result = await postcss([utopia, autoprefixer, cssnano]).process(content, {
					from: srcFilePath,
					to: null
				});
				return result.css;
			};
		},
	});

	// Bundle CSS styles aggregated from components.
	eleventyConfig.addPlugin(bundlerPlugin, {
		transforms: [
			async function(content) {
				if (this.type === 'css') {
					// Same as Eleventy transforms, this.page is available here.
					const result = await postcss([utopia, autoprefixer, cssnano]).process(content, {
						from: this.page.inputPath,
						to: null
					});
					return result.css;
				}
				return content;
			}
		]
	});

	// Images optimization.
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

	// Update 2025/03/20 : lite-yt-embed.js is injected by Consent.
	// @see src/components/tracking-consent.webc
	// Also, don't copy the SVG lib we don't currently use.
	// @see src/components/deco-vine.webc
	// @see src/routes/styleguide.webc
	// Make some Node modules available in components.
	// eleventyConfig.addPassthroughCopy({
	// 	"node_modules/@svgdotjs/svg.js/dist/svg.min.js": "js/svg.min.js",
	// 	"node_modules/lite-youtube-embed/src/lite-yt-embed.js": "js/lite-yt-embed.js"
	// });

	return core11tyOptions;
};

import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

import getPreprocessor from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

const svelteExtractor = ( content ) => {
	return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
}

const postcssPlugins = (purgecss = false) => {
	return [
		require('postcss-import-ext-glob')(),
		require('postcss-import')(),
		require('postcss-url')(),
		require('postcss-extend-rule')(),
		require('postcss-advanced-variables')(),
		// require('rfs')(),
		require('postcss-responsive-type')(),
		require('postcss-nested')(),
		require('postcss-custom-media')(),
		require('autoprefixer')(),
		// Do not purge the CSS in dev mode to be able to play with classes in the
		// browser dev-tools.
		purgecss &&
			require('@fullhuman/postcss-purgecss')({
				content: ['./**/*.svelte', './**/*.html'],
				extractors: [
					{
						extractor: svelteExtractor,
						// Specify the file extensions to include when scanning for class
						// names.
						extensions: ['svelte']
					}
				],
				// Whitelist selectors to stop Purgecss from removing them from your CSS.
				whitelist: ['html', 'body']
			})
	].filter(Boolean);
};

const preprocess = getPreprocessor({
	transformers: {
		postcss: {
			plugins: postcssPlugins()
		}
	}
});

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess,
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess,
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			postcss({
				plugins: postcssPlugins(!dev),
				extract: path.resolve(__dirname, './static/global.css'),
				minimize: true,
				sourceMap: true
			})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};

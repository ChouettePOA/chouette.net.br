import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require("../../package.json");

export default {
	title: "Eleventy Base WebC" || pkg.name,
	description: "" || pkg.description,
	language: "en",
};

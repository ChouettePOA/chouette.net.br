
/**
 * @file
 * Maps metadata for pages routes.
 *
 * Doc : https://sapper.svelte.dev/docs#Pages
 *
 * @see src/routes/[slug].svelte
 */

import { readable } from "svelte/store";

// TODO [wip] i10n / manage path conversion depending on active language.
// For now: use ISO country suffix in keys (no key = language neutral).
export const routing = readable({
	"slug": [
		{
			"key": "page.about",
			"value.pt": "sobre-a-escola"
		},
		{
			"key": "page.method",
			"value.pt": "um-metodo-atual"
		},
		{
			"key": "page.teachers",
			"value.pt": "professores"
		}
	],
	"data": [
		{
			"key": "page.about",
			"subnav.pt": ["um-metodo-atual", "professores"],
			"nav_title.pt": "Sobre",
			"page_title.pt": "Sobre a escola",
			"weight": 1
		},
		{
			"slug.pt": "um-metodo-atual",
			"nav_title.pt": "Método",
			"page_title.pt": "Um método atual",
			"weight": 1
		}
	]
});

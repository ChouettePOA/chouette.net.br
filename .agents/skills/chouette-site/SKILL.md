---
name: chouette-site
description: >-
  Apply when editing this Eleventy site's CSS, layouts, product pages, images,
  or eleventy.config.js. Covers the main.css layout opt-out, a Node 26 rebuild
  plus browser checks, staying on Eleventy 3, and spacing work that must not
  absorb deferred config cleanup.
---

# Chouette site

Dev URL: `http://chouette.localhost:8080/`. Node version is `.nvmrc` (26). Run `nvm use` before `npm run build` or `npm run dev`.

The spacing contract and the 2026-10-08 measurements are in `changelog/2026/10/08-100-desafios-atividades.md`. Read that file before changing product-page spacing. Use its revalidated section. Observations from before `/main.css` was a real stylesheet are comparison only.

## Stylesheet delivery

`src/routes/routes.11tydata.js` sets `layout: "page.webc"` for every template under `src/routes`, including `main.css`.

The CSS extension in `eleventy.config.js` must keep `useLayouts: false`. Eleventy 3 defaults that option to `true`. Without the flag, the compiled CSS is wrapped in the page layout and `docs/main.css` is an HTML document. The layout still links `/main.css`. Browsers discard the response. `--size-*`, `--space-*`, or `.stack` text inside that file does not mean the rules apply.

Do not paper over a missing stylesheet with component margins, copied tokens, or new pixel values.

After a change to `eleventy.config.js` or `src/routes/main.css`:

1. Rebuild with Node 26. `npm run build` deletes `docs/` first.
2. Restart `npm run dev`. An already-running `--incremental` process is not evidence. Config changes are not picked up by a live incremental server.
3. `docs/main.css` and the dev response for `/main.css` are CSS (`Content-Type: text/css`), the same bytes, with no doctype or script. Utopia directives are expanded.
4. In the browser, confirm `/main.css` is an applied stylesheet and that `box-sizing: border-box` and the root `--space-s` / `--space-m` values resolve. Check `/100-desafios/`, `/grammaire-chouette-a1/`, `/`, and `/sobre-a-escola/`.

## Eleventy 3

Stay on the installed Eleventy 3.1 line, WebC 0.11, and Image 7. Visual work does not require the Eleventy v4 / Build Awesome alpha.

Image 7 requires Node 22 or newer. `.nvmrc` is 26. `package.json` still carries the upstream starter name and `engines.node` of `>=18`. The README still mentions an Eleventy canary, Node 24, and the removed `webc:is="eleventy-image"` component. Trust `eleventy.config.js`, `.nvmrc`, and the installed package versions.

`changelog/2026/10/08-100-desafios-atividades.md` lists config maintenance that stays in its own changes: `addBundle` instead of the direct bundle-plugin import, Image option names (`eleventyImageTransformPlugin`, `htmlOptions.imgAttributes`), the `transformOnRequest: false` comment, the README, package identity and engines, and the idle input-path plugin. Build and check the browser after each area. Do not fold that list into a spacing or stylesheet fix.

Landing images with `eleventy:ignore` are already-sized files under `src/static/img/landing/`. Leave them ignored unless the task is image delivery. The cold-load budget is 300 kB.

## Spacing

Global type and space tokens, `.stack`, `.with-sidebar`, and the utilities live in `src/routes/main.css`. Product band spacing lives in `src/components/product-landing.webc` or on the instance that needs it. Do not change global `h2` or `p` rules to serve one band.

Known separate follow-up: with the root font at 200% on a 320px window, `/100-desafios/` has `scrollWidth` 490 because the hero text overflows. Migrated product bands stay inside the viewport. Record that overflow. Do not clip the page to hide it.

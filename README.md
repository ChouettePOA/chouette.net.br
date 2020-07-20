# Chouette static site conversion

This repository contains an investigation of a partial [Drupal](https://stackoverflow.blog/2020/06/23/is-it-time-to-give-drupal-another-look) site conversion into a simpler static site, while maintaining opportunities for adaptability. The current take at this is made using [Sapper / Svelte](https://sapper.svelte.dev/) : see the demo at [infallible-dubinsky-bfb500.netlify.app](https://infallible-dubinsky-bfb500.netlify.app/).

## Purpose

- Aim for [low-tech](https://solar.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html) / [eco-conception](https://collectif.greenit.fr/ecoconception-web/)
- Implement simplified / minimal parts of Drupal APIs (entities, menus, and perhaps fields)
- Evaluate decentralized approaches to content editing
- Evaluate potential for reuse in other projects

## Requirements

- Lightweight
- Minimize network requests
- Editors must be able to CRUD most routes, entities, and menus

## Initial considerations

### Static site generator / Front-end

- [WebReflection libs](https://gist.github.com/WebReflection/761052d6dae7c8207d2fcba7cdede295) - i.e. [hacker news example](https://github.com/WebReflection/hn)
- [Eleventy](https://www.11ty.dev/)
- [Workbox](https://developers.google.com/web/tools/workbox/)

### Content editing (planned)

See how the content editing / hosting part was approached in these projects (if there is potential for reuse) :

- [Mavo](https://mavo.io/)
- [NetlifyCMS](https://github.com/netlify/netlify-cms)

## Features

This section presents how basic, common needs were implemented on top of the chosen foundation - here : Sapper / Svelte.

### Content data model

Each JSON file stored in folder `./src/content` corresponds to an entity. They represent a data format that could be provided by other means such as REST APIs. Subfolders represent entity types.

### Routing, page hierarchy, navigation state, active menu trail, breadcrumb

The *page* entities file names define URLs (or *slugs*) which are handled by `./src/routes/[slug].svelte` (unless overridden using the Sapper routing conventions). Page may define a parent page and optionally a weight that will order their position in menus.

The main menu is its own entity, and navigation items like sub-nav menus and breadcrumbs are implemented in `./src/components/nav/nav.js`.

The `./src/cache/page_routing_trails.json` cache file must be generated every time a modification impacts the navigation tree. It is currently implemented as a "standalone" Node script `./src/cache_rebuild.js` which is called in `./src/git_hooks/pre_commit.js` and `./package.json` NPM run scripts.

### Rich content editing

In Drupal, editors may combine (and nest) a variety of components to build their page contents. This is provided by modules like [bricks](https://www.drupal.org/project/bricks) or [paragraphs](https://www.drupal.org/project/paragraphs).

The equivalent in Svelte / Sapper would be some way to implement "dynamic" components (autoload), but AFAIK it can't be done in a way compatible with SSR. In the React ecosystem, [it seems Gatsby folks are working on something close enough](https://github.com/gatsbyjs/gatsby/pull/24903).

A suboptimal workaround is currently implemented by hooking into the Svelte compiler to "inject" dynamically generated code using placeholders. Here's the code generator : `./src/preprocess.js` and a usage example : `./src/components/content/InlineBlockGrid.svelte` (cf. `./rollup.config.js` to see how it's plugged into the compiler).

Another minor issue is the inability to imbricate components in a way that would create circular dependencies, which could be desirable in some cases.

### [Responsive components](https://philipwalton.github.io/responsive-components/) / element queries

This is more of a design goal to improve developer experience with minimal performance impact thanks to the ResizeObserver API. The current implementation for Sapper / Svelte - cf. `./src/components/Responsive.svelte` - takes [@Heydon's approach](https://github.com/Heydon/watched-box).

## License

Source code is licensed [MIT](LICENSE). The logo, trademark, textual content are protected under the brazilian Law on Copyright and Neighboring Rights No. 9.610 of February 19, 1998 (unless otherwise stated).

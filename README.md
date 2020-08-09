# Chouette static site conversion

This repository contains an investigation of a partial [Drupal](https://stackoverflow.blog/2020/06/23/is-it-time-to-give-drupal-another-look) site conversion into a simpler static site. The current take at this is made using [Sapper / Svelte](https://sapper.svelte.dev/) : see the demo at [infallible-dubinsky-bfb500.netlify.app](https://infallible-dubinsky-bfb500.netlify.app/).

The plan is to make another iteration of this project without Sapper / Svelte using the implemntations provided here as an explicit baseline reference.

## Purpose

- Aim for [low-tech](https://solar.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html) / [eco-conception](https://collectif.greenit.fr/ecoconception-web/)
- Implement simplified, minimal parts of Drupal APIs (entities, menus, blocks, views)
- Evaluate decentralized approaches to content editing
- Evaluate potential for reuse in other projects
- Support internationalization (localization and translation)

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

Each JSON file stored in folder `src/entities` corresponds to an entity. They represent a data format that could be provided by other means such as REST APIs. Subfolders represent *entity* types.

Any entity that needs its own dedicated URL must be stored inside `src/entities/content`, where subfolders represent *content* types (roughly corresponding to Drupal "nodes") - except `src/entities/content/taxonomy` where subfolders represent *vocabularies* (roughly equivalent to groups of tags), e.g. `src/entities/content/taxonomy/tag` for storing the *tag* taxonomy terms.

These content entities share the following object structure :

```txt
{
  "lang": "fr",                             ← ISO 639-1 language code
  "title": "The main page title",           ← Should match page URL (slug)
  "short_title": "Short page title",        ← [optional] used in menus, breadcrumb
  "description": "Teaser text",             ← [optional] Used in <meta> tags (og:description)
  "image": "media/2020/08/visual.jpg",      ← [optional] Used in <meta> tags (og:image)
  "tags": [],                               ← [optional] Taxonomy terms entity references
  "published": "2020-08-25T15:12:36.594Z",  ← [optional] ISO 8601 publication date
  "uuid": "dd2aaa05-7d00-493c-9373-a0f695862850", ← [optional] For easier entity refs
  "content": []                             ← [optional] Main page contents (see Rich content editing)
}
```

Other entities not requiring their own URL do not share a common structure, apart from the ISO 639-1 language code nesting at the "root" of the object - for example as in this extract from `src/entities/menu/main.json` :

```txt
{
  "pt": [
    {
      "title": "Sobre",
      "path": "sobre-a-escola"
    },
    {
      "title": "Horários",
      "path": "horarios"
    }
  ],
  "fr": [
    {
      "title": "À propos",
      "path": "a-propos"
    },
    {
      "title": "Horaires",
      "path": "horaires"
    }
  ]
}
```

### Routing, page hierarchy, navigation state, active menu trail, breadcrumb

The *page* entities file names define URLs (or *slugs*) which are handled by `src/routes/[slug].svelte` (unless overridden using the Sapper routing conventions). Page may define a parent page and optionally a weight that will order their position in menus.

The main menu is its own entity, and navigation items like sub-nav menus and breadcrumbs are implemented in `src/components/nav/nav.js`.

TODO evaluate if we really need to force the use of UUIDs in menus (instead of "hardcoding" title and path) to avoid the need to impact eventual changes in page slugs.

The `src/cache/page_routing_trails.json` cache file must be generated every time a modification impacts the navigation tree. It is currently implemented as a "standalone" Node script `src/cache_rebuild.js` which is called in `src/git_hooks/pre_commit.js` and `./package.json` NPM run scripts.

### Rich content editing

In Drupal, editors may combine (and nest) a variety of components to build their page contents. This is provided by modules like [bricks](https://www.drupal.org/project/bricks) or [paragraphs](https://www.drupal.org/project/paragraphs).

The equivalent in Svelte / Sapper would be some way to implement "dynamic" components (autoload), but AFAIK it can't be done in a way compatible with SSR. In the React ecosystem, [it seems Gatsby folks are working on something close enough](https://github.com/gatsbyjs/gatsby/pull/24903).

A suboptimal workaround is currently implemented by hooking into the Svelte compiler to "inject" dynamically generated code using placeholders. Here's the code generator : `src/preprocess.js` and a usage example : `src/components/content/InlineBlockGrid.svelte` (cf. `./rollup.config.js` to see how it's plugged into the compiler).

Another minor issue is the inability to imbricate components in a way that would create circular dependencies, which could be desirable in some cases.

This is what I've currently settled for. In order to get the equivalent of :

```html
<Lede text="The text to display through the Lede component."/>
```

... the corresponding entity object `content` definition would be :

```
"content": [
  {
    "c": "Lede",
    "props": {
      "text": "The text to display through the Lede component."
    }
  }
]
```

TODO wip evaluate if this is doable :

Nesting example - goal :

```html
<Responsive w="43rem,21rem" attr={{ "class":"c-media-grid bg-content p-v--l" }}>
  <Lede text="The text to display through the Lede component."/>
  <Map/>
</Responsive>
```

... corresponding entity object `content` definition :

```
"content": [
  {
    "c": "Responsive",
    "props": {
      "w": "43rem,21rem",
      "attr": {
        "class": "c-media-grid bg-content p-v--l"
      }
    },
    "content": [
      {
        "c": "Lede",
        "props": {
          "text": "The text to display through the Lede component."
        }
      },
      {
        "c": "Map",
        "props": {}
      }
    ]
  }
]
```

### Views (= collections : pagers, filters, sorts)

TODO currently work in progress.

By default, views list 10 entities per page sorted by publication date in descending order (if available) using the layout `src/components/views_displays/ViewDisplayGrid.svelte` and the entity "view mode" `src/components/entity_view_modes/Card.svelte` for individual results.

There are 2 ways to build lists of entities : either by placing a `<View>` component in an entity `content` definition (see section *Rich content editing*), or using it in route handlers such as `src/routes/tag/[slug].svelte`.

Like for routing (menu trails), the cache rebuild process stores pre-compiled results. Due to Svelte limitations, the initial implementation plan could not be done - it would have ideally been for example :

```txt
<View filters={[
  { "in": "content/blog" },
  { "referencing": "term/tag:" + uuid }
]} />
```

To work around those limitations, instead, this is what I've settled for in this prototype instead. Examples :

In an entity content definition, e.g. `src/entities/content/page/blog.json`, the pre-compiled results are written directly alongside the props **in the same file** (adding the `cache` key as illustrated below) :

```html
"content": [
  {
    "c": "View",
    "props": {
      "filters": [                   ← This comes from content editor.
        {
          "in": "content/blog"
        }
      ],
      "cache": {                     ← This is generated during cache rebuild.
        "settings": {},
        "results": []
      }
    }
  }
]
```

In a route handler, e.g. `src/routes/tag/[slug].svelte`, the use of the `preload()` technique is necessary to fetch a single generated JSON cache file corresponding to the props AND arguments.

It was necessary to find a way to generate all pre-compiled results possible, and the choice is currently to use an URL using parameters written directly in the route handler source code as a placeholder comment then parsed in `src/lib/views.js` :

```html
<!-- placeholder://src/lib/views.js?f[0][referencing]=term/tag:$1&f[0][in]=content/blog -->
<View cache={my_view_cache_data} />
```

### Localization, content translation

[ISO 639-1 Language Codes](https://www.w3schools.com/Tags/ref_language_codes.asp) are used to define entities's language. The default language defined in `src/entities/config/global.json` is used as fallback for cases like main menu not yet translated.

Content entity pages set the general UI language for things like menus and string translations (defined in `src/entities/config/translation.json`). When contents written in another language are displayed - e.g. by views, they will automatically get a corresponding `lang` attribute on their wrapper element.

Path collisions must be handled manually, i.e. the page using the `/blog` URL is defined in `src/entities/content/page/blog.json` and if one or more of its translations used the same title (thus the same slug), we would have to define it using another path - e.g. `src/entities/content/page/blog-fr.json` (= `/blog-fr` URL).

### [Responsive components](https://philipwalton.github.io/responsive-components/) / element queries

This is more of a design goal to improve developer experience with minimal performance impact thanks to the ResizeObserver API. The current implementation for Sapper / Svelte - cf. `src/components/Responsive.svelte` - takes [@Heydon's approach](https://github.com/Heydon/watched-box).

## License

Source code is licensed [MIT](LICENSE). The logo, trademark, textual content are protected under the brazilian Law on Copyright and Neighboring Rights No. 9.610 of February 19, 1998 (unless otherwise stated).

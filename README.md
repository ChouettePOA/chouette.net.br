# www.chouette.net.br

Chouette main web homepage based on [Eleventy-official "webc" starter project](https://github.com/11ty/eleventy-base-webc).

## Reasoning

- Ecoconception is (and arguably: should be) nowadays an essential aspect of the "modern" web. This implies a minimal approach, including for the compilation (or build) process ; notably in terms of dependencies and overall weight.
- Design decisions should follow the same logic.
- But we still need some automation for common "best practices".
- Heavier tools like [Sveltekit](https://kit.svelte.dev) or [Solid start](https://github.com/solidjs/solid-start) were ruled out given that our requirements here are nothing more than publishing a few static web pages on the web.
- [Eleventy (11ty)](https://www.11ty.dev) version 3 (canary) was chosen. [Hugo](https://gohugo.io), [Plenti](https://plenti.co) and [Publii](https://getpublii.com) were tested too, but nobody's perfect 😅

## Goals

1. Aim for no more than 300 kB in total weight sent over the wire for any "cold" page load, only loading what is necessary. This applies to HTML, CSS, JS, and media assets.
1. Compilation should optimize and minify code assets (HTML, CSS, JS).
1. Compilation should optimize media assets like images and prepare them for the minimum browser-based requirements, especially in terms of display resolution (i.e. generate the same image in different resolutions).
1. Future plan : a desktop application UI (e.g. using [Tauri](https://tauri.app/)) where this build tool could be embedded (or maybe just convert to a custom Publii theme, no real plan at this stage).

## Getting started

Requires Node JS installed (currently tested in version 20.11.1, see `.nvmrc`). Git clone the repo then :

```sh
# Install dependencies.
npm i

# Start local dev.
npm run start
```

(I like to use http://www.chouette.localhost:8080/ for loval dev)

or build manually :

```sh
npm run build
```

## File structure

```txt
./chouette.net.br/         ← Project root dir
  ├── node_modules/        ← [git-ignored]
  ├── public/              ← 11ty Output Directory (static site generated files, web server doc root)
  ├── src/
  │   ├── components/
  │   ├── data/            ← 11ty Directory for Global Data Files
  │   │   ├── metadata.js  ← Global <head> data (title, description, language)
  │   │   └── ...
  │   ├── includes/        ← 11ty Directory for Includes
  │   ├── layouts/         ← 11ty Layouts (special templates that can be used to wrap other content)
  │   │   ├── critical.css ← Inline ("critical") CSS injected in <head>
  │   │   ├── html.webc    ← Outermost template (all-encompassing wrap)
  │   │   └── ...
  │   ├── media/           ← Media assets to optimize, see 11ty plugin "image"
  │   ├── routes/                  ← 11ty Input Directory
  │   │   ├── index.webc           ← Homepage contents
  │   │   ├── routes.11tydata.js   ← Overridable default values available in all templates in src/routes
  │   │   └── ...
  │   └── static/          ← "Static" assets (e.g. logo img, favicon, robots.txt, etc).
  ├── .editorconfig
  ├── .gitignore
  ├── .nvmrc
  ├── eleventy.config.js   ← See https://www.11ty.dev/docs/config/
  ├── LICENSE
  ├── package-lock.json    ← [git-ignored]
  ├── package.json
  └── README.md
```

This is configured in `eleventy.config.js` in the project root dir - here's the relevant part :

```js
// (snip)
const core11tyOptions = {
  dir: {
    input: "src/routes",
    output: "public",
    includes: "../includes",  // relative to input directory
    layouts: "../layouts",    // relative to input directory
    data: "../data"           // relative to input directory
  }
};
// (snip)
export default function(eleventyConfig) {
  // (snip)
  return core11tyOptions;
};
```

## Compilation (build) process

Also configured in `eleventy.config.js` - here are the relevant parts :

### Markup (HTML) optimization

```js
import htmlmin from "html-minifier";
// (snip)
export default function(eleventyConfig) {
  // (snip)
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
  // (snip)
};
```

### Styles (CSS) optimization

Also loads the plugin ["PostCSS Utopia"](https://github.com/trys/postcss-utopia).

```js
import bundlerPlugin from "@11ty/eleventy-plugin-bundle";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import utopia from "postcss-utopia";
// (snip)
export default function(eleventyConfig) {
  // (snip)
  eleventyConfig.addPlugin(bundlerPlugin, {
    transforms: [
      async function(content) {
        if (this.type === 'css') {
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
  // (snip)
};
```

### Media (images) optimization

Uses [11ty plugin "image"](https://www.11ty.dev/docs/plugins/image/). The sizes can be set on a per-image basis, e.g. :

```html
<img
  src="src/media/2024/04/test.jpg"
  alt="Mandatory #a11y text."
  webc:is="eleventy-image"
  width="100, 200"
/>
```

The configuration only sets overridable defaults :

```js
import { eleventyImagePlugin } from "@11ty/eleventy-img";
// (snip)
export default function(eleventyConfig) {
  // (snip)
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    formats: ["webp", "jpeg"],
    urlPath: "/img/optimized/",
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });
  // (snip)
};
```

### Scripts

Until now, no scripting was required.

## Tested on

- Debian Linux 11
- NodeJS 20.11.1 (see `.nvmrc`)

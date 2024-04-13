# www.chouette.net.br

Chouette main web homepage based on [Eleventy-official "webc" starter project](https://github.com/11ty/eleventy-base-webc).

## Getting started

Git clone the repo then :

```sh
# Install dependencies.
npm i

# Start local dev.
npm run start
```

or build manually :

```sh
npm run build
```

http://www.chouette.localhost:8080/

## File structure

```txt
./chouette.net.br/         ← Project root dir
  ├── components/
  ├── data/                ← 11ty Directory for Global Data Files
  │   └── metadata.js      ← Global <head> data (title, description, language)
  ├── node_modules/        ← [git-ignored]
  ├── public/              ← 11ty Output Directory (static site generated files, web server doc root)
  ├── routes/              ← 11ty Input Directory
  ├── src/                 ← 11ty Directory for Includes
  │   └── layouts/         ← 11ty Layouts (special templates that can be used to wrap other content)
  │       ├── html.css     ← Inline ("critical") CSS injected in <head>
  │       ├── html.webc    ← Outermost template (all-encompassing wrap)
  │       └── ...
  ├── .editorconfig
  ├── .gitignore
  ├── .nvmrc
  ├── eleventy.config.js   ← https://www.11ty.dev/docs/config/
  ├── LICENSE
  ├── package-lock.json    ← [git-ignored]
  ├── package.json
  └── README.md
```

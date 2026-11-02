# Cheng — Personal Website

Source for **[ycheng22.github.io](https://ycheng22.github.io)**: a personal site and technical blog built with Angular and Tailwind CSS, deployed to GitHub Pages by GitHub Actions.

## Tech stack

- **Angular 21** (standalone components, signals), built with the esbuild `application` builder
- **Tailwind CSS 3**
- **ngx-markdown + Prism.js** for posts, **notebook-viewer-ts** for Jupyter notebook posts
- **GitHub Actions → GitHub Pages** for deploys

## Local development

Requires Node.js 22.

```bash
npm ci
npm start          # http://localhost:4200
```

Production build and local preview:

```bash
npm run build                 # output in dist/
npx serve@14 dist -l 8080     # http://localhost:8080 (behaves like GitHub Pages)
```

`npm run build` runs three steps:

1. `prebuild`: `scripts/generate-blog-index.js` reads every post's frontmatter and writes `blogs-repo/index.json`.
2. `ng build`: compiles the app into `dist/` and copies `blogs-repo/` and `src/app/img/` alongside it.
3. `postbuild`: `scripts/generate-seo-pages.js` writes a page for each route (`/blog/`, `/blog/<slug>/`) with its own title, description and Open Graph tags, plus `sitemap.xml`, `robots.txt`, `feed.xml` and `404.html`.

## Writing a post

1. Add `blogs-repo/<slug>.md`. The file name (without `.md`) becomes the URL: `/blog/<slug>`.
2. Put images under `blogs-repo/images/<post-folder>/` and reference them with absolute paths: `![alt](/blogs-repo/images/<post-folder>/pic.png)`.
3. Start the file with frontmatter:

```yaml
---
title: 'My Post Title'
description: 'One or two sentences shown on cards, in search results, and in link previews'
date: '2026-01-15'
tags: ['Angular', 'Web']
pinned: false
author: 'Cheng'
background: '/blogs-repo/images/my-post/cover.png'   # optional card / preview image
showBackground: true
isNotebook: false   # true: also loads blogs-repo/<slug>.ipynb and renders it
---
```

If `description` is left out, it's generated from the first sentences of the post. `index.json` is generated, so don't edit or commit it.

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy-pages.yml` runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages. Build output isn't committed.

Older links like `/#/blog/<slug>` are redirected to `/blog/<slug>` automatically.

## Project layout

```text
blogs-repo/            Blog posts (.md, .ipynb) and their images
scripts/               Build-time scripts (blog index, SEO pages)
src/app/
  components/          Navbar, footer, blog card, post renderer, notebook viewer
  pages/               Home (+ journey/experience), blog list, blog post, 404
  services/            BlogService: loads index.json and individual posts
  img/                 Logos and certificate images (served at /img)
.github/               Deploy workflow and Dependabot config
```

## License

Code is MIT-licensed. Blog content in `blogs-repo/` is all rights reserved. See [LICENSE](LICENSE).

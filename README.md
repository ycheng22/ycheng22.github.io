# Cheng - Personal Website

A modern, responsive personal website built with Angular 20 and TailwindCSS, featuring a blog system that fetches content from a separate GitHub repository.

## 🚀 Features

- **Modern Design**: Clean, responsive design with TailwindCSS
- **Blog System**: Fetches markdown blog posts from a separate GitHub repository
- **GitHub-Style Markdown**: Renders markdown with syntax highlighting and GitHub-flavored markdown
- **Pinned Posts**: Support for featured/pinned blog posts
- **Search & Filter**: Search through blog posts and filter by pinned status
- **GitHub Pages Ready**: Configured for deployment to GitHub Pages
- **SEO Optimized**: Proper meta tags and structured data
- **Mobile First**: Responsive design that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Angular 20 with standalone components
- **Styling**: TailwindCSS with custom components
- **Markdown**: ngx-markdown with Prism.js syntax highlighting
- **Routing**: Angular Router with withHashLocation for GitHub Pages
- **Deployment**: GitHub Actions + GitHub Pages

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── navbar/         # Navigation component
│   │   ├── footer/        # Footer component
│   │   ├── blog-card/     # Blog post card component
│   │   └── blog-post/     # Individual blog post component
│   ├── pages/             # Page components
│   │   ├── home/          # Home page
│   │   ├── blog/          # Blog listing page
│   │   └── blog-post/     # Individual blog post page
```markdown
# Cheng - Personal Website

A modern, responsive personal website built with Angular 20 and TailwindCSS. The site uses a local `blogs-repo` (copied into the build) and a small Node script to generate a blog index from markdown files.

## 🚀 Highlights

- Modern responsive UI (TailwindCSS)
- Static blog pipeline: markdown files in `blogs-repo/` are shipped with the site and indexed by `scripts/generate-blog-index.js`
- Builds output to `docs/` so the repo can be hosted on GitHub Pages
- GitHub Actions configured to build feature branches and deploy when code lands on `gh-pages`

## 🛠️ Tech Stack

- Frontend: Angular 20
- Styling: TailwindCSS
- Markdown rendering: ngx-markdown + Prism.js
- CI/CD: GitHub Actions → GitHub Pages

## 📁 Project Structure (important parts)

```
./
├── blogs-repo/                # Markdown blog posts (copied into site build)
├── docs/                     # Production build output (generated)
├── scripts/                  # Utility scripts (e.g. generate-blog-index.js)
├── src/
│   └── app/                  # Angular app
└── .github/workflows/        # CI workflow for builds and Pages deployment
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run locally

```powershell
git clone https://github.com/ycheng22/ycheng22.github.io.git
cd ycheng22.github.io
npm ci
npm start

# open http://localhost:4200
```

### Build for production (local)

This project builds into `./docs` so the output can be committed or published to Pages.

```powershell
# regenerate blog index from markdown
npm run gen-index

# build (production) -> output in ./docs
npm run build
```

## 📝 Blog authoring

- Place markdown files in `blogs-repo/` (frontmatter at the top). The repository contains example posts in `sample-blogs/`.
- The generator `scripts/generate-blog-index.js` creates `blogs-repo/index.json` (README.md is excluded) and is run in CI and as a prebuild step locally when you run `npm run build`.

### Frontmatter example

```yaml
---
title: "My Post Title"
description: "Short summary"
date: "2024-01-15"
tags: ["angular","web"]
pinned: false
author: "Cheng"
---
```

## 🚀 Deployment / GitHub Pages

This repo's CI is configured to:

- Run builds for branches matching `feature/**` (preview builds) and for `gh-pages`.
- For feature branches the workflow builds the site and uploads the `./docs` output as an artifact and sets a commit status (`CI/build`) on the commit so you can see whether the build passed.
- When you merge a feature branch into `gh-pages`, the workflow will download the previously produced artifact (or rebuild on `gh-pages`), and deploy `./docs` to GitHub Pages using the official Pages deploy actions. This avoids committing build artifacts back to the branch.

Pages configuration options:

- Recommended (current): Use the `gh-pages` branch and set Pages to serve from the root `/`.
- Alternative: Serve from `main` (or `gh-pages`) `docs/` directory — if you prefer this, set Pages source to the branch + `/docs` folder in repository settings.

## 🔁 Typical workflow

1. Work on a feature branch: `feature/xyz`
2. Push your branch → CI runs a build and you'll see a `CI/build` status on the commit
3. Create a PR to merge `feature/xyz` into `gh-pages`
4. Merge the PR → CI deploys `./docs` to Pages

## � CI notes

- The workflow is in `.github/workflows/deploy-pages.yml`.
- If you encounter dependency or peer-dependency issues when running `npm ci` in CI, tell me and I can make the workflow use `npm install --legacy-peer-deps` or pin compatible package versions.

## 📜 Other scripts

- `npm run gen-index` — regenerate `blogs-repo/index.json` from markdown files (excludes README.md)
- `npm run build` — build production site into `./docs`

## 🤝 Contributing

Contributions welcome — open a PR. For content changes, add markdown files in `blogs-repo/` and run `npm run gen-index` before building.

## 📄 License

MIT

```
### Colors and Theme

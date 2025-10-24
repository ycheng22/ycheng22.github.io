GitHub Pages setup
===================

This repository builds the site into the `docs/` folder and can be published to GitHub Pages.

If you want to use the included GitHub Action (recommended):

1. The workflow `./github/workflows/deploy-pages.yml` runs on pushes to `main` (and can be triggered manually).
   - It runs `npm ci`, regenerates the blog index (`npm run gen-index`), runs the production build (`npm run build`), and publishes the `docs/` folder to the `gh-pages` branch.
   - No extra secrets are required — the action uses `${{ secrets.GITHUB_TOKEN }}` automatically.

2. After the workflow pushes to `gh-pages`, go to your repository Settings → Pages and set the source to:
   - Branch: `gh-pages`
   - Folder: `/ (root)`

Alternative: serve from the `docs/` folder on the default branch

- The project is also configured to build into `docs/` locally. If you prefer to host Pages from the default branch's `docs/` folder (instead of `gh-pages`), set the Pages source to:
  - Branch: `main` (or your default branch)
  - Folder: `/docs`

Base href note
- For a user/organization page repository named `username.github.io`, the `--base-href /` used in the `build` script is correct.
- For a project page (repo name != `username.github.io`), update `package.json` build script to use `--base-href /REPO_NAME/` or set `<base href="/REPO_NAME/">` in `index.html`.

Local build
- Run locally:

  npm ci
  npm run gen-index
  npm run build

This will generate the static site in `./docs`.

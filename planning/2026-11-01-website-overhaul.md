# Personal Website Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put ycheng22.github.io on a clean foundation (CI-built deploys from `main`, crawlable URLs with real meta tags, fast first load, tidy repo) so the Phase 5 "employer front gate" redesign builds on solid ground.

**Architecture:** GitHub Actions builds the Angular app from source and deploys `dist/` to Pages; build output is no longer committed. A Node prebuild script turns `blogs-repo/*.md` frontmatter into a rich `index.json`. A postbuild script writes per-route HTML shells (correct `<title>`/description/Open Graph per post), `sitemap.xml`, `robots.txt`, `feed.xml` and `404.html`. The app switches from hash URLs to path URLs and loads full post content only when a post is opened.

**Tech Stack:** Angular 20 (standalone, signals), Angular `application` builder (esbuild), TailwindCSS 3, ngx-markdown + Prism, Node 22 scripts (CommonJS, no new runtime deps), GitHub Actions + GitHub Pages.

**Spec:** The review findings in the 2026-11-01 Claude Code session (sections 1–4: deployment/settings, SEO, performance, hygiene), plus the user's decisions: deploy with GitHub Actions, no tests, then a professional redesign.

## Global Constraints

- **No tests.** Do not add spec files or test tooling. Each task is verified by `npm run build` (exit 0, no new errors) plus the manual checks it lists.
- Local preview command: `npx serve@14 dist -l 8080` (it serves `404.html` and `dir/index.html` the way GitHub Pages does).
- Site URL constant: `https://ycheng22.github.io` (no custom domain).
- Node 22 locally and in CI. Stay on Angular 20; a major-version upgrade is out of scope.
- Add no new runtime dependencies. Scripts use only Node built-ins.
- One commit per task, on `feature/new-page-with-cursor` until Task 2 merges into `main`, then on short-lived branches off `main`. Never force-push `main`.
- GitHub settings changes (Pages source, rulesets, repo metadata, security alerts) are approved by the user (2026-11-01). Do not delete `feature/new-page-with-cursor`.
- Public name is **"Cheng"** everywhere (repo description, meta tags, titles). Never use the full name, for privacy.
- License: MIT for the code; blog content (`blogs-repo/`) is all rights reserved.

## Review Focus

1. **Relative image paths in posts** (62 refs like `](blogs-repo/images/...)` and `src="blogs-repo/images/..."`). They resolve against `/blog/` once hash URLs go away, so images break. Task 5 makes them absolute, and its verification opens an image-heavy post.
2. **Old shared links** like `https://ycheng22.github.io/#/blog/<slug>` (LinkedIn, résumé) must still land on the post. Task 5 adds a redirect from hash URLs and verifies it.
3. **Deep-link refresh and trailing slash.** Loading `/blog/<slug>` and `/blog/<slug>/` directly must render the post, not home or a 404. Task 6 verifies this locally and Task 2's live check repeats it after deploy.
4. **In-post TOC anchors** (`[Aggregation](#aggregation)`) must scroll within the post, not navigate home. Task 5 enables anchor scrolling and verifies on `2020-07-15-SQL_on_HackerRank`.
5. **Messy frontmatter.** Inputs with CRLF line endings, `background: ''`, a missing `description`, or quoted array tags must still produce a valid entry. Task 4 verifies the entry count and that no entry has an empty title or date.

---

## Phase 1 — Deployment & GitHub settings

### Task 1: Migrate to the `application` builder and output to `dist/`

**Files:**
- Modify: `angular.json`, `package.json` (scripts), `.gitignore`
- Delete: `.nojekyll` and its asset entry (Actions deploys skip Jekyll)

**Interfaces:**
- Produces: `npm run build` writes the deployable site to `dist/` (with `index.html` at `dist/index.html`, not `dist/browser/`). Tasks 2 and 6 rely on this path.

- [ ] **Step 1:** Run `npx ng update @angular/cli --name use-application-builder` and accept its edits.
- [ ] **Step 2:** In `angular.json` set `"outputPath": { "base": "dist", "browser": "" }`. Remove any leftover `browser`-builder-only options the build rejects.
- [ ] **Step 3:** In `package.json`, make `build` = `ng build`, remove `build:prod`, and make `build:dev` = `ng build --configuration development`. Keep `prebuild`.
- [ ] **Step 4:** In `.gitignore`, delete the `!docs/` exception (line ~128). `/dist` is already ignored.
- [ ] **Step 5: Verify.** `npm run build` exits 0 and `dist/index.html`, `dist/blogs-repo/index.json` and `dist/img/` exist. Then `npx serve@14 dist -l 8080`: home and `/#/blog` render.
- [ ] **Step 6: Commit** `build: migrate to application builder, output to dist/`

### Task 2: Build and deploy in GitHub Actions, stop committing build output, merge to `main`

**Files:**
- Modify: `.github/workflows/deploy-pages.yml`
- Delete from git: `docs/` (all 137 tracked build files)

**Interfaces:**
- Consumes: `npm run build` → `dist/` (Task 1)
- Produces: every push to `main` deploys the live site, and `workflow_dispatch` allows manual runs.

- [ ] **Step 1:** Rewrite the workflow:
  - triggers: `push: branches: [main]` + `workflow_dispatch` (drop `feature/**` and `gh-pages`)
  - a `build` job: `actions/checkout@v5`, `actions/setup-node@v5` with `node-version: 22` and `cache: npm`, `npm ci`, `npm run build`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4` with `path: ./dist`
  - a `deploy` job: `needs: build`, environment `github-pages`, `actions/deploy-pages@v4`
  - keep the existing `permissions` and `concurrency` blocks.
- [ ] **Step 2:** Push the branch, then run the workflow manually: `gh workflow run deploy-pages.yml --ref feature/new-page-with-cursor`. Confirm the build job is green (`gh run watch`). The deploy job may be blocked by the environment branch policy; that's fine at this step.
- [ ] **Step 3 (user confirms):** Switch Pages to Actions mode: `gh api -X PUT repos/ycheng22/ycheng22.github.io/pages -f build_type=workflow`. Check `gh api repos/ycheng22/ycheng22.github.io/environments/github-pages/deployment-branch-policies` and make sure `main` is allowed.
- [ ] **Step 4:** `git rm -r --cached docs && rm -rf docs`, then commit `ci: build site in Actions; stop committing build output`.
- [ ] **Step 5:** Fast-forward `main`: `git checkout main && git merge --ff-only feature/new-page-with-cursor && git push origin main`.
- [ ] **Step 6: Verify live.** The workflow run on `main` is green. `https://ycheng22.github.io/` and `/#/blog` render, and `gh api repos/ycheng22/ycheng22.github.io/pages --jq .build_type` prints `workflow`.
- [ ] **Step 7:** Keep the `feature/new-page-with-cursor` branch (user decision: do not delete). Continue later work on it and fast-forward `main` from it.

### Task 3: Repo settings, Dependabot, license

**Files:**
- Create: `.github/dependabot.yml`, `LICENSE` (per the user's decision)

- [ ] **Step 1 (user confirms):** Update repo metadata and features:
  `gh repo edit ycheng22/ycheng22.github.io --description "<approved text>" --homepage https://ycheng22.github.io --add-topic personal-website,portfolio,blog,angular,tailwindcss,github-pages --enable-wiki=false --enable-projects=false --delete-branch-on-merge`
- [ ] **Step 2 (user confirms):** Turn on security alerts and fixes: `gh api -X PUT repos/ycheng22/ycheng22.github.io/vulnerability-alerts` and `gh api -X PUT repos/ycheng22/ycheng22.github.io/automated-security-fixes`.
- [ ] **Step 3 (user confirms):** Create a ruleset on `main` with only `deletion` and `non_fast_forward` rules. No required PRs, since this is a solo repo. Use `gh api -X POST repos/ycheng22/ycheng22.github.io/rulesets --input <json>` with `target: branch`, `enforcement: active`, `conditions.ref_name.include: ["~DEFAULT_BRANCH"]`.
- [ ] **Step 4:** Add `dependabot.yml` with two ecosystems:
  - `npm`, monthly, grouped as `angular` (`@angular/*`, `@angular-devkit/*`, `ngx-markdown`) and `others` (everything else)
  - `github-actions`, monthly.
- [ ] **Step 5:** Add `LICENSE` using the option the user picks.
- [ ] **Step 6: Verify.** `gh repo view --json description,homepageUrl,repositoryTopics,hasWikiEnabled` shows the new values, and `gh api repos/ycheng22/ycheng22.github.io/rulesets` lists the ruleset.
- [ ] **Step 7: Commit** `chore: add dependabot config and license`

## Phase 2 — Blog data & SEO

### Task 4: Build-time blog index with full metadata

**Files:**
- Create: `scripts/lib/frontmatter.js`
- Modify: `scripts/generate-blog-index.js`, `.gitignore` (add `blogs-repo/index.json`; it's generated), `src/app/models/blog-post.model.ts`
- Delete: `blogs-repo/test_ipynb.ipynb` and any matching `.md`; `git rm --cached blogs-repo/index.json`

**Interfaces:**
- Produces: `parseFrontmatter(raw: string): { data: object, body: string }`, exported from `scripts/lib/frontmatter.js`. It's a port of `BlogService.parseFrontmatter` plus the `---` splitting, so it accepts CRLF, quoted strings and `['a', 'b']` arrays.
- Produces: `blogs-repo/index.json` is an array of `BlogPostSummary`, sorted pinned-first then date descending:
  ```ts
  export interface BlogPostSummary {
    slug: string; file: string; title: string; description: string; date: string;
    tags: string[]; pinned: boolean; author: string; readingTime: number;
    background?: string; showBackground?: boolean; isNotebook?: boolean;
  }
  export interface BlogPost extends BlogPostSummary { content: string; notebookData?: unknown; }
  ```
  `BlogPostMetadata` is removed.
- Defaults (match today's service): title comes from the slug in title case, author `'Cheng'`, background `'/blogs-repo/images/default_img.png'` when empty. `description` falls back to the first 160 chars of the body with markdown stripped. `readingTime` is `ceil(words / 200)`.

- [ ] **Step 1:** Write `scripts/lib/frontmatter.js` (CommonJS) by porting the parser from `src/app/services/blog.service.ts`.
- [ ] **Step 2:** Update `generate-blog-index.js` to emit `BlogPostSummary[]` using the defaults above.
- [ ] **Step 3:** Update the model file to the interfaces above. Make the smallest edits to `BlogService` that keep it compiling: populate `file` and `readingTime`, and replace `BlogPostMetadata` with `Partial<BlogPostSummary>`. The real refactor is Task 7.
- [ ] **Step 4: Verify** (Review Focus 5). `npm run gen-index` prints a count equal to the number of `.md` files minus `README.md`. `node -e "const i=require('./blogs-repo/index.json');console.log(i.filter(p=>!p.title||!p.date).length)"` prints `0`. `npm run build` exits 0.
- [ ] **Step 5: Commit** `feat(blog): generate full post metadata at build time`

### Task 5: Path URLs instead of hash URLs

**Files:**
- Modify: `src/main.ts`, `src/app/app.routes.ts`, `src/index.html`, `blogs-repo/*.md` (image paths)
- Create: `src/app/pages/not-found/not-found.component.ts` (inline template: short message + links to Home and Blog)

**Interfaces:**
- Produces: routes `/`, `/blog`, `/blog/:slug`, and `**` → `NotFoundComponent`. Routes get `title: 'Cheng — Software Engineer'` and `title: 'Blog — Cheng'`.

- [ ] **Step 1:** In `main.ts`, replace `withHashLocation(), withPreloading(PreloadAllModules)` with `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })`. Preloading removal is part of the Task 7 perf work; do it here because it's the same line.
- [ ] **Step 2:** Add the redirect from old hash URLs as the first `<script>` in `<head>` of `src/index.html`:
  ```html
  <script>if (location.hash.indexOf('#/') === 0) history.replaceState(null, '', location.hash.slice(1));</script>
  ```
- [ ] **Step 3:** Make post image paths absolute: replace `](blogs-repo/` → `](/blogs-repo/` and `src="blogs-repo/` → `src="/blogs-repo/` in `blogs-repo/*.md`. Leave paths that are already absolute alone.
- [ ] **Step 4:** Grep `src/app` for `href="#`, `'#/'` and `window.location` uses that assume hash routing, and switch them to `routerLink`/`fragment`.
- [ ] **Step 5: Verify** with `npm run build && npx serve@14 dist -l 8080`:
  - `/blog` lists posts.
  - `/#/blog` ends on `/blog` (Review Focus 2).
  - On `/blog/2020-07-15-SQL_on_HackerRank`, clicking a TOC entry scrolls and stays on the post (Review Focus 4).
  - A post with `blogs-repo/images` shows its images (Review Focus 1).
  - `/nope` shows the not-found page.
- [ ] **Step 6: Commit** `feat: switch to path URLs with legacy hash redirect`

### Task 6: Per-route HTML shells, sitemap, robots, RSS, 404

**Files:**
- Create: `scripts/generate-seo-pages.js`
- Modify: `package.json` (add `"postbuild": "node ./scripts/generate-seo-pages.js"`), `src/index.html` (default meta block), `angular.json` (drop the robots/sitemap asset if present)
- Delete: `src/robots.txt`, `src/sitemap.xml` (now generated)

**Interfaces:**
- Consumes: `dist/index.html`, `blogs-repo/index.json` (`BlogPostSummary[]`, Task 4)
- `src/index.html` wraps its SEO tags in `<!-- seo:start -->…<!-- seo:end -->`. The block holds `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name` and `twitter:card`. The script replaces that block and the `<title>` per page.

- [ ] **Step 1:** Add the default meta block to `src/index.html` for the home page. Use a description the user approves at execution time.
- [ ] **Step 2:** Write the script. Using `SITE_URL = 'https://ycheng22.github.io'`, it writes:
  - `dist/blog/index.html`: blog list meta.
  - `dist/blog/<slug>/index.html` for each post: title `<post title> — Cheng`, the post description, canonical `${SITE_URL}/blog/<slug>/`, `og:type=article`, and `og:image` (absolute URL) only when the post's `background` isn't the default image.
  - `dist/404.html`: a copy of `dist/index.html`.
  - `dist/sitemap.xml`: `/`, `/blog/` and every post, with `<lastmod>` set to the post date (YYYY-MM-DD).
  - `dist/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: ${SITE_URL}/sitemap.xml`.
  - `dist/feed.xml`: RSS 2.0 with the latest 20 posts (title, link, guid = link, pubDate, description).

  HTML/XML-escape every value inserted.
- [ ] **Step 3:** In `blog-post.component.ts`, set `Title` to `<post title> — Cheng` when the post resolves. Add `<link rel="alternate" type="application/rss+xml" href="/feed.xml">` to `src/index.html`.
- [ ] **Step 4: Verify** (Review Focus 3) with `npm run build && npx serve@14 dist -l 8080`:
  - Loading `/blog/<slug>` and `/blog/<slug>/` directly both render the post.
  - `curl -s localhost:8080/blog/<slug>/ | grep og:title` shows that post's title.
  - `/sitemap.xml`, `/robots.txt` and `/feed.xml` return 200 and are well formed. Paste the feed into an RSS validator or run `xmllint --noout`.
- [ ] **Step 5: Commit** `feat(seo): per-route meta shells, sitemap, robots, rss, 404`
- [ ] **Step 6:** After merge and deploy, repeat the Step 4 checks against `https://ycheng22.github.io`. Submit the sitemap in Google Search Console (user action).

## Phase 3 — Performance

### Task 7: Load post content only when a post is opened

**Files:**
- Modify: `src/app/services/blog.service.ts`, `src/app/pages/blog-post/blog-post.component.ts` + `.html`, `src/app/components/blog-card/blog-card.component.ts`, `src/app/pages/home/home.component.ts`, `src/app/pages/blog/blog.component.ts`

**Interfaces:**
- Consumes: `BlogPostSummary`, `BlogPost` (Task 4)
- Produces, in `BlogService`:
  - `blogPosts: Signal<BlogPostSummary[]>`: loaded once from `/blogs-repo/index.json` and nothing else.
  - `loadPost(slug: string): Observable<BlogPost | null>`: fetches `/blogs-repo/<file>`, strips the frontmatter, and also fetches the `.ipynb` when `isNotebook`. Returns `null` when the slug isn't in the index or the fetch fails.
  - Remove the in-service frontmatter parsing, `getPostBySlug`, the dead `GITHUB_API_*` constants, and the verbose `console.error` dumps.
- The blog-card `@Input` type becomes `BlogPostSummary`.

- [ ] **Step 1:** Refactor `BlogService` to the interface above.
- [ ] **Step 2:** In the blog-post page, derive the post with `toSignal(route.params → switchMap(loadPost))`. Show a loading state while it's pending and the not-found state when it's `null`.
- [ ] **Step 3:** In `blog-post.component.html`, wrap the Jupyter viewer in `@defer (when post.isNotebook)` so the notebook/katex code loads only for notebook posts.
- [ ] **Step 4: Verify.** Run `npm run build` and check the build summary: the initial total stays under the 500 kB warning. With `npx serve@14 dist -l 8080` and DevTools Network open:
  - Loading `/` requests `index.json` but no `.md`/`.ipynb` files.
  - Opening a markdown post fetches exactly one `.md` and no large chunk.
  - Opening a notebook post renders the notebook.
- [ ] **Step 5: Commit** `perf(blog): fetch post content on demand; defer notebook viewer`

### Task 8: Trim asset weight

**Files:**
- Modify: `src/index.html` (fonts), `src/app/pages/home/home.component.html` + `journey/*.html` (images), `blogs-repo/images/**` (re-encoded in place)
- Delete: `src/app/img/waving_hand.gif` (replaced by a 👋 emoji with a CSS wave keyframe)

- [ ] **Step 1:** Fonts: grep `tailwind.config.js` and `src/**/*.{css,scss,html}` to find which families and weights are used. Load only those, and drop Fira Code if it's unused.
- [ ] **Step 2:** On the home page and in Journey, switch `<img>` to `NgOptimizedImage` (`ngSrc` with explicit `width`/`height`). Add `priority` only on the first visible image.
- [ ] **Step 3:** Run `npx --yes sharp-cli` once over `blogs-repo/images`, without adding it to `package.json`:
  - Resize anything wider than 1600 px down to 1600 px.
  - Re-encode PNG with max compression and JPEG at quality 80.
  - Keep filenames so post markdown is unchanged.

  Target: `du -sh blogs-repo/images` under 8 MB.
- [ ] **Step 4: Verify.** `npm run build` exits 0. Home renders with no layout shift around logos, and a few image-heavy posts still look sharp.
- [ ] **Step 5: Commit** `perf: trim fonts, optimize images`

## Phase 4 — Hygiene

### Task 9: Remove test tooling, dead files, and duplicate docs

**Files:**
- Delete: `test-frontmatter-extraction.js`, `test-parse-frontmatter.js`, `test-tags-parsing.js`, `tsconfig.spec.json`, `PAGES_SETUP.md`, `BLOG_SETUP.md`
- Modify: `package.json` (remove the `test` script and the karma/jasmine devDependencies), `angular.json` (remove the `test` target), `README.md`

- [ ] **Step 1:** Remove the test tooling listed above, then run `npm install` to update the lockfile.
- [ ] **Step 2:** Rewrite `README.md` as one accurate document:
  - what the site is, with a live link
  - tech stack
  - local dev (`npm start`)
  - how to add a post (frontmatter fields from `BlogPostSummary`, where images go)
  - how deploys work (push to `main` → Actions)
  - folder map.

  Drop the duplicated half and the manual "build, commit docs" notes.
- [ ] **Step 3: Verify.** `npm ci && npm run build` exits 0, and `npm run format:check` passes (run `npm run format` first if needed).
- [ ] **Step 4: Commit** `chore: remove test tooling and stale docs; rewrite README`

## Phase 5 — Professional redesign (separate brainstorm → its own plan)

Phase 5 isn't broken into tasks here on purpose. It's design work, so it starts with a `superpowers:brainstorming` session once Phases 1–4 are live, and that session produces its own spec and plan. Expected scope, to be confirmed in the brainstorm:

- A hero that answers "who, what, and why hire" within 5 seconds: name, title, value statement, primary CTAs (Résumé PDF, LinkedIn, GitHub, Email).
- Selected projects and case studies (problem → approach → impact, with links) ahead of the timeline.
- Experience, certifications and skills moved from the 561/599-line templates into typed data files rendered with `@for`, so updates are data edits.
- A downloadable résumé, a contact section, a dark mode toggle, and a consistent visual system (type scale, color tokens, spacing).
- Accessibility pass (contrast, alt text, keyboard focus) and a Lighthouse target (≥ 90 on all four categories).

**Bring to the brainstorm:** your current résumé, 2–3 target roles and job postings, 3–5 projects you'd want an employer to see, a headshot (optional), and 1–2 personal sites you admire.

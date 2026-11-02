# Employer-Focused Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page as an AI-engineer front door (hero with metrics, projects, experience, skills, education, writing, about, contact), driven by typed data files, with a light visual refresh and dark mode across the site.

**Architecture:** Content lives in `src/app/data/*.ts`. Each home section is a small standalone component under `src/app/pages/home/sections/` that renders one data file. `home.component` only composes the sections. A `ThemeService` toggles a `dark` class on `<html>`; Tailwind `darkMode: 'class'` plus an `accent` (indigo) palette provide the visual system. The SEO postbuild script gains JSON-LD handling.

**Tech Stack:** Angular 21 (standalone, signals, `@if`/`@for`), Tailwind CSS 3, existing BlogService, Node postbuild script.

**Spec:** `planning/2026-11-01-employer-redesign-design.md`. Exact copy (tagline, metrics, skills, education, contact text) comes from the spec. Project detail bullets are fixed in Task 2 below.

## Global Constraints

- **No tests.** Verify each task with `npm run build` (exit 0, no new warnings) plus the browser checks it lists. Preview: `npx serve@14 dist -l 8080`; cache-bust with `?v=N` when checking.
- Public name **"Cheng"** only. The only allowed occurrence of the full name is inside the LinkedIn URL.
- No résumé file, no email address, anywhere.
- One accent color: Tailwind `accent` = indigo scale (`accent-600` = `#4f46e5`). The only gradient is the logo image. The hero glow is a soft radial background.
- Section wrapper: `max-w-[1100px] mx-auto px-4 sm:px-6`, vertical padding `py-16 md:py-24`. Cards: `rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`.
- Type: hero headline `text-[40px] md:text-[56px]`, section titles `text-3xl`, lead `text-lg`, body `text-base`. Metrics and code use `font-mono` (JetBrains Mono).
- Motion: respect `prefers-reduced-motion` (no reveal animation, no wave).
- Commit after every task on `feature/new-page-with-cursor`. Fast-forward and deploy `main` only after Task 9.

## Review Focus

1. **Dark mode on pages this plan barely touches.** Markdown post bodies (`.markdown-body`), the notebook viewer and the blog cards must stay readable (no dark text on a dark background). Task 7 verifies a markdown post, a notebook post and `/blog` in dark mode.
2. **Nav anchors from other pages.** Clicking "Projects" on `/blog/<slug>` must land on the home Projects section, and the mobile menu must close after a click. Task 3 verifies.
3. **Theme edge cases.** No flash of the wrong theme on reload. If `localStorage` throws (private mode or blocked storage), the site still renders using the system theme. Task 1 verifies.
4. **Narrow screens.** At 375px, long metric badges and skill chips must wrap with no horizontal scroll. Tasks 4 and 9 verify.
5. **Experience highlights use `[innerHTML]`.** `<b>` must survive Angular's sanitizer and nothing else is injected. Task 5 verifies bold text renders.

---

### Task 1: Visual tokens, dark mode, reveal directive

**Files:**
- Modify: `tailwind.config.js`, `src/styles.css`, `src/index.html`
- Create: `src/app/services/theme.service.ts`, `src/app/shared/reveal.directive.ts`

**Interfaces:**
- Produces: `ThemeService` (providedIn root) with `theme: Signal<'light' | 'dark'>` and `toggle(): void`. It persists under the `localStorage` key `'theme'` (every access in try/catch) and applies/removes `dark` on `document.documentElement`.
- Produces: `RevealDirective`, selector `[appReveal]`, standalone. It adds class `reveal-in` when the element first intersects the viewport (IntersectionObserver, then disconnects). CSS: `.reveal` starts `opacity-0 translate-y-4`, `.reveal-in` transitions to visible; under `prefers-reduced-motion` `.reveal` is always visible.
- Produces Tailwind tokens: `darkMode: 'class'`, `colors.accent` = Tailwind indigo scale, `fontFamily.mono = ['JetBrains Mono', 'ui-monospace', 'monospace']`. Remove the unused `primary`/`purple` overrides; replace `primary-*` usages in `styles.css` with `accent-*`.

- [ ] **Step 1:** Update `tailwind.config.js` as above.
- [ ] **Step 2:** In `styles.css`:
  - body: `bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`
  - `.btn-primary`: accent-600 solid
  - `.btn-secondary`: slate outline with dark variant
  - `.card`: the card classes from Global Constraints
  - add `.section` (the wrapper plus padding from Global Constraints), `.section-title`, `.badge-metric` (mono pill: `bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-300`), `.chip`, and the reveal classes
  - add `dark:` variants to the `.markdown-body` text, heading and border rules
- [ ] **Step 3:** Add the pre-paint script to `<head>` in `src/index.html`, right after the hash-redirect script:
  ```html
  <script>try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}</script>
  ```
- [ ] **Step 4:** Create `ThemeService` and `RevealDirective`. The service's initial value is read from the `dark` class already on `<html>`, so it matches the pre-paint script.
- [ ] **Step 5: Verify.** `npm run build` exits 0. In the browser, run `document.documentElement.classList.add('dark')` and confirm the body turns dark. Reload with `localStorage.theme='dark'` and there's no light flash. With `localStorage` stubbed to throw before load, the page still renders (Review Focus 3).
- [ ] **Step 6: Commit** `feat(ui): design tokens, dark mode theme service, reveal directive`

### Task 2: Content data layer

**Files:**
- Create: `src/app/data/types.ts`, `profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `education.ts`, `certifications.ts`
- Delete: `src/app/models/url.constant.ts` (repoint its importers to `PROFILE.links`)

**Interfaces** (`types.ts`, all exported):
```ts
export interface Profile {
  name: string; headline: string; tagline: string;
  credentials: string[]; heroMetrics: string[];
  links: { linkedIn: string; github: string };
}
export interface Project {
  name: string; subtitle: string; summary: string;
  metrics: string[]; stack: string[]; details: string[];
  link: { label: 'Live demo' | 'GitHub'; url: string };
}
export interface Experience {
  company: string; role: string; period: string;
  highlights: string[];            // may contain <b>…</b>; rendered via [innerHTML]
  tags: string[]; icon: 'work' | 'research' | 'intern'; logo?: string;
}
export interface SkillGroup { title: string; skills: string[] }
export interface Education { school: string; degree: string; period: string; location?: string; logo?: string; note?: string }
export interface Certification { name: string; issuer: string; image: string }
```
Exports: `PROFILE: Profile`, `PROJECTS: Project[]`, `EXPERIENCE: Experience[]`, `SKILL_GROUPS: SkillGroup[]`, `EDUCATION: Education[]` (newest first), `CERTIFICATIONS: Certification[]`.

- [ ] **Step 1:** `profile.ts`:
  - name, headline, tagline, the 4 credentials and the 4 hero metrics exactly as in the spec
  - `links.linkedIn` = current value from `url.constant.ts`, `links.github = 'https://github.com/ycheng22'`
- [ ] **Step 2:** `projects.ts`: name, link, summary (the spec's "one-liner"), metrics and stack exactly as in the spec. `subtitle` is the part after the dash in the name (e.g. "Multilingual Hybrid Search & Reranking"). `details`, verbatim:
  - ShopRank:
    1. "Built a hybrid retrieval pipeline on the Amazon ESCI benchmark (30k products): BM25 + BGE-M3 dense retrieval (pgvector HNSW), RRF fusion, and cross-encoder reranking, lifting NDCG@10 from 0.417 to 0.581 (+39%) and MRR@10 from 0.662 to 0.794, with each stage's gain proven in a 5-stage ablation."
    2. "Enabled cross-lingual search for Chinese and French queries on an English catalog, raising NDCG@10 from near-zero BM25 (0.016 / 0.098) to 0.382 / 0.398; Matryoshka truncation to 768 dims matched 1024-dim quality (0.518 vs. 0.517) within the free-tier storage quota."
  - TripAgent:
    1. "Built a LangGraph travel-planning agent that keeps LLM itineraries feasible: every draft is checked by 4 deterministic, LLM-free validators (GTFS transit connectivity, Haversine reachability, opening hours, budget), revised with validator feedback up to 3 times, or reported as infeasible instead of fabricated."
    2. "Gated every side effect with human-in-the-loop approval, idempotency keys, and circuit breakers; evaluated on 41 trajectory and adversarial scenarios: 0% transit hallucination, 11/11 prompt injections blocked, and 10/10 constraint violations caught at $0.0027 average cost per task."
  - Small-Model RL for Code:
    1. "Post-trained Qwen3.5-2B with GRPO (TRL + LoRA) using sandboxed unit-test execution as the reward, raising held-out MBPP Pass@1 from 40.6% to 55.4% (+14.8 pt, 3 seeds) at ~2.5 T4 GPU-hours per run; an SFT baseline gave no gain, and the gain did not significantly transfer to HumanEval."
    2. "Ran controlled ablations with paired-bootstrap CIs on a SHA-256-frozen, leakage-audited test set: one GRPO sample matched ~4 base samples, hard-task mining tied random selection, and ReAct tool use helped at 4B (+23 pt) but not 2B; found and corrected a 90% output-truncation confound that had reversed the 4B-vs-2B conclusion."
- [ ] **Step 3:** `experience.ts`: move the array from `pages/home/journey/work-exp/work-exp.ts` unchanged, then prepend the spec's AI platform highlight to the ACA entry, formatted as `'<b>Internal AI Agent Platform:</b> Built and scaled an enterprise AI agent platform to <b>100+ users</b>, with security guardrails for handling financial data.'`
- [ ] **Step 4:** `skills.ts`: the seven groups and their skills exactly as listed in the spec.
- [ ] **Step 5:** `education.ts`:
  1. Cumberlands Ph.D. AI, "Aug 2026 – Present", no logo
  2. Georgia Tech M.S. CS, "Jan 2022 – Dec 2023", Atlanta, GA, `/img/GT.png`
  3. Houston Ph.D. Physics, "Aug 2016 – May 2022", Houston, TX, `/img/uh_logo.png`, with the spec's research note
  4. China University of Petroleum-Beijing, "B.E. in Geophysics · B.A. in Accounting", "2012 – 2016", Beijing, China, `/img/CUP.png`

  `certifications.ts`:
  - AWS Certified Solutions Architect – Associate (Amazon Web Services, `/img/AWS_SAA.png`)
  - AWS Certified Developer – Associate (Amazon Web Services, `/img/AWS_DVA.png`)
  - CFA Level I (CFA Institute, `/img/CFA_1.png`)

  Cross-check the names against the alt/heading text in the current `journey.html` and keep its wording if it differs.
- [ ] **Step 6: Verify.** `npm run build` exits 0. `grep -rn url.constant src` finds nothing.
- [ ] **Step 7: Commit** `feat(data): typed content data for profile, projects, experience, skills, education`

### Task 3: Navbar and footer

**Files:** Modify `src/app/components/navbar/navbar.component.{ts,html}`, `src/app/components/footer/footer.component.{ts,html}`, `src/app/app.component.html`

**Interfaces:** Consumes `ThemeService`, `PROFILE.links`.

- [ ] **Step 1:** Navbar:
  - sticky, translucent (`bg-white/80 dark:bg-slate-950/80 backdrop-blur`), bottom border
  - left: `<img src="/icon-192.png" width="28" height="28" alt="">` + "Cheng", linking to `/`
  - links: Projects, Experience, About as `routerLink="/" fragment="projects|experience|about"`, Blog as `routerLink="/blog"`
  - theme toggle button (sun/moon SVG, `aria-label="Toggle dark mode"`)
  - LinkedIn button (`.btn-primary`, `target="_blank" rel="noopener"`)
  - mobile: the existing menu toggle, listing the same items; `closeMenu()` runs on every link click
- [ ] **Step 2:** Footer: "© {{year}} Cheng" plus LinkedIn and GitHub icon links, using slate/dark classes.
- [ ] **Step 3: Verify** (Review Focus 2). On `/blog/<slug>`, clicking Projects ends on `/#projects` and scrolls to it once Task 4 adds the anchor (before that, just confirm navigation to `/`). The mobile menu at 375px closes after a click. The toggle flips the theme and survives a reload.
- [ ] **Step 4: Commit** `feat(ui): new navbar with logo, section links, theme toggle; footer`

### Task 4: Hero and Projects sections

**Files:**
- Create: `src/app/pages/home/sections/hero/hero.component.ts`, `sections/projects/projects.component.ts`, `sections/projects/project-card.component.ts` (inline templates)
- Modify: `src/app/pages/home/home.component.{ts,html}` (insert at top, ahead of the old content, during migration)

**Interfaces:** Consumes `PROFILE`, `PROJECTS`. `ProjectCardComponent` takes `@Input({ required: true }) project!: Project`.

- [ ] **Step 1:** Hero (`id="top"`):
  - "I'm Cheng 👋" (move the `.wave` keyframes from `home.component.scss`)
  - `<h1>` AI Engineer, tagline, credentials joined with " · "
  - CTAs: View projects (`routerLink="/" fragment="projects"`, `.btn-primary`), LinkedIn, GitHub
  - hero metrics as `.badge-metric` pills that wrap
  - background: `bg-slate-50 dark:bg-slate-950` with a radial glow (`bg-[radial-gradient(...)]` in indigo/cyan at low opacity)
- [ ] **Step 2:** Projects (`id="projects"`, title "Projects"): a grid, 1 column on mobile and 3 on large screens. Each card:
  - name and subtitle
  - summary
  - metric badges
  - stack chips
  - a link button (`project.link.label`, opens in a new tab)
  - `<details><summary>Details</summary><ul>…</ul></details>` with the detail bullets
- [ ] **Step 3: Verify.** At 1280px and 375px, both themes:
  - the hero shows the exact spec copy
  - 3 cards, each link points to its URL from the spec
  - Details expands
  - no horizontal scroll at 375px: `document.documentElement.scrollWidth <= innerWidth` (Review Focus 4)
- [ ] **Step 4: Commit** `feat(home): hero with metrics and project cards`

### Task 5: Experience, Skills, Education & Certifications sections

**Files:**
- Create: `sections/experience/experience.component.{ts,html}` (from `journey/work-exp/work-exp.{ts,html,scss}`, keeping its timeline markup and animation), `sections/skills/skills.component.ts`, `sections/education/education.component.ts`

**Interfaces:** Consumes `EXPERIENCE`, `SKILL_GROUPS`, `EDUCATION`, `CERTIFICATIONS`.

- [ ] **Step 1:** Experience (`id="experience"`, title "Experience"): the existing timeline, reading `EXPERIENCE`, with highlights rendered via `[innerHTML]`. Restyle colors to slate/accent with `dark:` variants and drop the old blue/purple gradients.
- [ ] **Step 2:** Skills (title "Skills"): one card per group, title and `.chip` list, in a 2-column grid on desktop.
- [ ] **Step 3:** Education & Certifications (title "Education"):
  - a vertical list of `EDUCATION`: logo if present, school, degree, period, location, note
  - a row of `CERTIFICATIONS`: badge image (`loading="lazy"`, width/height set), name, issuer
- [ ] **Step 4: Verify.** The ACA entry's first highlight shows "Internal AI Agent Platform" in bold (Review Focus 5). All 7 skill groups are present. 4 education entries and 3 certification images load. Both themes are readable.
- [ ] **Step 5: Commit** `feat(home): experience, skills, education sections from data`

### Task 6: Writing, About, Contact; compose home; remove old markup

**Files:**
- Create: `sections/writing/writing.component.ts`, `sections/about/about.component.{ts,html,scss}`, `sections/contact/contact.component.ts`
- Rewrite: `src/app/pages/home/home.component.{ts,html,scss}`
- Delete: `src/app/pages/home/journey/` (whole folder), `src/app/img/UH.png` if nothing references it after migration

**Interfaces:** Consumes `BlogService.blogPosts`, `BlogCardComponent`, `PROFILE.links`, `RevealDirective`.

- [ ] **Step 1:** Writing (title "Writing"): `posts = computed(() => [...notebooks, ...others].slice(0, 6))`, where notebooks are `isNotebook` posts in index order and others are the remaining posts sorted by date descending. Render with `app-blog-card`, plus a "View all posts →" link to `/blog`.
- [ ] **Step 2:** About (`id="about"`): move the "Languages I Speak" section (`home.component.html` lines ~351–460) and the "My Global Journey" block (`journey.html` lines ~2–62, everything before `<app-work-exp>`) into `about.component.html` **unchanged**, except:
  - wrap them in `.section`
  - add `dark:` variants to backgrounds, cards and text so both read in dark mode
- [ ] **Step 3:** Contact (`id="contact"`):
  - "Open to AI engineering roles"
  - "The fastest way to reach me is LinkedIn."
  - large LinkedIn `.btn-primary` and a GitHub `.btn-secondary`
- [ ] **Step 4:** `home.component.html` becomes, in order: `app-hero, app-projects, app-experience, app-skills, app-education, app-writing, app-about, app-contact`. Each section after the hero gets `appReveal` with the `.reveal` class. Remove the old template content, `scrollToSection`, and unused SCSS.
- [ ] **Step 5:** Delete the `journey/` folder. Check `grep -rn "app-journey\|work-exp\|UH.png" src` and remove `UH.png` only if it has no matches.
- [ ] **Step 6: Verify.** Sections appear in spec order. Writing shows up to 6 cards, notebooks first. About matches the old look in light mode and is readable in dark. Contact has no email anywhere (`grep -rni "mailto\|@hotmail\|@gmail" src` finds nothing). Nav anchors scroll to Projects, Experience and About.
- [ ] **Step 7: Commit** `feat(home): writing, about, contact sections; home composed from sections`

### Task 7: Blog list, blog post and 404 in the new style

**Files:** Modify `src/app/pages/blog/blog.component.html`, `src/app/pages/blog-post/blog-post.component.html`, `src/app/components/blog-post/blog-post.component.{html,scss}`, `src/app/components/blog-card/blog-card.component.html`, `src/app/pages/not-found/not-found.component.ts`

- [ ] **Step 1:** Swap blue/purple/gray classes for slate/accent equivalents and add `dark:` variants (page backgrounds, cards, borders, headings, body text, tag chips, inputs). Layout stays unchanged.
- [ ] **Step 2:** In `blog-post.component.scss`, give the markdown body, tables, blockquotes and inline code dark variants via `:host-context(.dark)`. Code blocks keep the Prism dark theme. The notebook viewer gets a light-on-dark override only where its text would be unreadable.
- [ ] **Step 3: Verify** (Review Focus 1). In dark mode, check `/blog` (cards, search input), `/blog/2020-07-15-SQL_on_HackerRank` (headings, tables, inline code readable) and `/blog/crewai_01_entry_level_crewai` (notebook readable). `/nope` is styled. Repeat in light mode to check nothing regressed.
- [ ] **Step 4: Commit** `feat(ui): blog, post and 404 pages in new palette with dark mode`

### Task 8: SEO copy and JSON-LD

**Files:** Modify `src/index.html`, `src/app/app.routes.ts`, `scripts/generate-seo-pages.js`

- [ ] **Step 1:** Make these replacements:
  - home route title and `<title>` → "Cheng — AI Engineer"
  - in the seo block, description and og:description → the spec's description, og:title → "Cheng — AI Engineer"
- [ ] **Step 2:** Add the JSON-LD after the seo block, wrapped in `<!-- jsonld:start -->…<!-- jsonld:end -->`:
  `{"@context":"https://schema.org","@type":"Person","name":"Cheng","jobTitle":"AI Engineer","url":"https://ycheng22.github.io/","sameAs":[<linkedIn>,<github>]}`
- [ ] **Step 3:** In `generate-seo-pages.js`, remove the jsonld block from every generated page except home (blog index, posts, 404) using a function replacer, and switch the existing `.replace` calls to function replacers too, so `$` in a title can't corrupt the output (a deferred minor from the last review).
- [ ] **Step 4: Verify.** `npm run build`, then:
  - `grep -c jsonld dist/index.html` → 1
  - `grep -c jsonld dist/blog/index.html dist/404.html` → 0
  - `dist/blog/<slug>/index.html` shows the post title in `<title>`
  - `node -e` parses the JSON-LD from `dist/index.html` without error
- [ ] **Step 5: Commit** `feat(seo): AI-engineer meta copy and Person JSON-LD`

### Task 9: Final verification and deploy

- [ ] **Step 1:** Screenshots of the full home page at 1280px and 375px, in light and dark (4 images), plus `/blog` in dark. Save them in the scratchpad and show them to the user.
- [ ] **Step 2:** On every page, the no-horizontal-scroll check at 375px. Every `<a href^="http">` on home points to one of: the LinkedIn URL, `https://github.com/ycheng22`, the 3 project URLs, or a blog link.
- [ ] **Step 3:** Run Lighthouse once on `http://localhost:8080/` using Playwright's Chromium (`CHROME_PATH`) via `npx lighthouse … --only-categories=performance,accessibility,best-practices,seo`. Report the four scores. Fix any accessibility or SEO item that's an easy win (contrast, missing alt, missing labels). Report the rest as-is.
- [ ] **Step 4:** Privacy check: `grep -rni "yunpeng" src dist` → matches only the LinkedIn URL.
- [ ] **Step 5:** Fast-forward `main`, push, watch the Actions run, then re-check the live home page, `/blog/` and one post for 200 status and the correct `<title>`.
- [ ] **Step 6: Commit** any Lighthouse fixes as `fix(a11y): …` before Step 5.

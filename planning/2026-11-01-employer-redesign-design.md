# Employer-Focused Redesign — Design Spec

**Date:** 2026-11-01 · **Status:** awaiting user review · **Follows:** `planning/2026-11-01-website-overhaul.md` (Phases 1–4, done)

## Goal

Turn ycheng22.github.io into the front door for **AI/LLM engineering** job applications, with full-stack experience as the supporting story. Within ~10 seconds a recruiter or hiring manager should know: *AI engineer who ships production systems and measures results*. They should see three projects with numbers and links and be able to reach Cheng on LinkedIn without scrolling far.

The site is used both for active applications (linked from applications) and passively (recruiters who find it).

## Decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Target | AI/LLM engineering roles; full-stack (Angular/.NET/Python) as supporting experience |
| Contact | LinkedIn + GitHub only. **No résumé file, no email** on the site |
| Personal sections | "Languages I Speak" and "My Global Journey" **kept as-is**, moved below projects and experience |
| Visual scope | **Light refresh**: restrained palette, consistent type and spacing, metric badges, dark mode |
| Architecture | **Data-driven sections**: content in typed data files, one small component per section |
| Project links | Public demo URLs for ShopRank and TripAgent; GitHub repo for the RL project |
| Work AI platform | **Confidential.** One deliberately vague bullet, no stack or numbers beyond "100+ users" |
| Title at ACA | Stays "Software Engineer" |
| Privacy | Public name **"Cheng"** only, everywhere (copy, meta, JSON-LD) |

## Page structure (home, top to bottom)

1. **Navbar:** "Cheng" left. Right: Projects · Experience · Blog · About (in-page anchors; Blog routes to `/blog`), dark-mode toggle, **LinkedIn** button. Collapses to a menu on mobile.
2. **Hero:** "I'm Cheng 👋" (wave kept). Headline **AI Engineer**.
   - Tagline: *"I build LLM agents, retrieval systems, and model post-training pipelines — and measure whether they work."*
   - Credentials line: *Ph.D. Physics · M.S. CS (Georgia Tech) · Ph.D. AI (in progress) · 4+ years of production software in auto finance*
   - CTAs: **View projects** (primary, scrolls to Projects), LinkedIn, GitHub
   - Metrics strip: `+39% NDCG@10` · `11/11 prompt injections blocked` · `+14.8 pt Pass@1` · `AI agent platform · 100+ users`
3. **Projects:** three cards (data below). Each card has a one-liner, 2–3 metric badges, stack tags, a link button, and an expandable "Details" holding the résumé bullets.
4. **Experience:** existing timeline restyled. ACA entry's first highlight is the AI platform bullet, then the four existing highlights. UH and Accenture entries unchanged.
5. **Skills:** grouped text chips (categories below). Replaces the logo wall and the Frontend/Backend/Cloud/Data/AI cards.
6. **Education & Certifications:** Ph.D. AI (in progress) · M.S. CS Georgia Tech · Ph.D. Physics University of Houston (with research one-liner) · existing CUP entry kept. Certifications: AWS Solutions Architect, AWS Developer, CFA Level I (existing badge images).
7. **Writing:** up to 6 posts, AI notebook posts (`isNotebook`) first, then newest, plus a "View all posts" link to `/blog`.
8. **About:** existing "Languages I Speak" and "My Global Journey" markup, unchanged except palette and dark-mode classes.
9. **Contact:** heading *"Open to AI engineering roles"*. Short line: *"The fastest way to reach me is LinkedIn."* Large LinkedIn button and a GitHub link.

Footer: "© 2026 Cheng", LinkedIn and GitHub icons.

## Content data

### Projects

**ShopRank — Multilingual Hybrid Search & Reranking**: link `https://shoprank.vectorlab.me` (Live demo)
- One-liner: Hybrid BM25 + dense retrieval with cross-encoder reranking on the Amazon ESCI benchmark, including cross-lingual search.
- Metrics: `NDCG@10 0.417 → 0.581 (+39%)`, `MRR@10 0.662 → 0.794`, `Cross-lingual NDCG@10 ≈0 → 0.38–0.40`
- Stack: BM25, BGE-M3, pgvector HNSW, RRF, Cross-encoder, PostgreSQL
- Details: the two résumé bullets, verbatim.

**TripAgent — Verified LLM Planning Agent**: link `https://tripagent.vectorlab.me` (Live demo)
- One-liner: LangGraph travel planner whose itineraries are checked by deterministic validators, revised, or honestly reported as infeasible.
- Metrics: `0% transit hallucination`, `11/11 prompt injections blocked`, `$0.0027 / task`
- Stack: LangGraph, Python, GTFS, Human-in-the-loop, Circuit breakers
- Details: the two résumé bullets, verbatim.

**Small-Model RL for Code — GRPO with Unit-Test Rewards**: link `https://github.com/ycheng22/local-llm-lab` (GitHub)
- One-liner: GRPO post-training of Qwen3.5-2B with sandboxed unit-test rewards, with controlled ablations.
- Metrics: `MBPP Pass@1 40.6% → 55.4% (+14.8 pt)`, `3 seeds`, `~2.5 T4 GPU-hours / run`
- Stack: PyTorch, TRL, LoRA, GRPO, Qwen
- Details: the two résumé bullets, verbatim.

### Experience — new first ACA highlight

> **Internal AI Agent Platform:** Built and scaled an enterprise AI agent platform to **100+ users**, with security guardrails for handling financial data.

### Skills (chips, from résumé)

- **LLM & Agents:** OpenAI API, LangGraph, LangChain, CrewAI, MCP servers, AI agents & skills, RAG, prompt engineering, vLLM, PyTorch, Scikit-learn, NLP, GRPO, LoRA
- **Retrieval & Evaluation:** Hybrid search (BM25 + vector), embeddings, cross-encoder reranking, cross-lingual retrieval, NDCG / Recall / MRR, LLM & agent evals
- **Languages & AI Tools:** Python, C#, TypeScript, SQL, Claude Code, Cursor
- **Backend & Frontend:** FastAPI, Pydantic, .NET Core, Entity Framework, REST, GraphQL, Node.js, Angular, Next.js, micro-frontends
- **Databases:** PostgreSQL/pgvector, MySQL, DynamoDB, Redshift, Redis
- **Cloud & DevOps:** AWS (ECS, Lambda, Step Functions, CloudFormation, CloudWatch), GCP Cloud Run, Docker, GitHub Actions, OpenTelemetry, Playwright
- **Domain:** Auto finance & consumer lending (servicing, payments, collections, credit risk, compliance)

(Qodo, Endor Labs and JFrog Artifactory are left off the site to keep chips scannable.)

### Education

- University of the Cumberlands: Ph.D. in Artificial Intelligence (in progress), Aug 2026 – Present
- Georgia Institute of Technology: M.S. in Computer Science, Jan 2022 – Dec 2023
- University of Houston: Ph.D. in Physics, Aug 2016 – May 2022. *Research: algorithms to retrieve the phases of protein crystals from X-ray diffraction data.*
- Existing CUP entry: kept with its current text and dates.

## Visual system

- **Palette:** slate neutrals and **one indigo accent** for primary buttons, links and metric badges. No multi-color gradients. Hero: slate-50 background with a soft indigo radial glow (dark: slate-950 with the same glow).
- **Type:** Inter. Hero headline 56px desktop / 40px mobile, section titles 30px, lead 18px, body 16px. JetBrains Mono for metrics and code.
- **Layout:** content max width 1100px, uniform section padding (96px desktop / 64px mobile), cards with the same radius (`rounded-xl`) and a 1px border. Single column under 768px.
- **Metric badge:** mono-font pill, indigo-tinted background, e.g. `NDCG@10 0.417 → 0.581`.
- **Dark mode:** Tailwind `darkMode: 'class'`. Default follows `prefers-color-scheme`; the toggle overrides it and persists in `localStorage` (try/catch; falls back to system). Blog code blocks keep the existing dark Prism theme.
- **Motion:** sections fade in once on scroll; 👋 wave kept; both disabled under `prefers-reduced-motion`.
- **Blog list, blog post and 404 pages:** get the new palette, navbar, footer and dark mode; layouts unchanged.

## Architecture

```text
src/app/data/
  types.ts            Profile, Project, Metric, Experience, SkillGroup, Education, Certification
  profile.ts          name, headline, tagline, credentials, heroMetrics, links {linkedIn, github}
  projects.ts         Project[] (3)
  experience.ts       Experience[] (moved from work-exp.ts + new AI bullet)
  skills.ts           SkillGroup[]
  education.ts        Education[]
  certifications.ts   Certification[]
src/app/pages/home/
  home.component.*    composition only (~30 lines)
  sections/
    hero/ projects/ (+ project-card/) experience/ skills/ education/ writing/ about/ contact/
src/app/services/theme.service.ts   'light' | 'dark' signal; toggles <html class="dark">
```

- `src/app/models/url.constant.ts` is replaced by `profile.links`.
- Removed after migration: `pages/home/journey/` (its content moves to `education`, `experience` and `about`), the logo-wall markup, and unused images in `src/app/img/`.
- `index.html` gets an inline pre-paint script that applies the stored or system theme.
- `writing` reuses `BlogService.blogPosts` (no new data loading).

## SEO

- Home `<title>`: "Cheng — AI Engineer". Route title updated to match.
- `index.html` seo block: description *"Cheng is an AI engineer building LLM agents, hybrid retrieval, and model post-training — with measured results. Projects, experience, and writing."* og:title and og:description match.
- JSON-LD `Person` in `index.html`: `name: "Cheng"`, `jobTitle: "AI Engineer"`, `url`, `sameAs: [LinkedIn, GitHub]`. The postbuild SEO script keeps it on the home page only (removed from blog and post shells).

## Verification (no tests)

- `npm run build` exits 0 with no new warnings.
- Browser at 1280px and 375px, light and dark: every section renders, no horizontal scroll, all images load, all external links point to the URLs in this spec, and in-page nav anchors scroll to their sections. Screenshots shared with the user.
- Theme toggle persists across reloads; no flash of the wrong theme on load.
- One Lighthouse run against the built site: target ≥ 90 in Performance, Accessibility, Best Practices and SEO. Report actual scores.
- Privacy check: `grep -ri "yunpeng"` over `src/` and `dist/` finds nothing except the LinkedIn profile URL.

## Out of scope

Résumé PDF, contact form or email, a new blog layout, analytics, project detail pages, an og:image social card.

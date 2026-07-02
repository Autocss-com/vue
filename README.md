# AutoCSS demo — Vue data layer

A standard **Vite + Vue 3** instance (`<script setup>`) that renders its own
sample data inside the **remote [AutoCSS](https://autocss.com) UI scaffold**. It
is the Vue back-end reference for the AutoCSS remote-rendering demo: *have UI,
bring your own data — one UI, many back-ends.*

- **Data layer:** the app fetches `public/data/records.json` — the same JSON
  shape the AutoCSS UI consumes (`[{ id, title, intro, items: [] }]`) — and
  renders it as a table with loading/error states.
- **AutoCSS attach (styles):** the page includes the default AutoCSS Holy-Grail
  HTML scaffold and links the AutoCSS stylesheets remotely from
  `https://autocss.com`. The app's own content-level elements live inside
  `<article>`. (The AutoCSS JS runtime is **not** wired yet — styles only.)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs dist/ (base path /vue/)
```

## Deploy

On push to `main`, a GitHub Actions workflow builds and publishes `dist/` to
GitHub Pages: <https://autocss-com.github.io/vue/>

---

## Changes from the default scaffold

> Baseline = a fresh `npm create vite@latest -- --template vue` (Vite + Vue 3).
> This is the **complete** list of what had to change to render the app's own
> data and to drop it into the remote AutoCSS UI. Nothing else was modified, and
> **no third-party libraries were added** (no router, no Pinia).

### Data layer
- **Added `public/data/records.json`** — the sample dataset (AutoCSS contract shape).
- **Rewrote `src/App.vue`** — `<script setup>` with `ref`/`computed` and an
  `onMounted` `fetch` of `` `${import.meta.env.BASE_URL}data/records.json` ``,
  loading/error/ready states, and a `<table>` (columns from the item keys).
  `import.meta.env.BASE_URL` keeps the fetch path correct under the `/vue/`
  Pages subpath.

### AutoCSS scaffold + remote styles
- **`index.html`** — added the block of remote AutoCSS stylesheet `<link>`s
  (`https://autocss.com/assets/css/*.css`) in the same `@layer`-cascade order as
  `autocss/index.html` (`reset, fonts, color-scheme, color-theme-66ccff, layout,
  inputs, media, typography, scrolling, a11y, forms, fallbacks, loading`;
  `themes.css` + `transitions.css` left commented out to mirror the source).
- **`src/App.vue`** — the `<template>` renders the default AutoCSS Holy-Grail
  scaffold (`<app-container>` → `<app-banner>`, `<header>`, `<nav>`,
  `<main><article>`, `<aside>`, `<footer>`, trailing `<app-banner>`), with the
  data-driven content-level elements (`h1`, tagline, `h2`, intro, `<table>`)
  placed **inside `<article>`**.

### Vue-specific wiring (the gotchas)
- **`vite.config.js` — `isCustomElement` (required).** Wrapped the Vue plugin as
  `vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('app-') } } })`.
  Without it, Vue's template compiler treats `<app-container>`, `<app-logo>`,
  etc. as Vue components and emits `[Vue warn]: Failed to resolve component`
  errors; this makes Vue leave the `app-*` tags as native custom elements.
- **`src/style.css` — `#app { display: contents }`.** Vue mounts into
  `<div id="app">`; making that wrapper `display: contents` lets
  `<app-container>` be the Holy-Grail grid root that AutoCSS's `layout.css`
  styles.
- Static `checked` attributes on the "Layouts" checkbox and "System" radio work
  as-is in Vue templates.
- Glyphs (`☼ ☾ ◐ ✖`) are written as HTML entities in the template.

### Build / GitHub Pages
- **`vite.config.js`** — `base: '/vue/'` (matches the project Pages URL).
- **Added `.github/workflows/deploy.yml`** — `npm ci` → `vite build` → deploy
  `dist/` to Pages (triggers on push to `main`). Requires repo **Settings → Pages
  → Source = GitHub Actions**.

### Housekeeping
- Removed the Vite + Vue starter demo (`HelloWorld.vue`, `src/components/`,
  logos/assets, demo styles) and replaced `src/style.css` with a neutral base.
- `package.json` name → `autocss-vue-demo`.
- Appended a Node/Vite section to `.gitignore`.

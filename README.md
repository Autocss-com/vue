# AutoCSS demo — Vue data layer

A standard **Vite + Vue 3** app that renders its own data inside the remote
**[AutoCSS](https://autocss.com)** UI — *have UI, bring your own data.* The app
ships the data; AutoCSS (loaded from `https://autocss.com`) is the whole UI.

**Live:** <https://autocss-com.github.io/vue/>

## Run

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build   # → dist/
```

Pushing to `main` auto-builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`.

## Using AutoCSS in a Vue app

Starting from a stock `npm create vite` Vue app, the whole integration is just a
few small touches:

1. **Link the AutoCSS styles** — add the `https://autocss.com/assets/css/…`
   stylesheets to `index.html`.
2. **Make `<app-container>` the root** — put `<app-container></app-container>` in
   `index.html` and mount into it with `createApp(App).mount('app-container')`.
   `App.vue` renders the AutoCSS scaffold, with your content inside `<article>`.
3. **Allow the `app-*` custom elements** — one line in `vite.config.js`:
   `isCustomElement: (tag) => tag.startsWith('app-')`.
4. **Bring your data** — fetch it (here `public/data/records.json`) and render.

_(Full change history: [`progress/`](./progress).)_

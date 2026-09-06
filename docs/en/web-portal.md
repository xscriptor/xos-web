# Web Portal

The website is a **Next.js** application that also carries the package repository
(see below). Source lives in `app/`, `components/` and `lib/`.

## Stack

- **Next.js 16** with the App Router (`next ^16.2.9`), React 19, TypeScript (strict).
- **Tailwind CSS 4** (`@tailwindcss/postcss`) with `@tailwindcss/typography` for the
  markdown docs prose.
- **Framer Motion** for animations, **Three.js** with **@react-three/fiber** and
  **drei** for the `BlackHoleBackground` component.
- **next-themes** for dark/light theming, **lucide-react** for icons,
  **react-markdown** to render the docs page, **react-hook-form** for the
  developers/contact forms.
- Fonts: `Anonymous_Pro` loaded via `next/font/google` in `app/layout.tsx`.

## Source layout

| Path | Role |
|---|---|
| `app/layout.tsx` | Root layout: metadata, font, global styles, `Providers` + `Navbar`. |
| `app/page.tsx` | Home page (hero + feature sections). |
| `app/download/` | Download page (auto-triggered ISO download after 5s). |
| `app/docs/` | Documentation page rendered from a markdown string via `react-markdown`. |
| `app/developers/` | "Join the Revolution" page with a form. |
| `app/contact/` | Contact page with a form. |
| `components/BlackHoleBackground.tsx` | Three.js animated background. |
| `components/Navbar.tsx` | Dock-style navigation, theme toggle, language toggle. |
| `components/Providers.tsx` | Wraps the app in `ThemeProvider` + `I18nProvider`. |
| `lib/i18n.tsx` | Client-side translation dictionary and context. |
| `app/globals.css` | Global styles and Tailwind entry. |

## Static export configuration

`next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/x-repo',
  images: { unoptimized: true },
};
```

- `output: 'export'` produces a fully static site in `out/` — the deployment has no
  server runtime.
- `basePath: '/x-repo'` matches the GitHub Pages project path
  (`https://xlnux.github.io/x-repo/`). Static image references in the pages use the
  `/x-repo/images/...` prefix accordingly.
- Images are unoptimized because the static export cannot run the Next image
  optimizer.
- npm scripts (from `package.json`): `dev` (next dev), `build` (next build),
  `start` (next start), `lint` (next lint).

## Build and deployment to GitHub Pages

Deployment is handled by `.github/workflows/build.yml` ("Deploy Website to GitHub
Pages"). It is triggered **manually** (`workflow_dispatch`) after package changes are
merged.

```yaml
jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - actions/checkout@v4
      - actions/setup-node@v4          # node-version: "22"
      - npm ci && npm run build        # static export to ./out
      - test -f public/repo/x86_64/x.db          # sanity: repo db present
      - test -f public/repo/x86_64/x-release-*.pkg.tar.zst
      - actions/upload-pages-artifact@v3 (path: ./out)
      - actions/deploy-pages@v4
```

Workflow permissions: `pages: write`, `id-token: write` (Pages deployment), and a
`pages` concurrency group so only one Pages deployment runs at a time.

Important: the workflow **does not build packages**. Packages are built locally and
committed (see [publishing.md](publishing.md)); the workflow only rebuilds the website
and uploads `./out`.

## How the portal also serves the [x] pacman repo

A Next.js static export copies everything in `public/` into the build output
`out/` unchanged. Because the deploy artifact is `./out`, the committed binary
repository files are published alongside the website:

- `out/repo/x86_64/x.db`, `out/repo/x86_64/x-release-...pkg.tar.zst`, etc. map to
  `https://xlnux.github.io/x-repo/repo/x86_64/...`.
- The `[x]` pacman repo Server is therefore
  `https://xlnux.github.io/x-repo/repo/x86_64`.
- The native `.xp` endpoint under `public/x/x86_64/` is served the same way at
  `https://xlnux.github.io/x-repo/x/x86_64/` for `xpm`.
- `public/.nojekyll` signals GitHub Pages to serve the files raw (no Jekyll
  processing).

So a package publish is: rebuild the repo locally, commit the new files under
`public/`, then run the deploy workflow once to refresh the Pages site.

## i18n note: es mirrors en

Localization is client-side and dictionary based (`lib/i18n.tsx`), not route based:

- A single `Translations` type covers every user-facing string; the dictionary has an
  `en` and an `es` block.
- The default language is `en`. `I18nProvider` stores the current language in React
  state; the globe button in `Navbar` toggles between `en` and `es`.
- There is no separate `/es` route: the same pages re-render with the selected
  dictionary.
- Currently the **`es` block mirrors `en`** — both blocks contain the same strings
  (translations were frozen to English content; see the `i18n: portal content in
  English (es block mirrors en)` change). Any copy change must be applied to both
  blocks.
- The docs page is driven by the `t.docs.content` markdown string inside the same
  dictionary, rendered with `react-markdown`, so the long-form docs also come in
  English only for now.

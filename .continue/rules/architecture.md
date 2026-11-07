---
name: 898.coffee Architecture
description: Tech stack, file structure, routing/state patterns, commands, and coding standards for 898.coffee. Read before making structural changes, adding files, or running project commands.
alwaysApply: true
---

# 898.coffee — Architecture Map

> Mobile-first digital menu for a local coffee shop (Eight Nine Eight), built as a Vite + React 19 SPA with a PHP dev-only API backend. App shell is in `src/`; backend stub lives in `api/`.

## Tech Stack

- **Languages/Runtimes:** TypeScript ~7.0.2, Node ≥20.19.0, PHP (dev server only — `api/` dir, no files committed yet)
- **Frameworks/Libraries:** React 19.3.1, react-dom 19.3.1, wouter 3.13.0 (routing), react-aria-components 1.22.1, `useSyncExternalStore` (i18n/state — zero extra libs)
- **Build/Tooling:** Vite 8.3.6, `@tailwindcss/vite` 4.3.4 (CSS-in-JS-free; config lives in `src/index.css` `@theme`), `@vitejs/plugin-react` 6.1.2, `@rolldown/plugin-babel` + `babel-plugin-react-compiler` 1.0.0, oxlint 1.90.0, Prettier 3.5.0 + `prettier-plugin-tailwindcss`
- **Data:** No DB connected yet. `api/` placeholder only. Frontend data: Not detected (no `src/data.*` committed).
- **Dev Server / Proxy / Ports:** Vite :5173 (default) proxies `/api/*` → `http://localhost:8000` (strips `/api` prefix). PHP dev server: `php -S localhost:8000 -t api`. Evidence: `vite.config.ts`
- **Env vars (names only):** None detected in committed files.

## Commands

| Task                | Command                                                            |
| ------------------- | ------------------------------------------------------------------ |
| Install             | `npm install`                                                      |
| Dev (UI + API)      | `npm run dev` (concurrently starts PHP on :8000 and Vite on :5173) |
| Build               | `npm run build` (`tsc -b && vite build`)                           |
| Preview             | `npm run preview`                                                  |
| Lint                | `npm run lint` (`oxlint`)                                          |
| Format              | `npm run format` (`prettier --write .`)                            |
| Test (all / single) | Not detected                                                       |
| Migrate             | Not detected                                                       |

## Architecture Patterns

- **Routing:** wouter `Switch`/`Route`, wrapped in `src/shared/router/index.tsx`. All valid routes declared as the `ROUTES` const object in `src/shared/router/data.ts` (`landing: "/"`, `menu: "/menu"`, `review: "/review"`). To add a route: add key+path to `ROUTES`, register a `<Route>` in `App.tsx` using the wrapped `<Route>` export, and add a `<Link href={ROUTES.newKey}>` where needed. Never pass raw string paths to `<Link>` — use `ROUTES.*`.
- **State / Data flow:** No global state library. Language/locale state uses a hand-rolled pub/sub singleton (`src/shared/i18n/engine.ts`) consumed via React's `useSyncExternalStore` in `src/shared/i18n/index.ts`. Components call `useLocale()` or `useStrings(table)` to read; call `setLocale(locale)` to write. Locale is persisted to `localStorage` under key `PrefLang:locale` and reflected onto `document.documentElement.lang/dir`.
- **Layering:** `src/shared/` contains only cross-cutting primitives (i18n, icons, router). Feature UI (pages, components) must import from `src/shared/*` via the `@` alias (`@/shared/…`), never import engine internals directly.

## File Structure

| Path                 | Purpose                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `src/shared/i18n/`   | i18n engine: `data.ts` (types + storage key), `engine.ts` (pub/sub singleton), `index.ts` (React hooks + public API)                      |
| `src/shared/icons/`  | Icon system: `data.ts` (SVG path map + RTL flip set), `index.tsx` (`<Icon>` component)                                                    |
| `src/shared/router/` | Router layer: `data.ts` (typed `ROUTES` const), `index.tsx` (typed `<Link>`, `<Route>`, `<Switch>`, `ScrollToTop`)                        |
| `src/assets/`        | Static brand assets: `logo.svg`, `mark.svg`                                                                                               |
| `src/App.tsx`        | App shell / route declarations (currently stub `return null`)                                                                             |
| `src/main.tsx`       | Entry point: mounts `<App>` into `#root`, imports Cairo font + `index.css`                                                                |
| `src/index.css`      | Tailwind v4 `@theme` block (all design tokens: colors, fonts, radii, shadows, easings, keyframes), global base styles, `@utility` helpers |
| `api/`               | PHP dev server root (`php -S localhost:8000 -t api`). No files committed.                                                                 |
| `public/`            | Static assets served by Vite: favicons only                                                                                               |

**Entry points:** `index.html` → `src/main.tsx` → `src/App.tsx`; PHP API: `api/` (dir root)

**Where to add things:**

- New route → add to `ROUTES` in `src/shared/router/data.ts`, register `<Route>` in `src/App.tsx`
- New icon → add SVG path to `PATHS` in `src/shared/icons/data.ts`; if needs RTL flip, add name to `FLIP_IN_RTL` set
- New locale string → define a `Localized<T>` object (typed as `Record<"en"|"ar", T>`) co-located with the component, pass to `useStrings()`
- New design token → add to `@theme {}` in `src/index.css`
- New PHP API endpoint → create file in `api/`; it will be accessible at `/api/<filename>` from the frontend

**Do not edit:** `dist/`, `node_modules/`, `package-lock.json`

## Coding Standards

1. **Always import routes via `ROUTES.*` from `@/shared/router`; never use raw string literals for navigation paths.** Evidence: `src/shared/router/data.ts`, `src/shared/router/index.tsx`
2. **Always define bilingual strings as `Localized<T>` (i.e., `{ en: T; ar: T }`) objects and read them via `useStrings(table)` or `useLocale()`; never branch on locale with `if/else` in render.** Evidence: `src/shared/i18n/data.ts`, `src/shared/i18n/index.ts`
3. **Always use the `<Icon name="…">` component for all icons; never inline SVG paths in feature files.** Evidence: `src/shared/icons/index.tsx`, `src/shared/icons/data.ts`
4. **Use the `@` alias for all cross-directory imports** (`@/shared/…`); relative `../` imports are not prohibited but `@` is the established pattern for `src/`-rooted paths. Evidence: `vite.config.ts` (`resolve.alias["@"]`), `tsconfig.app.json` (`paths["@/*"]`)
5. **Tailwind v4 utility classes only — no arbitrary `style={}` props for values covered by `@theme` tokens.** All custom tokens (colors, fonts, radii, easings, animations) are declared in `src/index.css` `@theme {}` and consumed as Tailwind classes. Evidence: `src/index.css`
6. **TypeScript strict mode is on with `noUnusedLocals`, `noUnusedParameters`, and `noUncheckedIndexedAccess`; use `verbatimModuleSyntax` (`import type` for type-only imports).** Evidence: `tsconfig.app.json`

## Agent Behavior

- Before editing, open the nearest existing file of the same type and mirror its patterns.
- Use directory listing and file-reading tools to confirm paths; do not invent files, imports, or APIs.
- Prefer the minimal diff. Do not add dependencies or refactor unrelated code unless asked.
- Run `npm run lint` and `npm run format` after changes when able.
- If this file conflicts with the code you see, report the discrepancy.

## Unknowns

- `api/` directory has no committed PHP files; the backend is not yet implemented. All `/api/*` proxy routes are unverifiable.
- `src/App.tsx` is a stub (`return null`); no pages or routes are wired up yet — the ROUTES const (`landing`, `menu`, `review`) reflects intended structure, not implemented pages.
- No test framework detected (`npm run test` not defined).
- No CI configuration detected (no `.github/workflows/`).
- No `.env.example` detected; runtime environment variables unknown.

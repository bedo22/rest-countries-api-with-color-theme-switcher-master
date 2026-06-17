# Plan: REST Countries API — Next.js + Tailwind

## Decisions

- **Framework:** Next.js with the App Router
- **Bundler:** built-in Next.js tooling, SWC + Turbopack
- **CSS:** Tailwind CSS + CSS custom properties for exact theme colours
- **Component library:** none; no shadcn/ui
- **Data:** static import of `data.json` in a Server Component
- **Theme:** `next-themes`, system preference by default, persisted with `localStorage`
- **Search/filter state:** URL search params, e.g. `?query=...&region=...`
- **Routing:** home page at `/`; detail page at `/country/[alpha3Code]`
- **Search scope:** `name`, `nativeName`, and `altSpellings`
- **Flag images:** `next/image` with `remotePatterns` for `flagcdn.com`
- **Breakpoints:** Tailwind default breakpoints
- **Region filter:** hardcoded standard regions + All
- **Filter logic:** AND when search and region are both active
- **Back navigation:** `router.back()` with fallback to `/`
- **Header:** elevated header with subtle border and shadow, global theme toggle
- **Detail layout:** desktop two-column, image left and info right; mobile stacked
- **Border countries:** clickable chips with a fallback message when none exist
- **TypeScript:** full project in TypeScript
- **Icons:** `lucide-react`

## File structure

```
app/
  layout.tsx          # root layout, ThemeProvider, Header
  page.tsx            # home page
  globals.css          # Tailwind + CSS variables
  data/
    data.json          # country data
components/
  Header.tsx
  ThemeToggle.tsx
  FilterBar.tsx
  CountryGrid.tsx
  CountryCard.tsx
  BorderChips.tsx
  BackButton.tsx
lib/
  countries.ts         # filtering, lookup, formatting helpers
  regions.ts           # hardcoded region options
next.config.ts
tailwind.config.ts
tsconfig.json
```

## Implementation order

1. Scaffold Next.js with TypeScript and Tailwind
2. Configure `next.config.ts` for `next/image` remote patterns
3. Add `next-themes` provider in `app/layout.tsx`
4. Define light/dark CSS variables in `app/globals.css`
5. Add the header component with elevated styling and theme toggle
6. Move/copy `data.json` into `app/data/data.json`
7. Implement the home page:
   - Server Component imports data
   - Client component handles search and region filtering
   - Search uses `name`, `nativeName`, and `altSpellings`
   - Filter logic combines search + region with AND
   - Results render as a responsive grid of country cards
8. Implement the detail page:
   - Server Component imports data and finds the country by `alpha3Code`
   - Desktop layout is two-column
   - Mobile layout is stacked
   - Use `next/image` for the flag
   - Render population, region, subregion, capital, top-level domain, currencies, languages, and native name
9. Add border-country chips that link to `/country/[alpha3Code]`
10. Add empty states:
   - no search/filter results
   - no border countries
   - country not found fallback
11. Polish spacing, shadows, typography, and transitions

## Assumptions

- The project will be deployed to a static-friendly host such as Vercel
- The design will be matched using Tailwind's default breakpoints
- No custom icon font is needed because `lucide-react` supplies the icon set
- The root data file will be copied into the app folder before implementation starts

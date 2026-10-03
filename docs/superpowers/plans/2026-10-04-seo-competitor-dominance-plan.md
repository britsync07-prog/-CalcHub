# SEO & Competitor Dominance Implementation Plan

- **Goal:** Transform Everyday Calculator Hub (`https://everyday-calculator-hub-cw8.pages.dev`) into a Google-dominating utility by matching and exceeding `everydaycalchub.com` with static pre-rendered HTML (SSG), 3 missing tools (reaching 55 calculators), 10 in-depth blog guides, and viral backlink embed features.
- **Spec Reference:** `docs/superpowers/specs/2026-10-04-seo-competitor-dominance-design.md`
- **Status:** Ready to execute

---

## Phase 1: Implement 3 Missing Rival Calculators & Tool Parity

### Step 1.1: Add Calculator Definitions in `src/data/calculators.ts`
- Add `oven-temperature-converter` under `food-kitchen` with complete formula, presets (300°F, 350°F, 375°F, 400°F, 450°F), Gas Mark reference table, and FAQ.
- Add `fuel-cost-calculator` under `transport-time` with distance, fuel economy (MPG US/UK, L/100km), fuel price, passenger split, and vehicle presets.
- Add `time-zone-planner` under `transport-time` with multi-city comparison, 24-hour overlap matrix, and business hour overlap logic.

### Step 1.2: Implement Interactive Calculator Views
- In `src/components/calculators/ConverterViews.tsx`:
  - Build `OvenTemperatureConverterView` with instant bidirectional reactive calculations between °F, °C, Gas Mark, and Fan Oven temperature.
- In `src/components/calculators/EverydayViews.tsx` or `DateTimeViews.tsx`:
  - Build `FuelCostCalculatorView` with reactive breakdown of total fuel, total cost, cost per passenger, and cost per mile/km.
  - Build `TimeZonePlannerView` with visual color-coded 24h timeline (Green for 9am-5pm business hours, Yellow for evening, Gray for night) and best meeting window finder.

### Step 1.3: Wire Up Dispatcher & Test Parity
- Register the new views in `src/components/CalculatorDispatcher.tsx`.
- Run `npm run lint` and verify types.

---

## Phase 2: Authoritative Blog & Guides Hub (Topical Authority Engine)

### Step 2.1: Create Guide Content Data (`src/data/guides.ts`)
- Author 10 comprehensive, high-quality guides (1,000+ words each) exceeding the rival's 300-word articles:
  1. `ultimate-tipping-guide`
  2. `kitchen-measurement-conversions`
  3. `oven-temperatures-convection-gas-mark`
  4. `home-renovation-materials-guide`
  5. `splitting-bills-fairly`
  6. `true-commute-cost-calculation`
  7. `chronological-age-time-difference`
  8. `global-remote-meeting-scheduling`
  9. `personal-budgeting-percentages`
  10. `concrete-mulch-landscaping-materials`
- Each guide includes:
  - Title, meta description, publish date, author, category, read time.
  - Structured content sections with H2, H3, mathematical formulas, quick cheat sheets, and FAQs.
  - Related calculator slugs for direct interactive callouts.

### Step 2.2: Build Blog Hub and Article Pages
- Create `src/pages/BlogHubPage.tsx` (`/blog`) with grid layout, category filtering, search, and reading times.
- Create `src/pages/BlogPostPage.tsx` (`/blog/:slug`) with breadcrumbs, article header, markdown/structured body, interactive calculator CTA widget, FAQ accordions, and related guides.

### Step 2.3: Wire Blog Routing and Navigation
- Update `src/App.tsx` to handle `/blog` and `/blog/:slug`.
- Add "Guides" / "Blog" link in `src/components/Header.tsx` and `src/components/Footer.tsx`.

---

## Phase 3: Viral Backlink Engine & Engagement Features

### Step 3.1: "Embed This Calculator" Generator Modal
- Create `src/components/EmbedCalculatorModal.tsx`.
- Generates a clean `<iframe src="...">` embed code snippet with attribution:
  `Powered by <a href="https://everyday-calculator-hub-cw8.pages.dev/calculators/:slug">Everyday Calculator Hub</a>`.
- Add an "Embed" button to `src/components/CalculatorLayout.tsx`.
- Support `?embed=true` URL mode in `App.tsx` (hides header/footer for seamless iframe display).

### Step 3.2: Shareable Calculation State & Copy Link
- Add query parameter hydration in calculators so URLs like `?amount=120&tip=18&split=4` automatically populate input fields.
- Add a "Share Calculation" button with toast notification copying the deep link to the clipboard.

### Step 3.3: Print Stylesheet
- Update `src/index.css` with `@media print` rules hiding ads, headers, nav, and styling the calculator result as a clean branded printable summary.

---

## Phase 4: Static Pre-Rendering Pipeline (SSG) & Production Readiness

### Step 4.1: Develop the SSG Pre-render Script (`scripts/prerender.ts`)
- Use `react-dom/server`'s `renderToString` to crawl and pre-render:
  - `/` (Homepage)
  - `/all-calculators`
  - All 55 `/calculators/:slug`
  - All 6 `/category/:slug`
  - `/blog` and all 10 `/blog/:slug`
  - Trust pages (`/about`, `/privacy`, `/terms`, `/contact`, `/editorial-policy`)
  - `/sitemap`
- For each page, generate a static `index.html` file in `dist/` with:
  - Full pre-rendered DOM.
  - Specific `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph, Twitter tags.
  - Full JSON-LD microdata (`SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `BlogPosting`).

### Step 4.2: Update Build Config & Indexation Files
- Add `"build:ssg": "vite build && tsx scripts/prerender.ts"` to `package.json`.
- Regenerate `public/sitemap.xml` with all 75+ static URLs, priorities, and change frequencies.
- Update `public/robots.txt` and `public/llms.txt`.

### Step 4.3: Build, Verify, and Commit
- Execute `npm run build:ssg`.
- Verify the generated files in `dist/` to confirm raw HTML contains full content without JavaScript.
- Run `npm run lint`.
- Commit all changes to git.

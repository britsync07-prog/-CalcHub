# SEO & Competitor Dominance Design Specification

- **Project:** Everyday Calculator Hub (`https://everyday-calculator-hub-cw8.pages.dev`)
- **Primary Rival:** EverydayCalc Hub (`https://everydaycalchub.com`)
- **Goal:** Achieve top organic rankings on Google for high-intent everyday calculator and converter queries by eliminating the rival's technical advantages, achieving tool parity, and dominating with content and backlinks.
- **Date:** 2026-10-04
- **Status:** Approved

---

## 1. Competitive Intelligence & Strategy

### 1.1 Competitor Assessment (`everydaycalchub.com`)
* **Strengths:**
  - Built with Next.js App Router using Server-Side Generation (SSG/SSR), meaning Googlebot receives fully-rendered semantic HTML with headers, copy, FAQs, and JSON-LD in the raw response.
  - Possesses an editorial `/blog` with 10 articles targeting informational search intent.
  - Has 3 specific tools that our library currently lacks: `oven-temperature-converter`, `fuel-cost-calculator`, and `time-zone-planner`.
* **Weaknesses:**
  - Extremely limited calculator library (only 12 tools total).
  - Shallow blog content (averaging only 300 words per article).
  - Repeated title tags (`... | EverydayCalc Hub | EverydayCalc Hub`).
  - Lacks rich interactive calculation presets, cheat sheets, comparison matrixes, and embeddable backlink widgets.

### 1.2 Our Winning Edge
* We have **52+ calculators** across 6 categories (Math, Finance, Time, Converters, Home Improvement, Health).
* By adding the 3 missing tools, we reach **55 calculators** (over 4.5x the rival's breadth).
* By introducing static pre-rendering (SSG), Googlebot receives 100% crawlable raw HTML across all 55 tools, 6 categories, and 10+ in-depth guides.
* By adding an "Embed this Calculator" widget and shareable URL query states, we create an organic backlink and referral engine.

---

## 2. Technical Architecture & SSG Pre-Rendering

### 2.1 The Static Pre-Rendering Pipeline (`scripts/prerender.ts`)
* **Engine:** Built with Node.js and `react-dom/server`'s `renderToString`.
* **Execution:** Runs as a post-build step (`npm run build && tsx scripts/prerender.ts`).
* **Route Extraction:**
  - Homepage (`/`)
  - All 55 Calculators (`/calculators/:slug`)
  - All 6 Category Pages (`/category/:slug`)
  - Full Directory (`/all-calculators`)
  - All 10 Blog Guides (`/blog/:slug`)
  - Trust Pages (`/about`, `/privacy`, `/terms`, `/contact`, `/editorial-policy`)
  - HTML Sitemap (`/sitemap`)
* **Output Structure:**
  Generates static HTML files (e.g., `dist/calculators/tip-calculator/index.html`).
* **Payload Contents in Raw HTML:**
  - Rendered DOM tree inside `<div id="root">`.
  - Route-specific `<title>`, `<meta name="description">`, and `<link rel="canonical" href="...">`.
  - OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card tags.
  - Complete JSON-LD microdata (`SoftwareApplication`, `FAQPage`, `BreadcrumbList`, `BlogPosting`).
* **Hydration:**
  When a browser loads the page, React 19 hydrates the existing DOM without layout shifts (CLS = 0).

### 2.2 Structured Data (Schema.org)
* **Calculator Pages:**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  ```
  Plus `FAQPage` schema mapping all questions and answers, and `BreadcrumbList` schema.
* **Blog / Guide Pages:**
  `BlogPosting` schema with headline, wordCount, published date, author, and `HowTo` steps.

---

## 3. Tool Parity: The 3 Missing Calculators

### 3.1 Oven Temperature Converter (`/calculators/oven-temperature-converter`)
* **Category:** `food-kitchen`
* **Features:**
  - Bidirectional conversion: Fahrenheit (°F), Celsius (°C), Gas Mark (1/4 to 10), and Convection / Fan-assisted.
  - Convection adjustment logic (auto-deduct 20°C / 25°F).
  - Quick presets: 300°F Slow Bake, 350°F Baking, 375°F Roasting, 400°F Pastry, 450°F High Heat.
  - Reference comparison table: Gas Mark vs Electric vs Fan vs Fahrenheit.

### 3.2 Fuel Cost Calculator (`/calculators/fuel-cost-calculator`)
* **Category:** `transport-time`
* **Features:**
  - Inputs: Trip distance (miles or km), fuel economy (US MPG, UK MPG, L/100km), fuel price per unit, passenger split count, round-trip toggle.
  - Outputs: Total fuel needed, total cost, cost per passenger, cost per distance unit.
  - Quick vehicle economy presets: Compact (36 MPG), Midsize Sedan (30 MPG), SUV (22 MPG), Truck (17 MPG), Hybrid (52 MPG).

### 3.3 Time Zone Planner (`/calculators/time-zone-planner`)
* **Category:** `transport-time`
* **Features:**
  - Multi-city comparison (New York, London, Tokyo, Sydney, San Francisco, Paris, Dubai, etc.).
  - 24-hour visual overlap matrix color-coded for working hours (9 AM–5 PM), evening hours, and overnight.
  - Optimal overlapping meeting window finder.

---

## 4. Topical Authority: Blog & Guides Engine

### 4.1 Route & Layout
* **Hub Page:** `/blog` — Index of all editorial guides, filtered by topic, with estimated read times and author credentials.
* **Article Pages:** `/blog/:slug` — Clean typography, table of contents, step-by-step formula breakdown, comparison cheat-sheets, and an embedded interactive calculator card linking directly to the tool.

### 4.2 The 10 In-Depth Guides (1,000+ words each)
1. `ultimate-tipping-guide`: Standard tipping percentages, service etiquette, international customs, and bill splitting rules.
2. `kitchen-measurement-conversions`: Complete volume-to-weight reference, dry vs liquid cups, tablespoons to grams.
3. `oven-temperatures-convection-gas-mark`: Converting recipes for fan-assisted ovens and understanding gas marks.
4. `home-renovation-materials-guide`: Step-by-step calculations for square footage, paint coverage, tile waste, and laminate flooring.
5. `splitting-bills-fairly`: Modern etiquette for group dining, itemized checks, tax, and shared delivery costs.
6. `true-commute-cost-calculation`: Gas, depreciation, tolls, and the financial impact of daily driving.
7. `chronological-age-time-difference`: Measuring exact age, days lived, leap years, and business day calculations.
8. `global-remote-meeting-scheduling`: Coordinating teams across UTC, EST, GMT, JST, and AEST without friction.
9. `personal-budgeting-percentages`: Implementing the 50/30/20 rule and converting hourly wages to annual income.
10. `concrete-mulch-landscaping-materials`: Cubic yard formulas for slabs, footings, flower beds, and bulk materials.

---

## 5. Backlink Engine & Engagement Features

### 5.1 "Embed This Calculator" Generator
* Modal available on every calculator providing an `<iframe src="https://everyday-calculator-hub-cw8.pages.dev/calculators/:slug?embed=true" width="100%" height="480" frameborder="0"></iframe>`.
* Clean fallback anchor: `Powered by <a href="https://everyday-calculator-hub-cw8.pages.dev/calculators/:slug" target="_blank">Everyday Calculator Hub</a>`.
* Embed route mode that strips headers and footers to fit neatly into third-party articles.

### 5.2 Shareable Calculation URL States
* URL query parameter synchronization (e.g. `?amount=150&tip=20&split=4`).
* "Copy Share Link" button with toast notification so users can share exact results with friends or clients.

### 5.3 Print & PDF Friendly Stylesheet
* Clean `@media print` CSS hiding navigation, buttons, and ads, formatting the calculation into a clean receipt/report.

---

## 6. Implementation Verification Criteria
1. `npm run build` followed by `npm run build:ssg` succeeds without errors.
2. `dist/` contains static `.html` files for `/`, all 55 calculators, 6 categories, and 10 blog guides.
3. Inspecting the generated raw `.html` files confirms `<title>`, `<meta description>`, JSON-LD schemas, and rendered HTML body content are present before JavaScript execution.
4. All 3 new calculators function reactively with unit conversions and edge cases handled.
5. `/blog` and all 10 articles render with typography, metadata, and internal links.
6. Shareable URLs populate inputs properly on load.
7. Embed generator produces valid iframe markup with backlink attribution.

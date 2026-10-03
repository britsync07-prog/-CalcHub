# Everyday Calculator Hub

A fast, responsive, and technical SEO-optimized online utility platform providing 50+ free everyday calculators, unit converters, and math solvers. Built for organic search acquisition across Tier-1 English-speaking markets (United States, Canada, United Kingdom, Australia, New Zealand) and monetized through display advertising without compromising user experience.

---

## Key Features

1. **50+ Complete, Production-Ready Calculators:**
   - **Everyday & Money:** Percentage, Percent Change, Percent Difference, Discount, Sales Tax, Tip & Split Bill, Profit Margin, Markup, Commission, Simple Interest, Compound Interest, Hourly to Salary, Salary to Hourly.
   - **Date & Time:** Days Between Dates, Date Difference, Days From Today, Chronological Age, Business Working Days, Time Duration, Live Holiday Countdowns, Week Number.
   - **Math & Statistics:** Scientific & Basic Keypad Calculator, Fraction Solver, Decimal to Fraction, Ratio & Proportion, Square Roots, Exponents, LCM & GCD, Mean/Median/Mode, Standard Deviation, Prime Numbers.
   - **Unit Converters:** Length, Weight & Mass, Temperature, Area, Volume, Speed, Data Storage, Pressure, Fuel Economy.
   - **Home & DIY:** Square Footage (Multi-Room), Room Paint Gallons, Flooring Boxes (with 10% waste), Tile Estimator, Concrete Slab & Footings, Mulch & Gravel.
   - **Everyday Pace & Fitness:** Running Pace, Walking Steps to Distance & Calories, Daily Water Intake, Adult BMI Reference.

2. **Technical SEO Architecture:**
   - Semantic HTML5, canonical URLs, and dynamic metadata per route.
   - Schema.org JSON-LD structured data (`WebApplication`, `FAQPage`, `BreadcrumbList`).
   - Clean URLs (`/calculators/:slug`, `/category/:slug`, `/percentage/:slug`).
   - Valid `/public/sitemap.xml` and `/public/robots.txt`.
   - Comprehensive HTML Sitemap (`/sitemap`).

3. **Ad-Safe Zero CLS (Cumulative Layout Shift):**
   - Reusable `AdSlot` components with explicit, pre-allocated CSS dimensions.
   - Clean regulatory compliance labeling ("ADVERTISEMENT").
   - Integrated "Ad Preview" mode allowing webmasters to preview placeholder banners or test display networks without layout shifts.

4. **Tier-1 English Market Localization:**
   - Global locale toggle supporting:
     - **United States (US):** USD ($), Imperial (feet, miles, gallons, lbs), MM/DD/YYYY.
     - **Canada (CA):** CAD (CA$), Metric/Mixed, DD/MM/YYYY.
     - **United Kingdom (UK):** GBP (£), Metric & Imperial, DD/MM/YYYY.
     - **Australia & NZ (AU):** AUD (A$), Metric, DD/MM/YYYY.

5. **Repeat Usage & UX Utilities:**
   - Live responsive calculations with zero latency.
   - Quick "Copy Result" and "Share URL" buttons.
   - Client-side calculation history drawer powered by HTML5 `localStorage`.
   - Accessible keyboard search modal (`/` shortcut).

---

## Project Structure

```text
/
├── public/
│   ├── robots.txt              # Crawler permissions & sitemap declaration
│   └── sitemap.xml             # Canonical XML sitemap for search engines
├── src/
│   ├── types/
│   │   └── calculator.ts       # TypeScript interfaces for calculators & schemas
│   ├── data/
│   │   ├── calculators.ts      # 50+ calculator definitions, formulas, worked examples & FAQs
│   │   ├── categories.ts       # Category taxonomy & pillar metadata
│   │   └── programmaticPages.ts# High-intent long-tail calculation templates
│   ├── utils/
│   │   ├── seo.ts              # Dynamic title, OpenGraph & JSON-LD schema injection
│   │   ├── formatters.ts       # Locale-aware currency, number & date formatters
│   │   └── history.ts          # LocalStorage calculation history manager
│   ├── components/
│   │   ├── AdSlot.tsx          # Zero-CLS advertisement container
│   │   ├── Breadcrumbs.tsx     # Semantic unboxed breadcrumb navigation
│   │   ├── Header.tsx          # 3-Zone top navigation with search & locale switcher
│   │   ├── Footer.tsx          # Comprehensive footer with links & trust pages
│   │   ├── SearchBar.tsx       # Live keyboard-accessible modal search
│   │   ├── CalculationHistoryDrawer.tsx # Drawer displaying recent calculations
│   │   ├── CalculatorLayout.tsx# Master reusable SEO page layout
│   │   ├── CalculatorDispatcher.tsx # Component factory dispatching calculations
│   │   └── calculators/
│   │       ├── EverydayViews.tsx       # Finance & money calculators
│   │       ├── DateTimeViews.tsx       # Dates, age, countdown & time duration
│   │       ├── MathViews.tsx           # Scientific keypad, fractions, ratios, stats
│   │       ├── ConverterViews.tsx      # Unit converter engines
│   │       ├── HomeImprovementViews.tsx# Flooring, paint, square footage & concrete
│   │       └── HealthFitnessViews.tsx  # Pacing, steps & hydration utilities
│   ├── pages/
│   │   ├── HomePage.tsx                # Traffic-optimized homepage
│   │   ├── CalculatorDetailPage.tsx    # Single calculator view with SEO metadata
│   │   ├── CategoryPage.tsx            # Topic cluster pillar page
│   │   ├── AllCalculatorsPage.tsx      # Filterable complete directory
│   │   ├── ProgrammaticCalculatorPage.tsx # Specific problem-solver landing page
│   │   ├── TrustPages.tsx              # About, Contact, Privacy, Terms, Disclaimer
│   │   ├── HtmlSitemapPage.tsx         # HTML index for crawlers & users
│   │   └── SeoStrategyPage.tsx         # In-app interactive SEO & growth roadmap
│   ├── App.tsx                         # Router and root application
│   ├── main.tsx                        # Application mount
│   └── index.css                       # Tailwind CSS styling
├── SEO_STRATEGY.md                     # Detailed 6-month organic growth roadmap
├── metadata.json                       # Applet configuration
├── package.json
└── vite.config.ts
```

---

## Development & Build Commands

- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Typecheck & Lint:**
  ```bash
  npm run lint
  ```
- **Build Production Bundle:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

---

## Search Engine Console & Analytics Setup

To configure Google Search Console, Google Analytics, or AdSense:
1. In `index.html`, replace or add your verification meta tag:
   ```html
   <meta name="google-site-verification" content="YOUR_GSC_VERIFICATION_TOKEN" />
   ```
2. For Google Analytics (GA4), place your Google tag script into `<head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
3. For Google AdSense, paste your publisher tag script in `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```

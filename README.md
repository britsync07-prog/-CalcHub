# Everyday Calculator Hub

A fast, responsive, and technical SEO-optimized online utility platform providing 55+ free everyday calculators, unit converters, and math solvers. Built for organic search acquisition across Tier-1 English-speaking markets (United States, Canada, United Kingdom, Australia, New Zealand) and monetized through display advertising without compromising user experience.

## What it is

Everyday Calculator Hub is an open-source, comprehensive suite of web-based calculators and conversion tools. It encompasses everything from finance and everyday math to health, fitness, and home improvement calculators. Designed with a clean, responsive UI and an ad-safe zero Cumulative Layout Shift (CLS) approach, it ensures a seamless user experience across all devices.

## Why I built it

I built Everyday Calculator Hub to create a highly optimized, user-centric utility platform that outperforms existing solutions in both technical performance and feature completeness. The primary goal was to dominate organic search rankings for high-intent everyday calculator queries by addressing the technical and content shortcomings of competitors (like `everydaycalchub.com`). I wanted to build a tool that not only serves users with lightning-fast, accurate calculations but also serves as a robust example of a modern, SEO-first React application utilizing Static Site Generation (SSG).

## Challenges & Solutions

While building this platform, I faced several technical challenges, particularly when trying to outrank established competitors who leveraged Server-Side Generation (SSG) to deliver fully rendered HTML to search engine bots. Here is how I tackled them:

### 1. Overcoming the Competitor's SSG Advantage
**Problem:** The primary competitor used Next.js App Router with SSG, meaning search engines received fully-rendered semantic HTML with headers, copy, FAQs, and JSON-LD schema immediately. A standard Single Page Application (SPA) React build would require search engines to execute JavaScript before seeing the content, putting us at a massive SEO disadvantage.
**Solution:** I implemented a custom Static Pre-Rendering Pipeline (`scripts/prerender.ts`) using Node.js and `react-dom/server`'s `renderToString`. This post-build step crawls every route (homepage, all 55 calculators, categories, and blog guides) and generates static `.html` files containing the full DOM, metadata, and JSON-LD schema. When a user visits, React 19 hydrates the page seamlessly with zero layout shift.

### 2. Achieving Tool Parity and Dominance
**Problem:** The competitor had specific tools (like `oven-temperature-converter`, `fuel-cost-calculator`, and `time-zone-planner`) that our initial library lacked, giving them an edge in those specific niches.
**Solution:** I didn't just match their tools; I exceeded them. I added the missing tools, bringing our total to 55+ calculators (over 4.5x the rival's breadth). Our versions include richer interactive presets, comparison matrixes, and bidirectional reactive calculations, providing a superior user experience.

### 3. Building Topical Authority
**Problem:** To rank high, the site needed to be seen as an authority, which requires deep, informative content, not just tools. The competitor had shallow blog content.
**Solution:** I developed an Authoritative Blog & Guides Hub (`/blog`). I authored comprehensive, 1,000+ word guides that include step-by-step formulas, cheat sheets, FAQs, and interactive calculator callout widgets. This builds topical authority and captures long-tail informational search queries.

### 4. Creating a Viral Backlink Engine
**Problem:** Acquiring high-quality backlinks organically is difficult but essential for SEO dominance.
**Solution:** I built an "Embed This Calculator" generator modal. It provides a clean `<iframe>` snippet that other websites can easily embed, complete with a backlink attribution. Additionally, I implemented shareable URL query states (`?amount=150&tip=20&split=4`), allowing users to share exact calculation results effortlessly.

---

## Key Features

1. **55+ Complete, Production-Ready Calculators:**
   - **Everyday & Money:** Percentage, Percent Change, Percent Difference, Discount, Sales Tax, Tip & Split Bill, Profit Margin, Markup, Commission, Simple Interest, Compound Interest, Hourly to Salary, Salary to Hourly.
   - **Date & Time:** Days Between Dates, Date Difference, Days From Today, Chronological Age, Business Working Days, Time Duration, Live Holiday Countdowns, Week Number, Time Zone Planner.
   - **Math & Statistics:** Scientific & Basic Keypad Calculator, Fraction Solver, Decimal to Fraction, Ratio & Proportion, Square Roots, Exponents, LCM & GCD, Mean/Median/Mode, Standard Deviation, Prime Numbers.
   - **Unit Converters:** Length, Weight & Mass, Temperature, Area, Volume, Speed, Data Storage, Pressure, Fuel Economy, Oven Temperature Converter.
   - **Home & DIY:** Square Footage (Multi-Room), Room Paint Gallons, Flooring Boxes (with 10% waste), Tile Estimator, Concrete Slab & Footings, Mulch & Gravel.
   - **Everyday Pace & Fitness:** Running Pace, Walking Steps to Distance & Calories, Daily Water Intake, Adult BMI Reference.
   - **Transport & Fuel:** Fuel Cost Calculator.

2. **Technical SEO Architecture:**
   - Semantic HTML5, canonical URLs, and dynamic metadata per route.
   - Schema.org JSON-LD structured data (`WebApplication`, `FAQPage`, `BreadcrumbList`, `BlogPosting`).
   - Clean URLs (`/calculators/:slug`, `/category/:slug`, `/percentage/:slug`).
   - Valid `/public/sitemap.xml` and `/public/robots.txt`.
   - Comprehensive HTML Sitemap (`/sitemap`).
   - Full Static Site Generation (SSG) for all pages.

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
   - "Embed This Calculator" widget for seamless sharing.
   - Print-friendly stylesheets (`@media print`).

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
│   │   ├── programmaticPages.ts# High-intent long-tail calculation templates
│   │   └── guides.ts           # In-depth editorial guides data
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
│   │   ├── EmbedCalculatorModal.tsx # Widget to generate iframe embed codes
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
│   │   ├── BlogHubPage.tsx             # Index of all editorial guides
│   │   ├── BlogPostPage.tsx            # Individual in-depth guide page
│   │   ├── TrustPages.tsx              # About, Contact, Privacy, Terms, Disclaimer
│   │   ├── HtmlSitemapPage.tsx         # HTML index for crawlers & users
│   │   └── SeoStrategyPage.tsx         # In-app interactive SEO & growth roadmap
│   ├── App.tsx                         # Router and root application
│   ├── main.tsx                        # Application mount
│   └── index.css                       # Tailwind CSS styling
├── scripts/
│   └── prerender.ts                    # SSG build script for static pre-rendering
├── SEO_STRATEGY.md                     # Detailed 6-month organic growth roadmap
├── metadata.json                       # Applet configuration
├── package.json
└── vite.config.ts
```

---

## Contributing
We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started, our development process, and how to submit pull requests.

## License
This project is open-sourced under the [MIT License](LICENSE).

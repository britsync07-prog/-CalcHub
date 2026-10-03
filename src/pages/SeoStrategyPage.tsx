import React, { useEffect, useState } from 'react';
import { CheckCircle2, TrendingUp, Compass, Target, FileText, Layers, ShieldCheck, DollarSign } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

interface SeoStrategyPageProps {
  onNavigate: (href: string) => void;
}

export const SeoStrategyPage: React.FC<SeoStrategyPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'architecture' | 'keywords' | 'pages100' | 'monetization'>('roadmap');

  useEffect(() => {
    updateSEO({
      title: 'SEO Strategy & Organic Growth Roadmap - Everyday Calculator Hub',
      description: 'Strategic blueprint for scaling organic Google traffic across Tier-1 English markets, architectural hierarchy, 100-page publishing roadmap, and ad strategy.',
      canonicalPath: '/seo-strategy'
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'SEO Strategy & Roadmap', href: '/seo-strategy' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Organic Traffic Growth Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Everyday Calculator Hub: SEO & Growth Strategy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive architecture documentation detailing the information hierarchy, long-tail keyword cluster strategy, 6-month growth plan, and zero-CLS advertising implementation.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'roadmap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>6-Month Roadmap</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'architecture' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Site Architecture</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('keywords')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'keywords' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Keyword Topic Map</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pages100')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'pages100' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>First 100 Pages</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('monetization')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'monetization' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Ad-Safe Monetization</span>
        </button>
      </div>

      {/* Tab 1: 6-Month Organic Growth Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              6-Month Tactical Execution Roadmap
            </h2>

            <div className="space-y-6">
              {/* Month 1 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 1: Foundation & Core Indexation</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 1</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deploy 50 core calculators with pristine semantic HTML, JSON-LD Schema (WebApplication, FAQPage, BreadcrumbList), XML Sitemap, and robots.txt. Submit to Google Search Console and Bing Webmaster Tools. Verify indexation of all 6 category hubs.
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: 50–60 indexed URLs, zero 404s, mobile usability 100%.</span>
                </div>
              </div>

              {/* Month 2 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 2: Programmatic Long-Tail Expansion</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 2</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Roll out programmatic problem-solving pages targeting exact number searches (e.g. &quot;What is 20 percent of 150&quot;, &quot;What date is 45 days from today&quot;). Each page must provide genuine calculated value, worked mathematical steps, and cross-links back to head calculators.
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: 100 total live URLs, first long-tail impressions registered in GSC.</span>
                </div>
              </div>

              {/* Month 3 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 3: Topical Depth & Conversion Clusters</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 3</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deepen the Unit Converter cluster (e.g. specialized cooking conversions like grams to cups, fuel consumption L/100km to MPG, data transfer rates). Audit internal anchor text to ensure topical authority flows smoothly.
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: 150 total URLs, ranking on page 2–3 for mid-tail queries.</span>
                </div>
              </div>

              {/* Month 4 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 4: Home & DIY High-Intent Clustering</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 4</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Expand home construction calculators: room square footage, drywall sheets, tile patterns, fence post spacing, and deck board estimators. High commercial intent for advertising monetization (home improvement advertisers pay high CPMs).
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: 200 total URLs, rising CTR and repeat usage via bookmarks.</span>
                </div>
              </div>

              {/* Month 5 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 5: Seasonal Surge Optimization</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 5</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Optimize high-velocity seasonal holiday countdowns (&quot;Days until Christmas&quot;, &quot;Days until Halloween&quot;, &quot;Days until New Year&quot;) and back-to-school grade & fraction solvers ahead of seasonal traffic spikes.
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: Capture seasonal query spikes, establish historical topical authority.</span>
                </div>
              </div>

              {/* Month 6 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-700">Month 6: Tier-1 Market Localization & Display Monetization</span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">Phase 6</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Refine UK, Canadian, and Australian tax/unit variants (e.g. UK VAT 20%, Canadian HST/GST, Australian GST 10%). Apply for Google AdSense or premium ad network onboarding (Mediavine / Raptive threshold tracking).
                </p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Target: Sustainable organic traffic flywheel from US/CA/UK/AU; active ad revenue with 0 CLS.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Recommended Site Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Recommended URL & Cluster Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A 3-tier clean hierarchy that balances crawl depth (max 2 clicks from home) and topical semantic clustering:
          </p>

          <div className="font-mono text-xs bg-slate-900 text-slate-100 p-5 rounded-xl space-y-2 overflow-x-auto leading-relaxed">
            <div>/ [Homepage: Global Search + Popular Grid + Category Directory]</div>
            <div>├── /category/everyday-finance [Pillar Page: Money & Everyday Math]</div>
            <div>│   ├── /calculators/percentage-calculator</div>
            <div>│   ├── /calculators/percent-change-calculator</div>
            <div>│   ├── /calculators/discount-calculator</div>
            <div>│   ├── /calculators/sales-tax-calculator</div>
            <div>│   ├── /calculators/tip-calculator</div>
            <div>│   └── /percentage/20-percent-of-150 [Programmatic Long-Tail Solution]</div>
            <div>├── /category/date-time [Pillar Page: Calendars & Time Durations]</div>
            <div>│   ├── /calculators/days-between-dates</div>
            <div>│   ├── /calculators/age-calculator</div>
            <div>│   ├── /calculators/business-days-calculator</div>
            <div>│   └── /days-until/christmas [Seasonal Programmatic Countdown]</div>
            <div>├── /category/math-stats [Pillar Page: Arithmetic & Statistics]</div>
            <div>│   ├── /calculators/scientific-calculator</div>
            <div>│   ├── /calculators/fraction-calculator</div>
            <div>│   └── /calculators/mean-median-mode-calculator</div>
            <div>├── /category/converters [Pillar Page: Unit Conversions]</div>
            <div>│   ├── /calculators/length-converter</div>
            <div>│   └── /calculators/temperature-converter</div>
            <div>├── /category/home-improvement [Pillar Page: DIY & Construction]</div>
            <div>│   ├── /calculators/square-footage-calculator</div>
            <div>│   └── /calculators/paint-calculator</div>
            <div>├── /all-calculators [Complete Searchable Directory]</div>
            <div>├── /sitemap [HTML Index for Crawlers]</div>
            <div>├── /sitemap.xml [Dynamic XML Sitemap]</div>
            <div>└── /robots.txt [Full Crawler Access]</div>
          </div>
        </div>
      )}

      {/* Tab 3: Keyword Topic Map */}
      {activeTab === 'keywords' && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            SEO Keyword & Search Intent Mapping
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Targeting three search layers to balance fast long-tail traction with high-volume head authority:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Layer 1: Head Keywords</span>
              <p className="text-xs text-slate-500">Massive monthly search volume, high competition, long-term authority targets.</p>
              <ul className="text-xs font-medium text-slate-800 space-y-1 list-disc pl-4 pt-1">
                <li>percentage calculator</li>
                <li>age calculator</li>
                <li>days between dates</li>
                <li>unit converter</li>
                <li>square footage calculator</li>
                <li>tip calculator</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Layer 2: Mid-Tail Keywords</span>
              <p className="text-xs text-slate-500">Clear functional calculation intent, lower difficulty, faster initial traction.</p>
              <ul className="text-xs font-medium text-slate-800 space-y-1 list-disc pl-4 pt-1">
                <li>percent change calculator</li>
                <li>business days between dates</li>
                <li>room square footage calculator</li>
                <li>how many gallons of paint do i need</li>
                <li>add fractions calculator</li>
                <li>hourly to salary 40 hours</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Layer 3: Long-Tail Problem Queries</span>
              <p className="text-xs text-slate-500">Very high conversion rate, immediate answer box (Featured Snippet) opportunities.</p>
              <ul className="text-xs font-medium text-slate-800 space-y-1 list-disc pl-4 pt-1">
                <li>what is 20 percent of 150</li>
                <li>how many days until christmas</li>
                <li>how much paint for a 12 by 15 room</li>
                <li>how to split an 85 dollar bill 3 ways</li>
                <li>how many square meters is 2000 sq ft</li>
                <li>what is 68 fahrenheit in celsius</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: First 100 Pages Roadmap */}
      {activeTab === 'pages100' && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            The First 100 Pages Publishing Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A balanced catalog avoiding doorway spam by delivering authentic calculations across high-intent queries:
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900">Pages 1–54: Core Interactive Calculators (Currently Live)</span>
              <p className="text-blue-800 mt-0.5">The complete initial library across everyday money, calendar dates, algebra/statistics, unit conversions, home improvement, and low-risk pace utilities.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">Pages 55–60: Category Hub Pillar Pages</span>
              <p className="text-slate-600 mt-0.5">/category/everyday-finance, /category/date-time, /category/math-stats, /category/converters, /category/home-improvement, /category/health-fitness.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">Pages 61–75: High-Intent Percentage Solvers</span>
              <p className="text-slate-600 mt-0.5">/percentage/20-percent-of-150, /percentage/15-percent-of-250, /percentage/10-percent-of-50, /percentage/25-percent-of-80, /percentage/30-percent-off-100, etc.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">Pages 76–85: Seasonal Holiday Countdowns</span>
              <p className="text-slate-600 mt-0.5">/days-until/christmas, /days-until/new-year, /days-until/halloween, /days-until/thanksgiving, /days-until/easter, /days-until/valentines-day, etc.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">Pages 86–95: High-Frequency Unit Conversion Pairs</span>
              <p className="text-slate-600 mt-0.5">/converters/mph-to-kmh, /converters/feet-to-meters, /converters/lbs-to-kg, /converters/celsius-to-fahrenheit, /converters/gallons-to-liters, etc.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">Pages 96–100: Trust, Legal & Sitemap Infrastructure</span>
              <p className="text-slate-600 mt-0.5">/about, /contact, /privacy-policy, /terms-of-use, /disclaimer, /sitemap.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Monetization */}
      {activeTab === 'monetization' && (
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Display Monetization Without Sacrificing UX
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            AdSense and Certified Exchange guidelines to maximize RPM while ensuring zero accidental clicks or layout shifts:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-900 text-sm">Strict Zero-CLS Containers</span>
              <p className="text-emerald-800 leading-relaxed">
                All ad slots allocate explicit CSS bounding boxes (e.g. min-height 106px for leaderboards, 616px for sidebars) BEFORE any ad script loads. This ensures a 0.00 Cumulative Layout Shift score in Google Lighthouse and Core Web Vitals.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <span className="font-bold text-blue-900 text-sm">Clear Visual Separation</span>
              <p className="text-blue-800 leading-relaxed">
                Each unit includes an unmissable &quot;ADVERTISEMENT&quot; label. Ads are separated from calculator input buttons by generous margins (24px+) to prevent accidental clicks that trigger Google invalid-traffic penalties.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 text-sm">Policy-Safe Content Ratio</span>
              <p className="text-slate-700 leading-relaxed">
                Every calculator page features comprehensive educational sections below the tool: mathematical formula, variable breakdowns, step-by-step worked examples, and FAQ. Ads never exceed 30% of total page real estate.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-900 text-sm">Tier-1 Market CPM Advantages</span>
              <p className="text-slate-700 leading-relaxed">
                Traffic originating in the US, Canada, UK, and Australia yields $15–$35+ RPMs for financial and home-improvement utilities compared to $1–$3 in emerging regions. Formatting and terminology are tailored to these high-value markets.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

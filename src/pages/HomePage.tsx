import React from 'react';
import { Search, ArrowRight, Percent, Calendar, Calculator, ArrowRightLeft, Hammer, Activity, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculators';
import { PROGRAMMATIC_PAGES, getProgrammaticHref } from '../data/programmaticPages';
import { AdSlot } from '../components/AdSlot';
import { PromoBanner } from '../components/PromoBanner';
import { RegionalLocale } from '../types/calculator';

interface HomePageProps {
  currentLocale: RegionalLocale;
  onNavigate: (href: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ currentLocale, onNavigate, onOpenSearch }) => {
  const popularCalculators = CALCULATORS.filter((c) => c.popular);
  const featuredTools = CALCULATORS.filter((c) => c.featured);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-5 h-5 text-blue-600" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-emerald-600" />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft className="w-5 h-5 text-amber-600" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-orange-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-600" />;
      default:
        return <Calculator className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>50+ Free, Fast & Accurate Everyday Calculators</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
          Everyday Online Calculators & Converters
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Fast, accurate math problem solvers, personal finance tools, date calculators, unit conversions, and home improvement estimators. No sign-up required.
        </p>

        <PromoBanner variant="inline" />

        {/* Prominent Quick-Search Bar */}
        <div className="max-w-xl mx-auto mt-6">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between p-3.5 sm:p-4 bg-white border border-slate-300 hover:border-blue-400 rounded-2xl shadow-sm text-left transition-all group"
          >
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600">
              <Search className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-normal">
                Search any calculator (e.g. &quot;percentage&quot;, &quot;paint&quot;, &quot;days between&quot;)...
              </span>
            </div>
            <kbd className="hidden sm:inline text-xs font-mono font-semibold bg-slate-100 px-2 py-1 rounded-md border border-slate-200 text-slate-500">
              /
            </kbd>
          </button>
        </div>

        {/* Quick jump popular pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-2">
          <span className="font-semibold text-slate-400">Quick Links:</span>
          {popularCalculators.slice(0, 6).map((calc) => (
            <button
              key={calc.id}
              type="button"
              onClick={() => onNavigate(`/calculators/${calc.slug}`)}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors"
            >
              {calc.shortName}
            </button>
          ))}
        </div>
      </section>

      {/* Zero-CLS Leaderboard Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot type="leaderboard" id="homepage-top-ad" />
      </div>

      {/* Popular Calculators Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Most Popular Calculators
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/all-calculators')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>View all 50+ tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalculators.slice(0, 9).map((calc) => (
            <a
              key={calc.id}
              href={`/calculators/${calc.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/calculators/${calc.slug}`);
              }}
              className="p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    {calc.subcategory}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Calculate <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {calc.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-slate-600 truncate max-w-[200px]">
                  {calc.formula.expression}
                </span>
                <span>Free Tool</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Explore by Category Clusters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Browse by Topic Clusters
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Carefully structured calculation clusters targeting high-frequency consumer queries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const catCalculators = CALCULATORS.filter((c) => c.category === cat.id);
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
                      <span className="text-[11px] text-slate-400">{catCalculators.length} calculators</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>

                  <ul className="space-y-2 text-xs pt-1">
                    {catCalculators.slice(0, 5).map((tool) => (
                      <li key={tool.id}>
                        <a
                          href={`/calculators/${tool.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/calculators/${tool.slug}`);
                          }}
                          className="text-slate-700 hover:text-blue-600 transition-colors flex items-center justify-between group py-0.5"
                        >
                          <span className="truncate">{tool.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <a
                    href={`/category/${cat.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/category/${cat.slug}`);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                  >
                    <span>Explore all {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-page Native In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot type="in-content" id="homepage-mid-ad" />
      </div>

      {/* Common High-Search-Intent Specific Solutions (Programmatic Hub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Popular Specific Problem Solvers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exact solutions for high-volume long-tail searches with complete worked math.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROGRAMMATIC_PAGES.slice(0, 6).map((page) => (
            <a
              key={page.slug}
              href={getProgrammaticHref(page)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(getProgrammaticHref(page));
              }}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {page.resultSummary}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-blue-600 font-medium">
                <span>View Full Solution</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Trust & Transparency Feature Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-blue-400 font-mono font-bold text-sm">01 / ACCURACY</div>
            <h3 className="text-lg font-bold">Standard Mathematical Rigor</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every calculator implements standard arithmetic formulas, ISO 8601 calendar conventions, and certified NIST metric-imperial conversion ratios.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-blue-400 font-mono font-bold text-sm">02 / PRIVACY FIRST</div>
            <h3 className="text-lg font-bold">Client-Side Computation</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your calculations run right in your browser. We never transmit your inputs, wages, or personal numbers to an external server.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-blue-400 font-mono font-bold text-sm">03 / PERFORMANCE</div>
            <h3 className="text-lg font-bold">Instant Core Web Vitals</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Engineered with zero unnecessary bloat and fixed-geometry ad containers for a guaranteed 0 Cumulative Layout Shift (CLS) and sub-second render.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

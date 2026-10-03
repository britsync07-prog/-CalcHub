import React, { useState } from 'react';
import { Share2, Copy, Check, RotateCcw, ChevronDown, ChevronUp, ArrowRight, Bookmark } from 'lucide-react';
import { CalculatorDefinition, RegionalLocale } from '../types/calculator';
import { Breadcrumbs } from './Breadcrumbs';
import { AdSlot } from './AdSlot';
import { CALCULATORS } from '../data/calculators';
import { CATEGORIES } from '../data/categories';

interface CalculatorLayoutProps {
  calculator: CalculatorDefinition;
  currentLocale: RegionalLocale;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
  onReset?: () => void;
  lastResultSummary?: string;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  calculator,
  currentLocale,
  onNavigate,
  children,
  onReset,
  lastResultSummary
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [bookmarked, setBookmarked] = useState(false);

  const category = CATEGORIES.find(c => c.id === calculator.category);

  const breadcrumbs = [
    { name: category ? category.name : 'Calculators', href: `/category/${calculator.category}` },
    { name: calculator.name, href: `/calculators/${calculator.slug}` }
  ];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedCalculators = calculator.relatedSlugs
    .map(slug => CALCULATORS.find(c => c.slug === slug || c.id === slug))
    .filter((c): c is CalculatorDefinition => Boolean(c));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-6">
      {/* Top Breadcrumb Navigation */}
      <div className="hidden sm:block">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
      </div>

      {/* Main 2-Column Content Layout (Calculator + Desktop Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start mt-1 sm:mt-4">
        {/* Left Primary Content Column (8 cols) */}
        <main className="lg:col-span-8 space-y-3 sm:space-y-6">
          {/* Header & Short Intro Section */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-3">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                {calculator.h1}
              </h1>

              {/* Utility actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl shadow-2xs transition-colors"
                  title="Copy Page URL to share"
                >
                  {copied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold border rounded-lg sm:rounded-xl shadow-2xs transition-colors ${
                    bookmarked 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                  title="Bookmark this calculator in your browser"
                >
                  <Bookmark className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                  <span>{bookmarked ? 'Saved' : 'Save'}</span>
                </button>

                {onReset && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl transition-colors"
                    title="Reset inputs to defaults"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Short introduction addressing the exact search intent */}
            <p className="text-xs sm:text-sm text-slate-600 leading-snug line-clamp-1 sm:line-clamp-none max-w-3xl">
              {calculator.summary}
            </p>
          </div>

          {/* Core Interactive Calculator Card - HIGH ON MOBILE VIEWPORT */}
          <section
            aria-label="Calculator Tool"
            className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-2.5 sm:p-5 transition-all"
          >
            {children}
          </section>

          {/* Zero CLS Ad Placement */}
          <AdSlot type="leaderboard" id="top-calculator-banner" className="my-2" />

          {/* Native In-Content Ad Placement (Zero CLS) */}
          <AdSlot type="in-content" id="mid-content-ad" />

          {/* Section: How it Works */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>How the {calculator.shortName} Calculator Works</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <ol className="list-decimal pl-5 space-y-2 marker:text-blue-600 marker:font-semibold">
                {calculator.howItWorks.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Section: Formula Explanation */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Mathematical Formula
            </h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm sm:text-base text-slate-900 font-semibold text-center overflow-x-auto select-all">
              {calculator.formula.expression}
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              {calculator.formula.description}
            </p>

            {calculator.formula.variables.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Variables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {calculator.formula.variables.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                      <span className="font-mono font-bold text-blue-600 shrink-0">{v.symbol}:</span>
                      <span className="text-slate-600">{v.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section: Realistic Worked Example */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Step-by-Step Example
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {calculator.example.scenario}
              </span>
            </div>

            {/* Inputs preview */}
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(calculator.example.inputs).map(([k, val]) => (
                <div key={k} className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 font-medium">
                  <span className="text-slate-500">{k}:</span> {val}
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="space-y-2 text-sm text-slate-600 pl-4 border-l-2 border-blue-500">
              {calculator.example.steps.map((st, i) => (
                <p key={i}>{st}</p>
              ))}
            </div>

            {/* Example result callout */}
            <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs sm:text-sm text-blue-900 font-medium flex items-center justify-between">
              <span>Final Solution:</span>
              <span className="font-bold font-mono text-base">{calculator.example.result}</span>
            </div>
          </section>

          {/* Section: Frequently Asked Questions (FAQ Accordion with Schema support) */}
          {calculator.faqs.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {calculator.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-3 text-sm font-semibold text-slate-800 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 py-3 text-xs sm:text-sm text-slate-600 bg-white leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section: Strong Internal Linking to Related Calculators */}
          {relatedCalculators.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Related Calculators & Converters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedCalculators.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/calculators/${rel.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/calculators/${rel.slug}`);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {rel.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {rel.summary}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar Column (4 cols) - Sticky Ad & Quick Category Nav */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Half-Page Desktop Sidebar Ad (Zero CLS) */}
          <AdSlot type="sidebar" id="sidebar-half-page-ad" className="hidden lg:flex" />

          {/* Category Quick Browse Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs text-slate-400">
              More in {category?.name || 'Calculators'}
            </h3>
            <ul className="space-y-2 text-xs">
              {CALCULATORS.filter(c => c.category === calculator.category && c.id !== calculator.id)
                .slice(0, 6)
                .map((item) => (
                  <li key={item.id}>
                    <a
                      href={`/calculators/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/calculators/${item.slug}`);
                      }}
                      className="text-slate-700 hover:text-blue-600 flex items-center justify-between py-1 group"
                    >
                      <span className="truncate">{item.name}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </a>
                  </li>
                ))}
            </ul>
            <div className="pt-2 border-t border-slate-100">
              <a
                href={`/category/${calculator.category}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/category/${calculator.category}`);
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View all {category?.name} tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

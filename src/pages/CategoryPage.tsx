import React, { useEffect } from 'react';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import { getCategoryById } from '../data/categories';
import { getCalculatorsByCategory } from '../data/calculators';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { updateSEO, generateBreadcrumbSchema } from '../utils/seo';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (href: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, onNavigate }) => {
  const category = getCategoryById(categorySlug);
  const calculators = category ? getCalculatorsByCategory(category.id) : [];

  useEffect(() => {
    if (!category) return;

    const title = `${category.name} Calculators & Tools - Free Online Solutions`;
    const description = `Free online ${category.name.toLowerCase()} calculators. ${category.description} Fast, accurate, and easy to use on desktop and mobile.`;
    const canonicalPath = `/category/${category.slug}`;

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: category.name, url: canonicalPath }
    ]);

    updateSEO({
      title,
      description,
      canonicalPath,
      schema: breadcrumbSchema,
      publishedTime: '2025-02-10',
      modifiedTime: '2026-10-01'
    });
  }, [category, categorySlug]);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Group by subcategory
  const subcategories: Record<string, typeof calculators> = {};
  calculators.forEach((c) => {
    const sub = c.subcategory || 'General';
    if (!subcategories[sub]) subcategories[sub] = [];
    subcategories[sub].push(c);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ name: category.name, href: `/category/${category.slug}` }]} onNavigate={onNavigate} />

      {/* Category Hero */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {category.name} Calculators
        </h1>
        <p className="calculator-direct-answer text-base text-slate-600 leading-relaxed">
          {category.heroText}
        </p>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Updated <time dateTime="2026-10-01">2026-10-01</time>
          <span> · Published <time dateTime="2025-02-10">2025-02-10</time></span>
        </p>
      </div>

      <AdSlot type="leaderboard" id="category-top-ad" />

      {/* Subcategory Sections */}
      <div className="space-y-10">
        {Object.entries(subcategories).map(([subName, tools]) => (
          <section key={subName} className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">
              {subName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((calc) => (
                <a
                  key={calc.id}
                  href={`/calculators/${calc.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/calculators/${calc.slug}`);
                  }}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        Use Tool <ArrowRight className="w-3 h-3" />
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
                    <span>Free</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom informational authority text */}
      <div className="p-6 bg-slate-100/70 border border-slate-200 rounded-2xl space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
        <h2 className="font-bold text-slate-900 text-sm sm:text-base">
          What Tools Are in the {category.name} Calculation Suite?
        </h2>
        <p>
          Every tool in our {category.name} cluster is designed for swift, unhindered problem solving. Whether you are browsing on a mobile phone during a shopping trip or balancing numbers on a desktop workstation, our calculators deliver instant results with step-by-step mathematical explanations.
        </p>
        <p>
          Each {category.name.toLowerCase()} calculator above shows its formula, a worked example with real numbers, and answers to frequently asked questions, so you can verify every result by hand.
        </p>
      </div>
    </div>
  );
};

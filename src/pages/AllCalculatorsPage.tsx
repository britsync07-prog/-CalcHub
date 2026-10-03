import React, { useState, useEffect } from 'react';
import { Search, Calculator, ArrowRight, Filter } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import { updateSEO } from '../utils/seo';

interface AllCalculatorsPageProps {
  onNavigate: (href: string) => void;
}

export const AllCalculatorsPage: React.FC<AllCalculatorsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    updateSEO({
      title: 'All Online Calculators Directory - 50+ Free Tools',
      description: 'Browse our complete catalog of 50+ free online calculators and converters covering percentages, finance, dates, algebra, units, and DIY.',
      canonicalPath: '/all-calculators'
    });
  }, []);

  const normalized = search.toLowerCase().trim();

  const filtered = CALCULATORS.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      !normalized ||
      c.name.toLowerCase().includes(normalized) ||
      c.summary.toLowerCase().includes(normalized) ||
      c.searchKeywords.some((k) => k.toLowerCase().includes(normalized));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ name: 'All Calculators', href: '/all-calculators' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Complete Calculator Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Explore all 50+ everyday utility calculators and unit converters. Filter by topic or type a keyword to jump straight to the exact tool you need.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter calculators by name or keyword..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({CALCULATORS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <AdSlot type="leaderboard" id="directory-top-ad" />

      {/* Calculators Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((calc) => (
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
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{calc.subcategory}</span>
                  <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {calc.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="truncate max-w-[200px]">{calc.formula.expression}</span>
                <span className="text-slate-500 font-sans">Instant</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Calculator className="w-10 h-10 text-slate-300 mx-auto" />
          <h2 className="text-base font-semibold text-slate-800">No calculators found matching &quot;{search}&quot;</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing the category filter to view all available calculators.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

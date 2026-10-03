import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calculator, ArrowRight } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { PROGRAMMATIC_PAGES } from '../data/programmaticPages';
import { CATEGORIES } from '../data/categories';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) && !isOpen) {
        // Prevent default only if not typing in an input
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
        e.preventDefault();
        onNavigate('#search'); // or open search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  // Search through calculators
  const matchingCalculators = normalized
    ? CALCULATORS.filter(
        c =>
          c.name.toLowerCase().includes(normalized) ||
          c.summary.toLowerCase().includes(normalized) ||
          c.searchKeywords.some(k => k.toLowerCase().includes(normalized)) ||
          c.subcategory.toLowerCase().includes(normalized)
      ).slice(0, 8)
    : CALCULATORS.filter(c => c.popular).slice(0, 6);

  // Search programmatic pages
  const matchingProgrammatic = normalized
    ? PROGRAMMATIC_PAGES.filter(
        p =>
          p.title.toLowerCase().includes(normalized) ||
          p.h1.toLowerCase().includes(normalized)
      ).slice(0, 3)
    : [];

  // Search categories
  const matchingCategories = normalized
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(normalized) || c.description.toLowerCase().includes(normalized))
    : [];

  const handleSelect = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3.5">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 50+ calculators (e.g. 'percentage', 'square feet', 'paint', 'age')..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 bg-slate-100 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Calculators section */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
              {normalized ? 'Calculators & Converters' : 'Popular Calculators'}
            </div>
            {matchingCalculators.length > 0 ? (
              <div className="space-y-1 mt-1">
                {matchingCalculators.map((calc) => (
                  <button
                    key={calc.id}
                    type="button"
                    onClick={() => handleSelect(`/calculators/${calc.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-900">
                          {calc.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {calc.summary}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No calculators found for &quot;{query}&quot;. Try searching &quot;percent&quot;, &quot;dates&quot;, or &quot;length&quot;.
              </div>
            )}
          </div>

          {/* Programmatic specific queries section */}
          {matchingProgrammatic.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Specific Calculations
              </div>
              <div className="space-y-1 mt-1">
                {matchingProgrammatic.map((prog) => (
                  <button
                    key={prog.slug}
                    type="button"
                    onClick={() => handleSelect(`/percentage/${prog.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors"
                  >
                    <div className="text-xs font-medium text-slate-700">
                      {prog.title}
                    </div>
                    <span className="text-[11px] text-blue-600">View Solution →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories section */}
          {matchingCategories.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Categories
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {matchingCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelect(`/category/${cat.slug}`)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left text-xs font-medium text-slate-800 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{CALCULATORS.length} total calculators available</span>
          <button
            type="button"
            onClick={() => handleSelect('/all-calculators')}
            className="text-blue-600 hover:underline font-medium"
          >
            Browse Directory →
          </button>
        </div>
      </div>
    </div>
  );
};

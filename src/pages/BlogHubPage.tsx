import React, { useState, useEffect } from 'react';
import { GUIDES } from '../data/guides';
import { updateSEO, generateBreadcrumbSchema } from '../utils/seo';
import { BookOpen, Clock, Calendar, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

interface BlogHubPageProps {
  onNavigate: (href: string) => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateSEO({
      title: 'Practical Guides & Everyday Calculation Tutorials',
      description: 'In-depth, expert-reviewed guides and cheat sheets for tipping etiquette, kitchen measurements, commute expenses, home renovation calculations, and personal budgeting.',
      canonicalPath: '/blog',
      schema: generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Guides & Tutorials', url: '/blog' }
      ])
    });
  }, []);

  const categories = ['all', 'Everyday & Money', 'Unit Converters', 'Home & Construction', 'Date & Time'];

  const filteredGuides = GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Guides & Tutorials</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Calculation Guides & Tutorials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Master Everyday Math, Money & Conversions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Step-by-step mathematical explanations, real-world cheat sheets, and practical formulas. Each comprehensive guide connects directly to our instant, zero-ad interactive calculators.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                10 In-Depth Guides (1,000+ words each)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Expert Verified Formulas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                Instant Interactive Tool Links
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials & guides..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => onNavigate(`/blog/${guide.slug}`)}
            >
              <div className="space-y-3">
                {/* Meta Row */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                    {guide.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTimeMinutes} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                  <a
                    href={`/blog/${guide.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/blog/${guide.slug}`);
                    }}
                  >
                    {guide.title}
                  </a>
                </h2>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={guide.publishedDate}>{guide.publishedDate}</time>
                </div>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Directory Callout */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold">Looking for a specific calculator?</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Browse our complete library of 55+ interactive tools for personal finance, conversions, date/time, construction, and health.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/all-calculators')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              Browse All 55+ Calculators <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

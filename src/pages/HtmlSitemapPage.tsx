import React, { useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import { PROGRAMMATIC_PAGES, getProgrammaticHref } from '../data/programmaticPages';
import { GUIDES } from '../data/guides';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

interface HtmlSitemapPageProps {
  onNavigate: (href: string) => void;
}

export const HtmlSitemapPage: React.FC<HtmlSitemapPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updateSEO({
      title: 'HTML Sitemap & Index - Everyday Calculator Hub',
      description: 'Comprehensive directory of all categories, calculators, programmatic problem solvers, and legal pages on Everyday Calculator Hub.',
      canonicalPath: '/sitemap'
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Sitemap', href: '/sitemap' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Website HTML Sitemap & Directory
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Direct links to every indexable page, topic cluster, calculator, and utility across Everyday Calculator Hub.
        </p>
        <div className="pt-1">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
          >
            <span>View XML Sitemap (for Search Engines)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="space-y-10">
        {CATEGORIES.map((cat) => {
          const tools = CALCULATORS.filter((c) => c.category === cat.id);
          return (
            <div key={cat.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <a
                  href={`/category/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/category/${cat.slug}`);
                  }}
                  className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {cat.name} ({tools.length} calculators)
                </a>
                <span className="text-xs text-slate-400">/category/{cat.slug}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {tools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/calculators/${tool.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/calculators/${tool.slug}`);
                    }}
                    className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 flex items-center justify-between transition-colors"
                  >
                    <span className="truncate">{tool.name}</span>
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}

        {/* Editorial Guides & Articles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              Editorial Guides &amp; Math Breakdowns ({GUIDES.length} articles)
            </a>
            <span className="text-xs text-slate-400">/blog</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {GUIDES.map((guide) => (
              <a
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/blog/${guide.slug}`);
                }}
                className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 flex items-center justify-between transition-colors"
              >
                <span className="truncate">{guide.title}</span>
                <ArrowRight className="w-3 h-3 text-slate-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Programmatic Pages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Specific Problem Solvers ({PROGRAMMATIC_PAGES.length} pages)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {PROGRAMMATIC_PAGES.map((page) => (
              <a
                key={page.slug}
                href={getProgrammaticHref(page)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(getProgrammaticHref(page));
                }}
                className="p-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 flex items-center justify-between transition-colors"
              >
                <span className="truncate">{page.title}</span>
                <ArrowRight className="w-3 h-3 text-slate-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Trust Pages */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Legal & Trust Pages
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate('/about'); }} className="p-2 text-slate-700 hover:text-blue-600">About Us</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact'); }} className="p-2 text-slate-700 hover:text-blue-600">Contact</a>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigate('/privacy-policy'); }} className="p-2 text-slate-700 hover:text-blue-600">Privacy Policy</a>
            <a href="/terms-of-use" onClick={(e) => { e.preventDefault(); onNavigate('/terms-of-use'); }} className="p-2 text-slate-700 hover:text-blue-600">Terms of Use</a>
            <a href="/disclaimer" onClick={(e) => { e.preventDefault(); onNavigate('/disclaimer'); }} className="p-2 text-slate-700 hover:text-blue-600">Disclaimer</a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculators';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  const popular = CALCULATORS.filter(c => c.popular).slice(0, 8);

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs">
                ∑
              </span>
              <span className="text-white font-bold text-base tracking-tight">
                Everyday Calculator Hub
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Free, fast, and mathematically accurate online calculators and unit converters designed for everyday personal finance, home DIY, school, business, and dates. Serving users across North America, the UK, Australia, and New Zealand.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Zero accounts required · Ad-supported free utility · Tested formulas
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.slug}`}
                    onClick={(e) => handleLinkClick(e, `/category/${cat.slug}`)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/all-calculators"
                  onClick={(e) => handleLinkClick(e, '/all-calculators')}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  All 50+ Calculators →
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Popular Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              {popular.map((calc) => (
                <li key={calc.id}>
                  <a
                    href={`/calculators/${calc.slug}`}
                    onClick={(e) => handleLinkClick(e, `/calculators/${calc.slug}`)}
                    className="hover:text-white transition-colors truncate block max-w-[200px]"
                  >
                    {calc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust Column */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Trust & Resources
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-white transition-colors">
                  About Us & Accuracy
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-white transition-colors">
                  Contact & Suggestions
                </a>
              </li>
              <li>
                <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, '/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-use" onClick={(e) => handleLinkClick(e, '/terms-of-use')} className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/disclaimer" onClick={(e) => handleLinkClick(e, '/disclaimer')} className="hover:text-white transition-colors">
                  General Disclaimer
                </a>
              </li>
              <li>
                <a href="/sitemap" onClick={(e) => handleLinkClick(e, '/sitemap')} className="hover:text-white transition-colors">
                  HTML Sitemap
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  XML Sitemap (Indexable)
                </a>
              </li>
              <li>
                <a href="/seo-strategy" onClick={(e) => handleLinkClick(e, '/seo-strategy')} className="text-blue-400 hover:text-blue-300 transition-colors">
                  SEO & Organic Growth Plan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} Everyday Calculator Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Calculations for informational guidance</span>
            <span>·</span>
            <span>Zero Tracking Cookies</span>
            <span>·</span>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:underline">
              robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

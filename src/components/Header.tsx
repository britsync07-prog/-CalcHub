import React, { useState } from 'react';
import { Search, History, Globe, Menu, X } from 'lucide-react';
import { RegionalLocale } from '../types/calculator';

interface HeaderProps {
  currentLocale: RegionalLocale;
  onLocaleChange: (loc: RegionalLocale) => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onNavigate: (href: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocale,
  onLocaleChange,
  onOpenSearch,
  onOpenHistory,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Everyday & Money', href: '/category/everyday-finance' },
    { label: 'Date & Time', href: '/category/date-time' },
    { label: 'Math & Stats', href: '/category/math-stats' },
    { label: 'Converters', href: '/category/converters' },
    { label: 'Guides', href: '/blog' },
    { label: 'All 55+ Tools', href: '/all-calculators' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  const locales: { code: RegionalLocale; label: string; currency: string; system: string }[] = [
    { code: 'US', label: 'United States', currency: 'USD ($)', system: 'Imperial / Customary' },
    { code: 'CA', label: 'Canada', currency: 'CAD ($)', system: 'Metric / Mixed' },
    { code: 'UK', label: 'United Kingdom', currency: 'GBP (£)', system: 'Metric / Imperial' },
    { code: 'AU', label: 'Australia & NZ', currency: 'AUD ($)', system: 'Metric' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-base sm:text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2 shrink-0"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-sm shrink-0">
              ∑
            </span>
            <span className="hidden sm:inline">Everyday Calculator Hub</span>
            <span className="sm:hidden font-bold tracking-tight">CalcHub</span>
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-slate-900 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-800 rounded-lg border border-slate-200/80 transition-colors"
            title="Search Calculators (Press / or Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search calculators...</span>
            <kbd className="hidden sm:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
              /
            </kbd>
          </button>

          {/* Regional Settings Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLocaleDropdownOpen(!localeDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-colors"
              title="Regional Settings & Formats"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-mono uppercase font-semibold">{currentLocale}</span>
            </button>

            {localeDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setLocaleDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-20 text-xs">
                  <div className="px-2 py-1.5 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                    Regional Formatting
                  </div>
                  {locales.map((loc) => (
                    <button
                      key={loc.code}
                      type="button"
                      onClick={() => {
                        onLocaleChange(loc.code);
                        setLocaleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex flex-col transition-colors ${
                        currentLocale === loc.code ? 'bg-blue-50 text-blue-900 font-medium' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{loc.label}</span>
                        <span className="font-mono text-[11px] text-slate-500">{loc.currency}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{loc.system}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Recent Calculations"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3 py-2">
            <span>Market Format: {currentLocale}</span>
            <a
              href="/sitemap"
              onClick={(e) => handleLinkClick(e, '/sitemap')}
              className="text-blue-600 hover:underline"
            >
              All Calculators Index
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

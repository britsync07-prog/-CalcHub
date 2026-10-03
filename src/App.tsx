import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromoBanner } from './components/PromoBanner';
import { SearchBar } from './components/SearchBar';
import { CalculationHistoryDrawer } from './components/CalculationHistoryDrawer';
import { HomePage } from './pages/HomePage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';
import { ProgrammaticCalculatorPage } from './pages/ProgrammaticCalculatorPage';
import { TrustPages } from './pages/TrustPages';
import { HtmlSitemapPage } from './pages/HtmlSitemapPage';
import { SeoStrategyPage } from './pages/SeoStrategyPage';
import { BlogHubPage } from './pages/BlogHubPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { RegionalLocale } from './types/calculator';
import { updateSEO } from './utils/seo';

export interface AppProps {
  initialPath?: string;
}

export const App: React.FC<AppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(
    initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  const [currentLocale, setCurrentLocale] = useState<RegionalLocale>('US');
  const [searchOpen, setSearchOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Sync with browser navigation (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler
  const handleNavigate = (href: string) => {
    if (href === '#search') {
      setSearchOpen(true);
      return;
    }
    if (href === currentPath) return;

    window.history.pushState({}, '', href);
    setCurrentPath(href);
    window.scrollTo(0, 0);
  };

  // Keyboard shortcut listener for Search (/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !searchOpen) {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Homepage
    if (currentPath === '/' || currentPath === '') {
      updateSEO({
        title: 'Everyday Calculator Hub - Free Online Calculators & Converters',
        description: 'Fast, free, and accurate everyday online calculators and converters for math, finance, dates, measurements, and home improvement.',
        canonicalPath: '/'
      });
      return (
        <HomePage
          currentLocale={currentLocale}
          onNavigate={handleNavigate}
          onOpenSearch={() => setSearchOpen(true)}
        />
      );
    }

    // 2. All Calculators Directory
    if (currentPath === '/all-calculators') {
      return <AllCalculatorsPage onNavigate={handleNavigate} />;
    }

    // 3. Calculator Details: /calculators/:slug or rival alias /tools/:slug
    if (currentPath.startsWith('/calculators/') || currentPath.startsWith('/tools/')) {
      const slug = currentPath
        .replace('/calculators/', '')
        .replace('/tools/', '')
        .replace(/\/$/, '');
      return (
        <CalculatorDetailPage
          slug={slug}
          currentLocale={currentLocale}
          onNavigate={handleNavigate}
        />
      );
    }

    // 3b. Blog & Editorial Guides: /blog or /blog/:slug
    if (currentPath === '/blog' || currentPath === '/blog/') {
      return <BlogHubPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }

    // 4. Category Pages: /category/:slug
    if (currentPath.startsWith('/category/')) {
      const catSlug = currentPath.replace('/category/', '').replace(/\/$/, '');
      return (
        <CategoryPage
          categorySlug={catSlug}
          onNavigate={handleNavigate}
        />
      );
    }

    // 5. Programmatic Problem Pages: /percentage/:slug or /days-until/:holiday
    if (currentPath.startsWith('/percentage/')) {
      const slug = currentPath.replace('/percentage/', '').replace(/\/$/, '');
      return (
        <ProgrammaticCalculatorPage
          slug={slug}
          currentLocale={currentLocale}
          onNavigate={handleNavigate}
        />
      );
    }
    if (currentPath.startsWith('/days-until/')) {
      const holiday = currentPath.replace('/days-until/', '').replace(/\/$/, '');
      return (
        <ProgrammaticCalculatorPage
          slug={`days-until-${holiday}`}
          currentLocale={currentLocale}
          onNavigate={handleNavigate}
        />
      );
    }

    // 6. Trust & Informational Pages (with rival alias support /privacy and /terms)
    if (currentPath === '/about') {
      return <TrustPages type="about" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/contact') {
      return <TrustPages type="contact" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/privacy-policy' || currentPath === '/privacy') {
      return <TrustPages type="privacy" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/terms-of-use' || currentPath === '/terms') {
      return <TrustPages type="terms" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/disclaimer') {
      return <TrustPages type="disclaimer" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/sitemap') {
      return <HtmlSitemapPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/seo-strategy') {
      return <SeoStrategyPage onNavigate={handleNavigate} />;
    }

    // 7. 404 Fallback
    updateSEO({
      title: 'Page Not Found (404) - Everyday Calculator Hub',
      description: 'The requested calculation page could not be found.',
      canonicalPath: currentPath
    });
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The page or calculator you were looking for doesn&apos;t exist or may have been renamed.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
          >
            Return to Homepage
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('/all-calculators')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
          >
            Browse All 50+ Calculators
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <PromoBanner variant="top" />
      {/* 3-Zone Compliant Top Navigation Bar */}
      <Header
        currentLocale={currentLocale}
        onLocaleChange={setCurrentLocale}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenHistory={() => setHistoryOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Body */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Global Modals & Drawers */}
      <SearchBar
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <CalculationHistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

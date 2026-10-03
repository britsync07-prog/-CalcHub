import React, { useEffect } from 'react';
import { getCalculatorBySlug } from '../data/calculators';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CalculatorDispatcher } from '../components/CalculatorDispatcher';
import { updateSEO, generateCalculatorSchema, generateFaqSchema, generateBreadcrumbSchema } from '../utils/seo';
import { RegionalLocale } from '../types/calculator';

interface CalculatorDetailPageProps {
  slug: string;
  currentLocale: RegionalLocale;
  onNavigate: (href: string) => void;
}

export const CalculatorDetailPage: React.FC<CalculatorDetailPageProps> = ({
  slug,
  currentLocale,
  onNavigate
}) => {
  const calculator = getCalculatorBySlug(slug);

  useEffect(() => {
    if (!calculator) return;

    // Dynamic Title, Description & Canonical
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://everydaycalculatorhub.com';
    const canonicalPath = `/calculators/${calculator.slug}`;
    const pageUrl = `${origin}${canonicalPath}`;

    // Schema.org Structured Data
    const webAppSchema = generateCalculatorSchema({
      name: calculator.name,
      description: calculator.metaDescription,
      url: pageUrl,
      category: calculator.category
    });

    const faqSchema = generateFaqSchema(calculator.faqs);

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: calculator.category, url: `/category/${calculator.category}` },
      { name: calculator.name, url: canonicalPath }
    ]);

    const schemas: Record<string, unknown>[] = [webAppSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);

    updateSEO({
      title: calculator.metaTitle,
      description: calculator.metaDescription,
      canonicalPath,
      schema: schemas
    });
  }, [calculator, slug]);

  if (!calculator) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Calculator Not Found</h1>
        <p className="text-slate-600 text-sm">
          The requested calculation tool could not be located or has moved.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => onNavigate('/all-calculators')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Browse All 50+ Calculators
          </button>
        </div>
      </div>
    );
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      currentLocale={currentLocale}
      onNavigate={onNavigate}
    >
      <CalculatorDispatcher
        calculator={calculator}
        locale={currentLocale}
      />
    </CalculatorLayout>
  );
};

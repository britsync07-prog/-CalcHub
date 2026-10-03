import React, { useEffect, useMemo } from 'react';
import { getCalculatorBySlug } from '../data/calculators';
import { CalculatorLayout } from '../components/CalculatorLayout';
import { CalculatorDispatcher } from '../components/CalculatorDispatcher';
import {
  updateSEO,
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSpeakableSchema,
  withArticleDates
} from '../utils/seo';
import {
  getCalculatorDates,
  getCalculatorAuthor,
  getCalculatorReviewer,
  getDefinition,
  getExtraFaqs,
  getSources,
  getEnrichedComparisonTable
} from '../data/seoEnrichment';
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

  const enriched = useMemo(() => {
    if (!calculator) return undefined;
    return {
      ...calculator,
      faqs: [...calculator.faqs, ...getExtraFaqs(calculator.id)],
      comparisonTable: getEnrichedComparisonTable(calculator.id, calculator.comparisonTable),
      sources: getSources(calculator.category, calculator.sources),
      datePublished: calculator.datePublished,
      dateUpdated: calculator.dateUpdated
    };
  }, [calculator]);

  const author = useMemo(
    () => (calculator ? getCalculatorAuthor(calculator.category, calculator.authorId) : undefined),
    [calculator]
  );
  const reviewer = useMemo(
    () => (calculator ? getCalculatorReviewer(calculator.category, calculator.reviewerId) : undefined),
    [calculator]
  );
  const dates = useMemo(() => getCalculatorDates(), []);
  const definition = calculator ? getDefinition(calculator.id, calculator.name) : '';

  useEffect(() => {
    if (!calculator || !enriched || !author) return;

    // Dynamic Title, Description & Canonical
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://everydaycalculatorhub.com';
    const canonicalPath = `/calculators/${calculator.slug}`;
    const pageUrl = `${origin}${canonicalPath}`;

    // Schema.org Structured Data
    const webAppSchema = withArticleDates(
      generateCalculatorSchema({
        name: calculator.name,
        description: calculator.metaDescription,
        url: pageUrl,
        category: calculator.category
      }),
      enriched.datePublished || dates.published,
      enriched.dateUpdated || dates.updated,
      author
    );

    const faqSchema = generateFaqSchema(enriched.faqs);

    const howToSchema = generateHowToSchema({
      name: `How to use the ${calculator.name}`,
      description: calculator.summary,
      steps: calculator.howItWorks
    });

    const speakableSchema = generateSpeakableSchema(['.calculator-direct-answer', '.faq-answer']);

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: calculator.category, url: `/category/${calculator.category}` },
      { name: calculator.name, url: canonicalPath }
    ]);

    const schemas: Record<string, unknown>[] = [webAppSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);
    if (howToSchema) schemas.push(howToSchema);
    if (speakableSchema) schemas.push(speakableSchema);

    updateSEO({
      title: calculator.metaTitle,
      description: calculator.metaDescription,
      canonicalPath,
      schema: schemas,
      publishedTime: enriched.datePublished || dates.published,
      modifiedTime: enriched.dateUpdated || dates.updated,
      authorName: author.name
    });
  }, [calculator, enriched, author, dates, slug]);

  if (!calculator || !enriched) {
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
      calculator={enriched}
      currentLocale={currentLocale}
      onNavigate={onNavigate}
      author={author}
      reviewer={reviewer}
      datePublished={enriched.datePublished || dates.published}
      dateUpdated={enriched.dateUpdated || dates.updated}
      definition={definition}
    >
      <CalculatorDispatcher
        calculator={enriched}
        locale={currentLocale}
      />
    </CalculatorLayout>
  );
};

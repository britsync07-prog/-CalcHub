import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { getProgrammaticPageBySlug, getProgrammaticHref } from '../data/programmaticPages';
import { getCalculatorBySlug } from '../data/calculators';
import { CalculatorDispatcher } from '../components/CalculatorDispatcher';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSlot } from '../components/AdSlot';
import {
  updateSEO,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateFaqSchema,
  generateSpeakableSchema
} from '../utils/seo';
import { getTeamMember } from '../data/editorialTeam';
import { RegionalLocale } from '../types/calculator';

interface ProgrammaticCalculatorPageProps {
  slug: string;
  currentLocale: RegionalLocale;
  onNavigate: (href: string) => void;
}

const FALLBACK_PUBLISHED = '2025-04-01';
const FALLBACK_UPDATED = '2026-10-01';

export const ProgrammaticCalculatorPage: React.FC<ProgrammaticCalculatorPageProps> = ({
  slug,
  currentLocale,
  onNavigate
}) => {
  const page = getProgrammaticPageBySlug(slug);
  const baseCalculator = page ? getCalculatorBySlug(page.calculatorId) : undefined;

  useEffect(() => {
    if (!page) return;

    const canonicalPath = getProgrammaticHref(page);
    const breadcrumbSchema = generateBreadcrumbSchema(
      page.breadcrumbs.map((b) => ({ name: b.name, url: b.href }))
    );
    const howToSchema = generateHowToSchema({
      name: page.h1,
      description: page.explanation,
      steps: page.workedSteps
    });
    const faqSchema = generateFaqSchema(page.faqs || []);
    const speakableSchema = generateSpeakableSchema(['.programmatic-direct-answer', '.faq-answer']);
    const author = getTeamMember('daniel-okoro', 'daniel-okoro');

    const schemas: Record<string, unknown>[] = [breadcrumbSchema];
    if (howToSchema) schemas.push(howToSchema);
    if (faqSchema) schemas.push(faqSchema);
    if (speakableSchema) schemas.push(speakableSchema);

    updateSEO({
      title: page.metaTitle,
      description: page.metaDescription,
      canonicalPath,
      schema: schemas,
      publishedTime: page.datePublished || FALLBACK_PUBLISHED,
      modifiedTime: page.dateUpdated || FALLBACK_UPDATED,
      authorName: author.name
    });
  }, [page, slug]);

  if (!page || !baseCalculator) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Calculation Not Found</h1>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={page.breadcrumbs.slice(1)} onNavigate={onNavigate} />

      {/* Top Banner Ad Container */}
      <AdSlot type="leaderboard" id="programmatic-top-ad" />

      {/* Heading & Direct Answer Hero Box */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {page.h1}
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500">
          By <span className="font-semibold text-slate-700">Daniel Okoro</span>
          <span className="text-slate-400"> (Mathematics Editor)</span>
          <span className="block sm:inline sm:before:content-['·_']">
            Updated <time dateTime={page.dateUpdated || FALLBACK_UPDATED}>{page.dateUpdated || FALLBACK_UPDATED}</time>
          </span>
        </p>

        {/* Instant Answer Callout */}
        <div className="p-5 sm:p-6 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Exact Direct Answer
            </span>
            <div className="programmatic-direct-answer text-2xl sm:text-3xl font-extrabold font-mono text-blue-950">
              {page.resultSummary}
            </div>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed pt-1">
              {page.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool Pre-Filled for User to Recalculate */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive Calculator
            </h2>
            <p className="text-xs text-slate-500">
              Adjust numbers below to solve any other values.
            </p>
          </div>
        </div>

        <CalculatorDispatcher
          calculator={baseCalculator}
          locale={currentLocale}
          initialInputs={page.initialInputs}
        />
      </section>

      {/* In-Content Native Ad */}
      <AdSlot type="in-content" id="programmatic-mid-ad" />

      {/* Step-by-Step Mathematical Solution */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          How Do You Calculate {page.h1.replace(/^(What is|How Many Days Until)\s*/i, '')} Step by Step?
        </h2>
        <ol className="list-decimal pl-5 space-y-2.5 text-sm text-slate-600 leading-relaxed">
          {page.workedSteps.map((step, idx) => (
            <li key={idx} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ (bulk pages ship 3 Q&As) */}
      {(page.faqs || []).length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            {page.h1} Questions and Answers
          </h2>
          <div className="space-y-3">
            {(page.faqs || []).map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-800">{faq.question}</h3>
                <p className="faq-answer text-xs sm:text-sm text-slate-600 leading-relaxed pt-1.5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Specific Calculations & Internal Linking */}
      {page.relatedPages.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Related Calculations & Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {page.relatedPages.map((rel, i) => (
              <a
                key={i}
                href={rel.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(rel.href);
                }}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
              >
                <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {rel.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

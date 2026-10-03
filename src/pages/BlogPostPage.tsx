import React, { useEffect } from 'react';
import { getGuideBySlug, GUIDES } from '../data/guides';
import {
  updateSEO,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateFaqSchema
} from '../utils/seo';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Calculator,
  HelpCircle,
  Share2,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const guide = getGuideBySlug(slug);

  useEffect(() => {
    if (!guide) {
      updateSEO({
        title: 'Guide Not Found - Everyday Calculator Hub',
        description: 'The requested tutorial or guide could not be found.',
        canonicalPath: `/blog/${slug}`,
        noindex: true
      });
      return;
    }

    const schemas: Array<Record<string, unknown>> = [
      generateBlogPostingSchema({
        title: guide.title,
        description: guide.metaDescription,
        url: `/blog/${guide.slug}`,
        datePublished: guide.publishedDate,
        dateModified: guide.updatedDate,
        authorName: guide.author.name,
        wordCount: 1200
      }),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Guides & Tutorials', url: '/blog' },
        { name: guide.title, url: `/blog/${guide.slug}` }
      ])
    ];

    if (guide.faqs && guide.faqs.length > 0) {
      const faqSchema = generateFaqSchema(guide.faqs);
      if (faqSchema) schemas.push(faqSchema);
    }

    updateSEO({
      title: guide.metaTitle,
      description: guide.metaDescription,
      canonicalPath: `/blog/${guide.slug}`,
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      authorName: guide.author.name,
      schema: schemas
    });
  }, [guide, slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Guide Not Found</h1>
          <p className="text-sm text-slate-600">
            The guide or tutorial you are looking for does not exist or may have been moved.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 hover:bg-blue-500 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Guides Hub
          </button>
        </div>
      </div>
    );
  }

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Guides
          </button>

          <nav className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-slate-700"
            >
              Home
            </a>
            <span>/</span>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="hover:text-slate-700"
            >
              Guides
            </a>
            <span>/</span>
            <span className="text-slate-700 font-semibold truncate max-w-[200px]">{guide.title}</span>
          </nav>
        </div>

        {/* Article Main Card */}
        <article className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Header Metadata */}
          <header className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                {guide.category}
              </span>
              <div className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={guide.publishedDate}>Published {guide.publishedDate}</time>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{guide.readTimeMinutes} min read</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {guide.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {guide.summary}
            </p>

            {/* Author Byline & E-E-A-T */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  {guide.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {guide.author.name}
                    <span title="Verified Author">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{guide.author.role}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {guide.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Featured Tool Callout Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Companion Interactive Tool</div>
                <div className="text-sm font-extrabold text-slate-900">Need instant calculations for this topic?</div>
                <div className="text-xs text-slate-600 mt-0.5">Use our verified client-side calculator without sign-ups or ads.</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(`/calculators/${guide.primaryCalculatorSlug}`)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 shrink-0"
            >
              Open Calculator <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Article Structured Body Sections */}
          <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pt-2 border-t border-slate-100">
                  {section.heading}
                </h2>

                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}

                {/* Section Table if present */}
                {section.table && (
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs my-4 shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="py-2.5 px-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Section Callout */}
                {section.callout && (
                  <div className="p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl space-y-1.5 my-3">
                    <div className="text-xs font-bold text-slate-900">{section.callout.title}</div>
                    <p className="text-xs text-slate-600">{section.callout.text}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/calculators/${section.callout?.calculatorSlug}`)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center gap-1 pt-1"
                    >
                      Try {section.callout.calculatorName} →
                    </button>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* FAQs Section */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="pt-6 border-t border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {guide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools Footer Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span>Related Calculators:</span>
              {guide.relatedCalculatorSlugs.map((rSlug) => (
                <button
                  key={rSlug}
                  type="button"
                  onClick={() => onNavigate(`/calculators/${rSlug}`)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold transition-colors cursor-pointer"
                >
                  {rSlug.replace(/-/g, ' ')}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Guide link copied to clipboard!');
                }
              }}
              className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" /> Share Guide
            </button>
          </div>
        </article>

        {/* More Guides Grid */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-slate-900">More Calculation Tutorials & Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherGuides.map((g) => (
              <div
                key={g.slug}
                onClick={() => onNavigate(`/blog/${g.slug}`)}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{g.category}</span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{g.summary}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center justify-between">
                  <span>{g.readTimeMinutes} min read</span>
                  <span className="group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

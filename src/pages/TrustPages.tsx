import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';
import { EDITORIAL_TEAM } from '../data/editorialTeam';

interface TrustPageProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (href: string) => void;
}

export const TrustPages: React.FC<TrustPageProps> = ({ type, onNavigate }) => {
  useEffect(() => {
    const titles: Record<string, string> = {
      about: 'About Everyday Calculator Hub - Mathematical Accuracy & Mission',
      contact: 'Contact Everyday Calculator Hub - Inquiries & Suggestions',
      privacy: 'Privacy Policy - Everyday Calculator Hub',
      terms: 'Terms of Use - Everyday Calculator Hub',
      disclaimer: 'General & Informational Disclaimer - Everyday Calculator Hub'
    };
    const descriptions: Record<string, string> = {
      about: 'Meet the editors behind Everyday Calculator Hub and our mission: free, accurate, private calculators verified against ISO, NIST, and WHO standards.',
      contact: 'Contact the Everyday Calculator Hub editors with feedback, corrections, or new calculator suggestions. Typical response within 1-2 business days.',
      privacy: 'How Everyday Calculator Hub protects you: client-side computation, local-only storage, and privacy-respecting ads under GDPR and CCPA rules.',
      terms: 'The rules for using Everyday Calculator Hub: permitted personal and commercial use, scraping limits, and limitation of liability.',
      disclaimer: 'Why calculator results are estimates: financial, construction, and health tools need professional verification before binding decisions.'
    };

    updateSEO({
      title: titles[type] || 'Everyday Calculator Hub',
      description: descriptions[type] || descriptions.about,
      canonicalPath: `/${type === 'privacy' ? 'privacy-policy' : type === 'terms' ? 'terms-of-use' : type}`
    });
  }, [type]);

  const breadcrumbs = [
    {
      name:
        type === 'about'
          ? 'About'
          : type === 'contact'
          ? 'Contact'
          : type === 'privacy'
          ? 'Privacy Policy'
          : type === 'terms'
          ? 'Terms of Use'
          : 'Disclaimer',
      href: `/${type}`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {type === 'about' && (
        <article className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            About Everyday Calculator Hub
          </h1>
          <p className="text-base text-slate-600 font-medium">
            Everyday Calculator Hub is an independent, free consumer utility developed to make everyday calculations, unit conversions, and quantitative decisions effortless.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            Our Mathematical Philosophy
          </h2>
          <p>
            When people search Google for a calculator, they usually have an immediate real-world task: verifying a restaurant tip, figuring out how many gallons of paint to purchase, calculating elapsed business days between invoices, or converting metric and imperial measurements.
          </p>
          <p>
            We believe consumer utilities should be:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Free of barriers:</strong> No accounts, no subscriptions, no forced email capture, and no login walls.</li>
            <li><strong>Mathematically accurate:</strong> Verified formulas based on international standards (ISO 8601 calendar formats, NIST conversion factors, and verified financial equations).</li>
            <li><strong>Privacy-preserving:</strong> Calculations run directly in your local browser runtime. We never transmit your private financial or numerical inputs to a remote server.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            Target Audience & Geographic Coverage
          </h2>
          <p>
            Our calculators support common formatting conventions for the United States, Canada, the United Kingdom, Australia, and New Zealand. Users can switch between Imperial and Metric measurements and locale-specific currency notation at any time via the regional selector in the top bar.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">
            Who Reviews Our Calculators?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EDITORIAL_TEAM.map((member) => (
              <div key={member.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900 text-sm">{member.name}</div>
                <div className="text-xs font-semibold text-blue-600">{member.role}</div>
                <div className="text-xs text-slate-500">{member.credentials}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">{member.bio}</p>
              </div>
            ))}
          </div>
        </article>
      )}

      {type === 'contact' && (
        <article className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact & Suggestions
          </h1>
          <p>
            Have feedback, noticed an edge-case calculation discrepancy, or want to suggest a new everyday calculator? We review all user submissions to continually refine our tool library.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
              Editorial & Webmaster Office
            </div>
            <div className="text-sm">
              Email: <span className="font-mono text-blue-600 font-medium">contact@everydaycalculatorhub.com</span>
            </div>
            <div className="text-xs text-slate-500">
              Response time is typically within 1–2 business days.
            </div>
          </div>
        </article>
      )}

      {type === 'privacy' && (
        <article className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>

          <p>
            Your privacy is paramount. Everyday Calculator Hub is designed from the ground up as a client-side calculation utility.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">
            1. Information Processed Locally
          </h2>
          <p>
            All inputs entered into our calculator fields (e.g. dollar amounts, wages, dimensions, dates, and numbers) are computed inside your local web browser. None of this data is logged, transmitted, or stored on our servers.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">
            2. Local Browser Storage
          </h2>
          <p>
            If you enable the calculation history or customize regional locale settings, these preferences are stored exclusively on your device using HTML5 LocalStorage. You can clear this data at any moment using the &quot;Clear History&quot; button.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">
            3. Advertising & Analytics
          </h2>
          <p>
            This website is monetized through standard display advertisements from third-party certified advertising partners (such as Google AdSense). These third parties may utilize privacy-respecting cookies or web beacons in accordance with applicable regional privacy regulations (GDPR, CCPA/CPRA).
          </p>
        </article>
      )}

      {type === 'terms' && (
        <article className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-400">Last updated: October 2026</p>

          <p>
            By accessing or using Everyday Calculator Hub, you agree to be bound by these Terms of Use. If you do not agree, please do not use the website.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">
            1. Permitted Personal & Commercial Use
          </h2>
          <p>
            You are free to use our online calculators and converters for personal, academic, and business calculation purposes free of charge. You may not scrape, clone, or redistribute the software engine in bulk.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">
            2. Limitation of Liability
          </h2>
          <p>
            Every calculation tool is provided &quot;as is&quot; without warranties of any kind. Everyday Calculator Hub is not liable for financial loss, project construction overages, or scheduling decisions resulting from estimates generated on this platform.
          </p>
        </article>
      )}

      {type === 'disclaimer' && (
        <article className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-2xl border border-slate-200">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            General & Informational Disclaimer
          </h1>

          <p>
            The calculations, formulas, and estimates provided on Everyday Calculator Hub are intended for general educational, estimation, and informational purposes only.
          </p>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
            <h3 className="font-bold text-sm">Financial & Tax Estimates</h3>
            <p>
              Calculators estimating sales tax, interest, commission, or salary conversions are models. They do not account for individual tax deductions, local municipal exemptions, or statutory withholdings. Always consult a Certified Public Accountant (CPA) or licensed financial planner for binding financial advice.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs text-blue-900">
            <h3 className="font-bold text-sm">Home & Construction Calculations</h3>
            <p>
              Estimates for concrete, paint, flooring, and tiles include standard industry waste allowances (e.g. 10%). Actual material requirements depend on contractor practices, substrate quality, irregular room angles, and manufacturer-specific recommendations.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-900">
            <h3 className="font-bold text-sm">Health & Pace Utilities</h3>
            <p>
              Tools such as running pace estimators and reference Body Mass Index (BMI) calculators are general population screening utilities. They are not medical diagnostic tools. Always consult a qualified medical professional for health, weight, or fitness programs.
            </p>
          </div>
        </article>
      )}
    </div>
  );
};

import { ProgrammaticPageDefinition } from '../types/calculator';

/**
 * Bulk long-tail programmatic pages: "What is R% of B?" for common
 * rate x base combinations. Slugs already covered by hand-written pages
 * are skipped so lookups stay unique.
 */
const RATES = [5, 10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75];
const BASES = [50, 100, 150, 200, 250, 300, 500, 1000];

const HAND_WRITTEN_SLUGS = new Set(['20-percent-of-150', '15-percent-of-250']);

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);
}

function buildPage(rate: number, base: number): ProgrammaticPageDefinition {
  const slug = `${rate}-percent-of-${base}`;
  const decimal = fmt(rate / 100);
  const value = fmt((rate * base) / 100);
  return {
    slug,
    calculatorId: 'percentage-calculator',
    title: `What is ${rate} Percent of ${base}? Answer & Step-by-Step Calculation`,
    metaTitle: `What is ${rate}% of ${base}? - Exact Answer & How to Calculate`,
    metaDescription: `Find what ${rate}% of ${base} is with the exact answer (${value}), formula, decimal steps, and an interactive percentage calculator to test other numbers.`,
    h1: `What is ${rate} Percent of ${base}?`,
    initialInputs: { rate: String(rate), base: String(base) },
    resultSummary: `${rate}% of ${base} is ${value}.`,
    explanation: `To find ${rate} percent of ${base}, convert the rate into a decimal (${rate} / 100 = ${decimal}) and multiply by ${base}. Mathematically, ${decimal} x ${base} = ${value}. Shoppers use this exact math for discounts, diners for tips, and students for grades.`,
    workedSteps: [
      `Write ${rate}% as a fraction: ${rate}/100`,
      `Convert to decimal: ${rate} / 100 = ${decimal}`,
      `Multiply the decimal by the whole: ${decimal} x ${base} = ${value}`,
      `In currency: ${rate}% of $${base}.00 is $${value}`
    ],
    faqs: [
      {
        question: `How do you calculate ${rate}% of ${base}?`,
        answer: `Divide ${rate} by 100 to get ${decimal}, then multiply by ${base}. ${decimal} x ${base} = ${value}.`
      },
      {
        question: `What is ${rate}% of ${base} in dollars?`,
        answer: `It is $${value}. On a $${base} bill, a ${rate}% tip or discount equals $${value}.`
      },
      {
        question: `What is the formula for ${rate}% of ${base}?`,
        answer: `Value = (${rate} / 100) x ${base} = ${value}. Convert the percent to a decimal first, then multiply.`
      }
    ],
    datePublished: '2025-04-01',
    dateUpdated: '2026-10-01',
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Everyday & Money', href: '/category/everyday-finance' },
      { name: 'Percentage Calculator', href: '/calculators/percentage-calculator' },
      { name: `${rate}% of ${base}`, href: `/percentage/${slug}` }
    ],
    relatedPages: []
  };
}

function buildBulk(): ProgrammaticPageDefinition[] {
  const pages: ProgrammaticPageDefinition[] = [];
  const slugSet = new Set<string>(HAND_WRITTEN_SLUGS);
  for (const rate of RATES) {
    for (const base of BASES) {
      const slug = `${rate}-percent-of-${base}`;
      if (slugSet.has(slug)) continue;
      slugSet.add(slug);
      pages.push(buildPage(rate, base));
    }
  }
  // Related links: siblings that are guaranteed to exist.
  const allSlugs = new Set<string>([...HAND_WRITTEN_SLUGS, ...pages.map(p => p.slug)]);
  for (const page of pages) {
    const rate = Number(page.initialInputs.rate);
    const base = Number(page.initialInputs.base);
    const candidates = [
      `${rate}-percent-of-100`,
      `20-percent-of-${base}`,
      `${rate === 20 ? 15 : 20}-percent-of-${base === 100 ? 200 : 100}`
    ].filter(s => s !== page.slug && allSlugs.has(s));
    const seen = new Set<string>();
    const rels = candidates.filter(s => !seen.has(s) && (seen.add(s), true)).slice(0, 3);
    page.relatedPages = [
      { title: 'Percentage Calculator', href: '/calculators/percentage-calculator' },
      ...rels.map(s => {
        const m = s.match(/^(\d+)-percent-of-(\d+)$/);
        return { title: m ? `What is ${m[1]}% of ${m[2]}?` : s, href: `/percentage/${s}` };
      })
    ];
  }
  return pages;
}

export const BULK_PROGRAMMATIC_PAGES: ProgrammaticPageDefinition[] = buildBulk();

/** Canonical public URL for any programmatic page (fixes /percentage/ vs /days-until/ routing). */
export function getProgrammaticHref(page: Pick<ProgrammaticPageDefinition, 'slug'>): string {
  if (page.slug.startsWith('days-until-')) {
    return `/days-until/${page.slug.replace(/^days-until-/, '')}`;
  }
  return `/percentage/${page.slug}`;
}

import assert from 'node:assert/strict';
import test from 'node:test';
import { CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { GUIDES } from '../src/data/guides';
import { PROGRAMMATIC_PAGES } from '../src/data/programmaticPages';
import { getExtraFaqs } from '../src/data/seoEnrichment';
import { normalizePath, siteOrigin, SITE_ORIGIN_FALLBACK } from '../src/utils/seo';
import { formatCurrency, formatDate, formatNumber, safeParseFloat } from '../src/utils/formatters';

const unique = (values: string[]) => new Set(values).size === values.length;

test('calculator catalogue is complete and internally consistent', () => {
  assert.ok(CALCULATORS.length >= 50, `expected 50+ calculators, found ${CALCULATORS.length}`);
  assert.ok(unique(CALCULATORS.map(c => c.slug)), 'calculator slugs must be unique');

  const categoryIds = new Set(CATEGORIES.map(c => c.id));

  for (const calc of CALCULATORS) {
    assert.ok(calc.name.length > 0, `${calc.slug}: missing name`);
    assert.ok(calc.metaTitle.length >= 20, `${calc.slug}: meta title too short`);
    assert.ok(calc.metaDescription.length >= 50, `${calc.slug}: meta description too short`);
    assert.ok(categoryIds.has(calc.category), `${calc.slug}: unknown category ${calc.category}`);
    const faqCount = calc.faqs.length + getExtraFaqs(calc.id).length;
    assert.ok(faqCount >= 1, `${calc.slug}: needs at least one FAQ`);
    assert.ok(calc.howItWorks.length >= 2, `${calc.slug}: needs step-by-step instructions`);
  }
});

test('category taxonomy is unique', () => {
  assert.ok(unique(CATEGORIES.map(c => c.id)), 'category ids must be unique');
  assert.ok(unique(CATEGORIES.map(c => c.slug)), 'category slugs must be unique');
  assert.ok(CATEGORIES.length >= 6, 'expected at least six categories');
});

test('guides have unique slugs and a real byline', () => {
  assert.ok(GUIDES.length >= 10, `expected 10+ guides, found ${GUIDES.length}`);
  assert.ok(unique(GUIDES.map(g => g.slug)), 'guide slugs must be unique');

  for (const guide of GUIDES) {
    assert.equal(guide.author.name, 'Musfiqur Rahman Saimon', `${guide.slug}: unexpected byline`);
    assert.ok(guide.publishedDate <= guide.updatedDate, `${guide.slug}: updated before published`);
  }
});

test('programmatic landing pages have unique routes', () => {
  assert.ok(PROGRAMMATIC_PAGES.length >= 5);
  assert.ok(unique(PROGRAMMATIC_PAGES.map(p => p.slug)), 'programmatic slugs must be unique');
});

test('canonical helper produces the trailing-slash form Cloudflare serves', () => {
  assert.equal(normalizePath('/'), '/');
  assert.equal(normalizePath('/all-calculators'), '/all-calculators/');
  assert.equal(normalizePath('calculators/tip-calculator'), '/calculators/tip-calculator/');
  assert.equal(normalizePath('/blog?ref=home'), '/blog/');
});

test('siteOrigin falls back to the deployment URL outside the browser', () => {
  assert.equal(siteOrigin(), SITE_ORIGIN_FALLBACK);
});

test('formatters handle locales, invalid input, and messy strings', () => {
  assert.equal(formatNumber(1234.5, { decimals: 1 }), '1,234.5');
  assert.equal(formatNumber(Number.NaN), '0');
  assert.equal(formatCurrency(1234.5, 'US'), '$1,234.50');
  assert.equal(formatCurrency(Number.POSITIVE_INFINITY), '$0.00');
  assert.equal(formatDate(new Date('invalid')), '');
  assert.equal(safeParseFloat('$1,234.56'), 1234.56);
  assert.equal(safeParseFloat('not a number', 7), 7);
});

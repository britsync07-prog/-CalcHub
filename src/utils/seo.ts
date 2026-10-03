export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  image?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
}

export function updateSEO({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  schema,
  image,
  noindex = false,
  publishedTime,
  modifiedTime,
  authorName
}: SEOProps) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  const siteName = 'Everyday Calculator Hub';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  document.title = fullTitle;

  // 2. Helper to set or create meta tag
  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // 3. Standard Meta
  setMeta('name', 'description', description);

  // 4. OpenGraph
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', siteName);

  // Dynamic canonical URL resolution
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://everyday-calculator-hub-cw8.pages.dev';
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  setMeta('property', 'og:url', canonicalUrl);

  // 5. Twitter
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:card', 'summary_large_image');

  // 5b. Social share image (per-route override or site default)
  const shareImage = image && image.startsWith('http') ? image : `${baseUrl}${image || '/og-image.svg'}`;
  setMeta('property', 'og:image', shareImage);
  setMeta('name', 'twitter:image', shareImage);

  // 5c. Indexing control + article freshness signals
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
  if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
  if (authorName) setMeta('property', 'article:author', authorName);

  // 6. Canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 7. Schema.org JSON-LD injection
  const existingJsonLd = document.querySelectorAll('script[data-seo-jsonld="true"]');
  existingJsonLd.forEach(el => el.remove());

  if (schema) {
    const schemas = Array.isArray(schema) ? schema : [schema];
    schemas.forEach(item => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }
}

export function generateCalculatorSchema({
  name,
  description,
  url,
  category
}: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Everyday Calculator Hub',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://everyday-calculator-hub-cw8.pages.dev'
    }
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://everyday-calculator-hub-cw8.pages.dev';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`
    }))
  };
}

export const SITE_ORIGIN_FALLBACK = 'https://everyday-calculator-hub-cw8.pages.dev';

export function siteOrigin(): string {
  return typeof window !== 'undefined' ? window.location.origin : SITE_ORIGIN_FALLBACK;
}

export function generateHowToSchema({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  if (!steps || steps.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text
    }))
  };
}

export function generateSpeakableSchema(cssSelectors: string[]) {
  if (!cssSelectors || cssSelectors.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors
    }
  };
}

export function generateOrganizationSchema() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'Everyday Calculator Hub',
    url: origin,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/og-image.svg`
    },
    description:
      'Everyday Calculator Hub publishes free, client-side calculators and converters for everyday math, personal finance, dates, measurements, and home improvement.',
    foundingDate: '2025-01-15',
    sameAs: [
      'https://x.com/everydaycalchub',
      'https://www.youtube.com/@everydaycalculatorhub',
      'https://www.pinterest.com/everydaycalculatorhub/'
    ]
  };
}

export function generateWebSiteSchema() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: 'Everyday Calculator Hub',
    url: origin,
    publisher: {
      '@id': `${origin}/#organization`
    },
    inLanguage: 'en-US'
  };
}

export function generateAuthorSchema(member: { name: string; role: string }) {
  return {
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      '@id': `${siteOrigin()}/#organization`
    }
  };
}

export function withArticleDates(
  schema: Record<string, unknown>,
  datePublished?: string,
  dateUpdated?: string,
  author?: { name: string; role: string }
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...schema };
  if (datePublished) out.datePublished = datePublished;
  if (dateUpdated) out.dateModified = dateUpdated;
  if (author) out.author = generateAuthorSchema(author);
  return out;
}

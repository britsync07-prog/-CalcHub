import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { CALCULATORS } from '../src/data/calculators';
import { CATEGORIES } from '../src/data/categories';
import { GUIDES } from '../src/data/guides';
import { PROGRAMMATIC_PAGES } from '../src/data/programmaticPages';
import {
  generateCalculatorSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
  generateSpeakableSchema,
  generateBlogPostingSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  withArticleDates
} from '../src/utils/seo';
import {
  getCalculatorDates,
  getCalculatorAuthor,
  getExtraFaqs,
  DEFAULT_DATE_PUBLISHED,
  DEFAULT_DATE_UPDATED
} from '../src/data/seoEnrichment';

const BASE_URL = 'https://everyday-calculator-hub-cw8.pages.dev';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

interface RouteConfig {
  path: string;
  outputPath: string;
  title: string;
  description: string;
  canonicalPath: string;
  type?: 'website' | 'article';
  image?: string;
  schemas: Record<string, unknown>[];
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
  inSitemap: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function runPrerender() {
  console.log('🚀 Starting Static Pre-rendering Pipeline for Cloudflare Pages SSG...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Build template not found at ${TEMPLATE_PATH}. Run "npm run build" first!`);
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes: RouteConfig[] = [];

  // 1. Homepage
  routes.push({
    path: '/',
    outputPath: path.join(DIST_DIR, 'index.html'),
    title: 'Everyday Calculator Hub - Free Online Calculators & Converters',
    description: 'Fast, free, and accurate everyday online calculators and converters for math, finance, dates, measurements, and home improvement. 100% private, instant client-side math.',
    canonicalPath: '/',
    schemas: [generateOrganizationSchema(), generateWebSiteSchema()],
    changefreq: 'daily',
    priority: 1.0,
    inSitemap: true
  });

  // 2. All Calculators Directory
  routes.push({
    path: '/all-calculators',
    outputPath: path.join(DIST_DIR, 'all-calculators', 'index.html'),
    title: 'All 55+ Free Online Calculators & Converters | Everyday Calculator Hub',
    description: 'Browse our complete directory of 55+ fast, client-side everyday calculators and unit converters across finance, dates, math, home improvement, and health.',
    canonicalPath: '/all-calculators',
    schemas: [
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'All Calculators', url: '/all-calculators' }
      ])
    ],
    changefreq: 'weekly',
    priority: 0.9,
    inSitemap: true
  });

  // 3. Blog Hub
  routes.push({
    path: '/blog',
    outputPath: path.join(DIST_DIR, 'blog', 'index.html'),
    title: 'Calculators & Everyday Math Guides | Everyday Calculator Hub',
    description: 'Practical calculation guides, tipping etiquette, baking conversions, remodeling estimates, and real-world math breakdowns written by everyday specialists.',
    canonicalPath: '/blog',
    schemas: [
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Guides & Articles', url: '/blog' }
      ])
    ],
    changefreq: 'weekly',
    priority: 0.9,
    inSitemap: true
  });

  // 4. Categories
  for (const cat of CATEGORIES) {
    routes.push({
      path: `/category/${cat.id}`,
      outputPath: path.join(DIST_DIR, 'category', cat.id, 'index.html'),
      title: `${cat.name} Calculators & Tools | Everyday Calculator Hub`,
      description: `${cat.description} Fast, verified, and completely client-side.`,
      canonicalPath: `/category/${cat.id}`,
      schemas: [
        generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: cat.name, url: `/category/${cat.id}` }
        ])
      ],
      changefreq: 'weekly',
      priority: 0.8,
      inSitemap: true
    });
  }

  // 5. Calculators (55 Core Tools) + Rival Alias Routes (/tools/:slug)
  const defaultDates = getCalculatorDates();
  for (const calc of CALCULATORS) {
    const author = getCalculatorAuthor(calc.category, calc.authorId);
    const pubDate = calc.datePublished || defaultDates.published;
    const updDate = calc.dateUpdated || defaultDates.updated;
    const faqs = [...calc.faqs, ...getExtraFaqs(calc.id)];

    const webAppSchema = withArticleDates(
      generateCalculatorSchema({
        name: calc.name,
        description: calc.metaDescription,
        url: `${BASE_URL}/calculators/${calc.slug}`,
        category: calc.category
      }),
      pubDate,
      updDate,
      author
    );

    const faqSchema = generateFaqSchema(faqs);
    const howToSchema = generateHowToSchema({
      name: `How to use the ${calc.name}`,
      description: calc.summary,
      steps: calc.howItWorks
    });
    const speakableSchema = generateSpeakableSchema(['.calculator-direct-answer', '.faq-answer']);
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: calc.category, url: `/category/${calc.category}` },
      { name: calc.name, url: `/calculators/${calc.slug}` }
    ]);

    const schemas: Record<string, unknown>[] = [webAppSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);
    if (howToSchema) schemas.push(howToSchema);
    if (speakableSchema) schemas.push(speakableSchema);

    // Primary canonical route
    routes.push({
      path: `/calculators/${calc.slug}`,
      outputPath: path.join(DIST_DIR, 'calculators', calc.slug, 'index.html'),
      title: calc.metaTitle,
      description: calc.metaDescription,
      canonicalPath: `/calculators/${calc.slug}`,
      schemas,
      changefreq: 'weekly',
      priority: 0.9,
      inSitemap: true
    });

    // Rival Alias Route (/tools/:slug) for backward-compatibility & competitor parity
    routes.push({
      path: `/tools/${calc.slug}`,
      outputPath: path.join(DIST_DIR, 'tools', calc.slug, 'index.html'),
      title: calc.metaTitle,
      description: calc.metaDescription,
      canonicalPath: `/calculators/${calc.slug}`, // Points canonical to primary URL
      schemas,
      changefreq: 'monthly',
      priority: 0.5,
      inSitemap: false // Omit alias from sitemap to prevent split ranking signals
    });
  }

  // 6. Blog & Editorial Guides (10 Articles)
  for (const guide of GUIDES) {
    const blogPostingSchema = generateBlogPostingSchema({
      title: guide.title,
      description: guide.metaDescription,
      url: `/blog/${guide.slug}`,
      datePublished: guide.publishedDate,
      dateModified: guide.updatedDate,
      authorName: guide.author.name,
      wordCount: guide.readTimeMinutes * 220
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/blog' },
      { name: guide.title, url: `/blog/${guide.slug}` }
    ]);

    const schemas: Record<string, unknown>[] = [blogPostingSchema, breadcrumbSchema];
    if (guide.faqs && guide.faqs.length > 0) {
      const faqSchema = generateFaqSchema(guide.faqs);
      if (faqSchema) schemas.push(faqSchema);
    }

    routes.push({
      path: `/blog/${guide.slug}`,
      outputPath: path.join(DIST_DIR, 'blog', guide.slug, 'index.html'),
      title: guide.metaTitle,
      description: guide.metaDescription,
      canonicalPath: `/blog/${guide.slug}`,
      type: 'article',
      schemas,
      changefreq: 'weekly',
      priority: 0.85,
      inSitemap: true
    });
  }

  // 7. Programmatic Problem Pages
  for (const prog of PROGRAMMATIC_PAGES) {
    const isHoliday = prog.slug.startsWith('days-until-');
    const routePath = isHoliday ? `/days-until/${prog.slug.replace('days-until-', '')}` : `/percentage/${prog.slug}`;

    const breadcrumbSchema = generateBreadcrumbSchema(
      prog.breadcrumbs.map(b => ({ name: b.name, url: b.href }))
    );

    const schemas: Record<string, unknown>[] = [breadcrumbSchema];
    if (prog.faqs && prog.faqs.length > 0) {
      const faqSchema = generateFaqSchema(prog.faqs);
      if (faqSchema) schemas.push(faqSchema);
    }

    routes.push({
      path: routePath,
      outputPath: path.join(DIST_DIR, isHoliday ? 'days-until' : 'percentage', isHoliday ? prog.slug.replace('days-until-', '') : prog.slug, 'index.html'),
      title: prog.metaTitle.includes('Everyday Calculator Hub') ? prog.metaTitle : `${prog.metaTitle} | Everyday Calculator Hub`,
      description: prog.metaDescription,
      canonicalPath: routePath,
      schemas,
      changefreq: 'weekly',
      priority: 0.8,
      inSitemap: true
    });
  }

  // 8. Trust & Compliance Pages
  const trustConfigs = [
    { path: '/about', title: 'About Us & Editorial Standards', desc: 'Learn about Everyday Calculator Hub, our methodology, editorial principles, and expert authors.' },
    { path: '/contact', title: 'Contact Us & Feature Requests', desc: 'Get in touch with the Everyday Calculator Hub engineering and editorial team.' },
    { path: '/privacy-policy', title: 'Privacy Policy', desc: 'Our privacy commitment: zero server-side computation storage, client-side only calculations.' },
    { path: '/privacy', title: 'Privacy Policy', desc: 'Our privacy commitment: zero server-side computation storage, client-side only calculations.', canonical: '/privacy-policy', alias: true },
    { path: '/terms-of-use', title: 'Terms of Use & Disclaimer', desc: 'Terms of service and computational disclaimer for Everyday Calculator Hub.' },
    { path: '/terms', title: 'Terms of Use', desc: 'Terms of service and computational disclaimer for Everyday Calculator Hub.', canonical: '/terms-of-use', alias: true },
    { path: '/disclaimer', title: 'Computational & Financial Disclaimer', desc: 'Mathematical accuracy disclaimer for all financial, fitness, and construction calculators.' },
    { path: '/sitemap', title: 'HTML Sitemap - All Tools & Pages', desc: 'Complete visual index of every calculator, category, guide, and resource.' },
    { path: '/seo-strategy', title: 'SEO Architecture & Technical Verification', desc: 'Verified technical specifications, schema validation, and crawl architecture.' }
  ];

  for (const t of trustConfigs) {
    const canonical = t.canonical || t.path;
    routes.push({
      path: t.path,
      outputPath: path.join(DIST_DIR, t.path.replace(/^\//, ''), 'index.html'),
      title: `${t.title} | Everyday Calculator Hub`,
      description: t.desc,
      canonicalPath: canonical,
      schemas: [
        generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: t.title, url: canonical }
        ])
      ],
      changefreq: 'monthly',
      priority: 0.4,
      inSitemap: !t.alias && t.path !== '/seo-strategy'
    });
  }

  // 9. 404 Fallback Page (Cloudflare Pages serves 404.html automatically on unrouted hits)
  routes.push({
    path: '/404',
    outputPath: path.join(DIST_DIR, '404.html'),
    title: 'Page Not Found (404) - Everyday Calculator Hub',
    description: 'The requested calculation page could not be found.',
    canonicalPath: '/404',
    schemas: [],
    changefreq: 'monthly',
    priority: 0.1,
    inSitemap: false
  });

  console.log(`📦 Compiling and pre-rendering ${routes.length} static HTML pages...`);

  let renderedCount = 0;
  for (const route of routes) {
    try {
      // 1. Render App to static HTML string
      const appHtml = renderToString(React.createElement(App, { initialPath: route.path }));

      // 2. Prepare Meta and Schema Head Tags
      const canonicalUrl = `${BASE_URL}${route.canonicalPath}`;
      const safeTitle = escapeHtml(route.title);
      const safeDesc = escapeHtml(route.description);
      const ogType = route.type || 'website';
      const ogImage = route.image || `${BASE_URL}/og-image.svg`;

      // Schemas JSON-LD
      const schemaScripts = route.schemas
        .map(s => `\n    <script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`)
        .join('');

      // 3. Inject into base template
      let html = rawTemplate;

      // Replace Title
      html = html.replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`);

      // Replace Description
      html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${safeDesc}" />`);

      // Replace OpenGraph
      html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${safeTitle}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${safeDesc}" />`);
      html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
      html = html.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${ogType}" />`);
      html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${ogImage}" />`);

      // Replace Twitter
      html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
      html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${safeDesc}" />`);
      html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${ogImage}" />`);

      // Inject Canonical Link & Schemas before </head>
      const headInjection = `    <link rel="canonical" href="${canonicalUrl}" />${schemaScripts}\n  </head>`;
      html = html.replace('</head>', headInjection);

      // Inject Rendered Root Body
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 4. Ensure destination directory exists and write file
      const outDir = path.dirname(route.outputPath);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(route.outputPath, html, 'utf-8');
      renderedCount++;
    } catch (err) {
      console.error(`❌ Error pre-rendering route ${route.path}:`, err);
    }
  }

  console.log(`✅ Successfully pre-rendered ${renderedCount}/${routes.length} pages into static HTML!`);

  // 10. Generate Complete XML Sitemap
  console.log('🗺️ Generating updated canonical XML sitemap...');
  const today = new Date().toISOString().split('T')[0];
  const sitemapRoutes = routes.filter(r => r.inSitemap);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    r => `  <url>
    <loc>${BASE_URL}${r.canonicalPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  // Write sitemap to both dist/ and public/
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(process.cwd(), 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`✅ Generated canonical sitemap with ${sitemapRoutes.length} indexed URLs at dist/sitemap.xml and public/sitemap.xml!`);

  // 11. Ensure robots.txt in dist/
  const robotsSrc = path.resolve(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, path.join(DIST_DIR, 'robots.txt'));
  }
  const llmsSrc = path.resolve(process.cwd(), 'public', 'llms.txt');
  if (fs.existsSync(llmsSrc)) {
    fs.copyFileSync(llmsSrc, path.join(DIST_DIR, 'llms.txt'));
  }

  console.log('🎉 Static Pre-rendering & SEO Dominance Generation Complete!');
}

runPrerender().catch(err => {
  console.error('Fatal error in SSG pipeline:', err);
  process.exit(1);
});

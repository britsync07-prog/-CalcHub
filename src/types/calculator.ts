export type CategoryId = 
  | 'everyday-finance'
  | 'date-time'
  | 'math-stats'
  | 'converters'
  | 'home-improvement'
  | 'health-fitness';

export type RegionalLocale = 'US' | 'UK' | 'CA' | 'AU';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculationStep {
  label: string;
  formula?: string;
  value: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface ComparisonTable {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export interface CalculatorDefinition {
  id: string;
  slug: string; // e.g. "percentage-calculator"
  name: string;
  shortName: string;
  category: CategoryId;
  subcategory: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  /** One-sentence "X is..." definition for featured-snippet / AI extraction. Optional: falls back to generated text. */
  definition?: string;
  /** ISO date strings. Optional: enrichment defaults apply. */
  datePublished?: string;
  dateUpdated?: string;
  /** Editorial team member ids. Optional: enrichment defaults apply. */
  authorId?: string;
  reviewerId?: string;
  /** External authoritative references. Optional: enrichment defaults apply. */
  sources?: Source[];
  /** Comparison table rendered as a real <table>. Optional. */
  comparisonTable?: ComparisonTable;
  searchKeywords: string[];
  formula: {
    expression: string;
    description: string;
    variables: { symbol: string; explanation: string }[];
  };
  howItWorks: string[];
  example: {
    scenario: string;
    inputs: Record<string, string>;
    steps: string[];
    result: string;
  };
  faqs: FAQItem[];
  relatedSlugs: string[];
  popular?: boolean;
  featured?: boolean;
  targetQueries: {
    head: string;
    midTail: string[];
    longTail: string[];
  };
}

export interface CategoryDefinition {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  heroText: string;
  targetKeywords: string[];
}

export interface ProgrammaticPageDefinition {
  slug: string; // e.g. "20-percent-of-150"
  calculatorId: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  initialInputs: Record<string, string | number>;
  explanation: string;
  workedSteps: string[];
  resultSummary: string;
  breadcrumbs: { name: string; href: string }[];
  relatedPages: { title: string; href: string }[];
  faqs?: FAQItem[];
  datePublished?: string;
  dateUpdated?: string;
}

export interface CalculationHistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  inputSummary: string;
  resultSummary: string;
}

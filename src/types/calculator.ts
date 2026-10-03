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
}

export interface CalculationHistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  inputSummary: string;
  resultSummary: string;
}

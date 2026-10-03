import { ProgrammaticPageDefinition } from '../types/calculator';

export const PROGRAMMATIC_PAGES: ProgrammaticPageDefinition[] = [
  {
    slug: '20-percent-of-150',
    calculatorId: 'percentage-calculator',
    title: 'What is 20 Percent of 150? Answer & Step-by-Step Calculation',
    metaTitle: 'What is 20% of 150? - Exact Answer & How to Calculate',
    metaDescription: 'Find what 20% of 150 is with the exact answer (30), formula, decimal steps, and an interactive percentage calculator to test other numbers.',
    h1: 'What is 20 Percent of 150?',
    initialInputs: {
      rate: '20',
      base: '150'
    },
    resultSummary: '20% of 150 is 30.',
    explanation: 'To find 20 percent of 150, convert the percentage rate into a fraction or decimal (20 ÷ 100 = 0.20) and multiply it by 150. Mathematically, 0.20 × 150 = 30.',
    workedSteps: [
      'Write 20% as a fraction: 20/100',
      'Reduce the fraction: 20/100 = 1/5 = 0.20 in decimal format',
      'Multiply the decimal by the whole: 0.20 × 150 = 30',
      'Conclusion: 20 percent of 150 equals 30.'
    ],
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Everyday & Money', href: '/category/everyday-finance' },
      { name: 'Percentage Calculator', href: '/calculators/percentage-calculator' },
      { name: '20% of 150', href: '/percentage/20-percent-of-150' }
    ],
    relatedPages: [
      { title: 'What is 15% of 250?', href: '/percentage/15-percent-of-250' },
      { title: 'Percentage Calculator', href: '/calculators/percentage-calculator' },
      { title: 'Percent Change Calculator', href: '/calculators/percent-change-calculator' },
      { title: 'Discount Calculator', href: '/calculators/discount-calculator' }
    ]
  },
  {
    slug: '15-percent-of-250',
    calculatorId: 'percentage-calculator',
    title: 'What is 15 Percent of 250? Answer & Math Formula',
    metaTitle: 'What is 15% of 250? - Exact Answer & Calculation Steps',
    metaDescription: 'Calculate 15% of 250 with exact results (37.5), step-by-step mathematical working, and related everyday tip and discount formulas.',
    h1: 'What is 15 Percent of 250?',
    initialInputs: {
      rate: '15',
      base: '250'
    },
    resultSummary: '15% of 250 is 37.5.',
    explanation: 'To determine 15% of 250 (frequently used when calculating a 15% restaurant tip or shopping discount on $250), multiply 250 by 0.15 to get 37.5.',
    workedSteps: [
      'Convert 15% to decimal: 15 ÷ 100 = 0.15',
      'Multiply: 0.15 × 250 = 37.5',
      'In currency: 15% of $250.00 is $37.50'
    ],
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Everyday & Money', href: '/category/everyday-finance' },
      { name: 'Percentage Calculator', href: '/calculators/percentage-calculator' },
      { name: '15% of 250', href: '/percentage/15-percent-of-250' }
    ],
    relatedPages: [
      { title: 'What is 20% of 150?', href: '/percentage/20-percent-of-150' },
      { title: 'Tip Calculator', href: '/calculators/tip-calculator' },
      { title: 'Discount Calculator', href: '/calculators/discount-calculator' }
    ]
  },
  {
    slug: 'days-until-christmas',
    calculatorId: 'countdown-calculator',
    title: 'How Many Days Until Christmas? Live Holiday Countdown',
    metaTitle: 'How Many Days Until Christmas? - Live Countdown Timer',
    metaDescription: 'Accurate real-time countdown to Christmas Day (December 25). See exact calendar days, hours, minutes, and seconds remaining.',
    h1: 'How Many Days Until Christmas?',
    initialInputs: {
      holiday: 'christmas'
    },
    resultSummary: 'Live countdown to December 25.',
    explanation: 'Christmas Day is celebrated annually on December 25th. This tracker computes the exact remaining time down to the second in your local time zone.',
    workedSteps: [
      'Identify current local date and time',
      'Target December 25 of the current year (or next year if past Dec 25)',
      'Compute calendar days, sleeping sleeps, and remaining hours'
    ],
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Date & Time', href: '/category/date-time' },
      { name: 'Countdown Calculator', href: '/calculators/countdown-calculator' },
      { name: 'Days Until Christmas', href: '/days-until/christmas' }
    ],
    relatedPages: [
      { title: 'Days Until New Year', href: '/days-until/new-year' },
      { title: 'Days Until Halloween', href: '/days-until/halloween' },
      { title: 'Days Between Dates', href: '/calculators/days-between-dates' }
    ]
  },
  {
    slug: 'days-until-new-year',
    calculatorId: 'countdown-calculator',
    title: 'How Many Days Until New Year? Countdown to January 1',
    metaTitle: 'Days Until New Year - Exact Countdown Timer to January 1',
    metaDescription: 'Find out exactly how many days, hours, and minutes remain until New Year’s Day (January 1). Live interactive countdown tracker.',
    h1: 'How Many Days Until New Year?',
    initialInputs: {
      holiday: 'newyear'
    },
    resultSummary: 'Live countdown to January 1 midnight.',
    explanation: 'Count down to January 1st with real-time hours, minutes, and seconds calculation for holiday and resolution planning.',
    workedSteps: [
      'Take current timestamp',
      'Target midnight January 1 of upcoming year',
      'Display remaining time breakdown'
    ],
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Date & Time', href: '/category/date-time' },
      { name: 'Countdown Calculator', href: '/calculators/countdown-calculator' },
      { name: 'Days Until New Year', href: '/days-until/new-year' }
    ],
    relatedPages: [
      { title: 'Days Until Christmas', href: '/days-until/christmas' },
      { title: 'Days From Today Calculator', href: '/calculators/days-from-today' }
    ]
  },
  {
    slug: 'days-until-halloween',
    calculatorId: 'countdown-calculator',
    title: 'How Many Days Until Halloween? Countdown to October 31',
    metaTitle: 'Days Until Halloween - Live Countdown to October 31',
    metaDescription: 'Countdown the exact days, hours, and minutes until Halloween (October 31). Live seasonal event countdown calculator.',
    h1: 'How Many Days Until Halloween?',
    initialInputs: {
      holiday: 'halloween'
    },
    resultSummary: 'Live countdown to October 31.',
    explanation: 'Halloween takes place annually on October 31st. Track exactly how many days remain for costume planning and autumn decorating.',
    workedSteps: [
      'Determine current date',
      'Target upcoming October 31',
      'Calculate days and hours difference'
    ],
    breadcrumbs: [
      { name: 'Home', href: '/' },
      { name: 'Date & Time', href: '/category/date-time' },
      { name: 'Countdown Calculator', href: '/calculators/countdown-calculator' },
      { name: 'Days Until Halloween', href: '/days-until/halloween' }
    ],
    relatedPages: [
      { title: 'Days Until Christmas', href: '/days-until/christmas' },
      { title: 'Days Between Dates', href: '/calculators/days-between-dates' }
    ]
  }
];

export function getProgrammaticPageBySlug(slug: string): ProgrammaticPageDefinition | undefined {
  return PROGRAMMATIC_PAGES.find(p => p.slug === slug);
}

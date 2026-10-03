import { CalculatorDefinition } from '../types/calculator';

export const CALCULATORS: CalculatorDefinition[] = [
  // ==========================================
  // EVERYDAY & MONEY (14 Calculators)
  // ==========================================
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortName: 'Percentage',
    category: 'everyday-finance',
    subcategory: 'Percentages',
    metaTitle: 'Percentage Calculator - Fast, Free & Step-by-Step Online Tool',
    metaDescription: 'Calculate what is X percent of Y, find percentage increases and decreases, and solve percentage values with instant step-by-step math.',
    h1: 'Percentage Calculator',
    summary: 'Instantly calculate percentages, find what percent one number is of another, or determine the base value with simple step-by-step explanations.',
    searchKeywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'what is percent of', 'how to calculate percentage'],
    popular: true,
    featured: true,
    formula: {
      expression: 'P = (X / 100) × Y',
      description: 'Multiply the percentage fraction by the total base value.',
      variables: [
        { symbol: 'P', explanation: 'Resulting percentage value' },
        { symbol: 'X', explanation: 'Percentage rate' },
        { symbol: 'Y', explanation: 'Base or whole number' }
      ]
    },
    howItWorks: [
      'Convert the percentage into decimal form by dividing by 100.',
      'Multiply the decimal value by the total number.',
      'For reverse questions (e.g. what % is X of Y), divide X by Y and multiply by 100.'
    ],
    example: {
      scenario: 'Finding 15% of $120 for an invoice discount',
      inputs: { 'Percentage (X)': '15', 'Total (Y)': '120' },
      steps: [
        'Convert 15% to a decimal: 15 / 100 = 0.15',
        'Multiply 0.15 by 120: 0.15 × 120 = 18',
        'Therefore, 15% of 120 is 18.'
      ],
      result: '18'
    },
    faqs: [
      {
        question: 'How do I calculate what percent X is of Y?',
        answer: 'Divide the part (X) by the total (Y) and multiply by 100. For example, if you scored 42 out of 50, (42 ÷ 50) × 100 = 84%.'
      },
      {
        question: 'What is the formula to find the percentage of a number?',
        answer: 'The formula is: Value = (Percent ÷ 100) × Base Number. For 20% of 150: (20 ÷ 100) × 150 = 30.'
      }
    ],
    relatedSlugs: ['percent-change-calculator', 'percentage-difference-calculator', 'discount-calculator', 'tip-calculator', 'sales-tax-calculator'],
    targetQueries: {
      head: 'percentage calculator',
      midTail: ['percentage calculator online', 'calculate percentage of number'],
      longTail: ['what is 20 percent of 150', 'how do i find 15 percent of a number']
    }
  },
  {
    id: 'percent-change-calculator',
    slug: 'percent-change-calculator',
    name: 'Percent Change Calculator',
    shortName: 'Percent Change',
    category: 'everyday-finance',
    subcategory: 'Percentages',
    metaTitle: 'Percent Change Calculator - Percentage Increase & Decrease',
    metaDescription: 'Calculate the percentage increase or decrease between an initial value and a final value with clear mathematical steps and direction.',
    h1: 'Percent Change Calculator',
    summary: 'Calculate the rate of growth or reduction from an original number to a new number, showing whether it is an increase or decrease.',
    searchKeywords: ['percent change calculator', 'percentage increase calculator', 'percentage decrease calculator', 'rate of change formula'],
    popular: true,
    formula: {
      expression: 'Δ% = ((New Value - Old Value) / Old Value) × 100%',
      description: 'Subtract the initial value from the final value, divide by the absolute initial value, and multiply by 100.',
      variables: [
        { symbol: 'Δ%', explanation: 'Percentage change' },
        { symbol: 'Old Value', explanation: 'Original baseline figure' },
        { symbol: 'New Value', explanation: 'Updated or final figure' }
      ]
    },
    howItWorks: [
      'Take the new value and subtract the original value to find the raw difference.',
      'Divide the difference by the original baseline value.',
      'Multiply the resulting ratio by 100 to express it as a percentage.'
    ],
    example: {
      scenario: 'A product price changed from $80 to $100',
      inputs: { 'Original Value': '80', 'New Value': '100' },
      steps: [
        'Difference: 100 - 80 = +20',
        'Relative ratio: 20 / 80 = 0.25',
        'Percentage increase: 0.25 × 100% = +25%'
      ],
      result: '+25% Increase'
    },
    faqs: [
      {
        question: 'What does a negative percent change indicate?',
        answer: 'A negative percent change indicates a decrease from the original value to the new value.'
      },
      {
        question: 'Can percent change be greater than 100%?',
        answer: 'Yes. If a quantity doubles from 50 to 100, the increase is 100%. If it triples from 50 to 150, the increase is 200%.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'percentage-difference-calculator', 'markup-calculator', 'profit-margin-calculator'],
    targetQueries: {
      head: 'percent change calculator',
      midTail: ['percentage increase calculator', 'percentage decrease calculator'],
      longTail: ['how to calculate percent increase between two numbers', 'percent change from 80 to 100']
    }
  },
  {
    id: 'percentage-difference-calculator',
    slug: 'percentage-difference-calculator',
    name: 'Percentage Difference Calculator',
    shortName: 'Percent Difference',
    category: 'everyday-finance',
    subcategory: 'Percentages',
    metaTitle: 'Percentage Difference Calculator - Compare Two Values',
    metaDescription: 'Find the absolute percentage difference between two non-directional numbers using the average of both values as the denominator.',
    h1: 'Percentage Difference Calculator',
    summary: 'Compare two numbers when there is no established baseline or sequence. Uses the standard arithmetic average of the two numbers.',
    searchKeywords: ['percentage difference calculator', 'percent difference', 'difference between two percentages'],
    formula: {
      expression: 'Diff% = (|V₁ - V₂| / ((V₁ + V₂) / 2)) × 100%',
      description: 'Absolute difference divided by the average of the two values, multiplied by 100.',
      variables: [
        { symbol: 'V₁', explanation: 'First comparison value' },
        { symbol: 'V₂', explanation: 'Second comparison value' }
      ]
    },
    howItWorks: [
      'Calculate the absolute difference: |V₁ - V₂|.',
      'Calculate the arithmetic average: (V₁ + V₂) ÷ 2.',
      'Divide the difference by the average and multiply by 100.'
    ],
    example: {
      scenario: 'Comparing test score 85 with test score 95',
      inputs: { 'Value 1': '85', 'Value 2': '95' },
      steps: [
        'Absolute difference: |85 - 95| = 10',
        'Average: (85 + 95) / 2 = 90',
        'Percentage difference: (10 / 90) × 100% = 11.11%'
      ],
      result: '11.11%'
    },
    faqs: [
      {
        question: 'How is percent difference different from percent change?',
        answer: 'Percent change compares an old value to a new value with a clear direction. Percent difference compares two numbers where neither is considered the original starting point.'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'percent-change-calculator', 'ratio-calculator'],
    targetQueries: {
      head: 'percentage difference calculator',
      midTail: ['percent difference formula', 'how to calculate percent difference'],
      longTail: ['percentage difference between 85 and 95']
    }
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    shortName: 'Discount',
    category: 'everyday-finance',
    subcategory: 'Shopping & Retail',
    metaTitle: 'Discount Calculator - Sale Price & Total Savings',
    metaDescription: 'Calculate your final sale price and total dollar savings instantly. Supports percentage discounts, clearance markdowns, and additional coupons.',
    h1: 'Discount Calculator',
    summary: 'Quickly find how much money you save on sale items and determine your exact final checkout price after single or stacked discounts.',
    searchKeywords: ['discount calculator', 'sale price calculator', 'savings calculator', 'percent off calculator'],
    popular: true,
    featured: true,
    formula: {
      expression: 'Savings = Price × (Discount% / 100) ; Final = Price - Savings',
      description: 'Compute total money saved and subtract it from the initial ticket price.',
      variables: [
        { symbol: 'Price', explanation: 'Original retail price' },
        { symbol: 'Discount%', explanation: 'Promotional discount rate' }
      ]
    },
    howItWorks: [
      'Multiply the original item price by the discount percentage divided by 100.',
      'Subtract the discount amount from the original price to get the sale price.'
    ],
    example: {
      scenario: 'A $79.99 winter jacket is on sale for 30% off',
      inputs: { 'Original Price': '$79.99', 'Discount': '30%' },
      steps: [
        'Savings: $79.99 × 0.30 = $24.00',
        'Final sale price: $79.99 - $24.00 = $55.99'
      ],
      result: '$55.99 (Save $24.00)'
    },
    faqs: [
      {
        question: 'How do stacked discounts (e.g. 20% off plus an extra 10% off) work?',
        answer: 'Stacked discounts apply consecutively, not additively. 20% off $100 leaves $80, and the extra 10% off applies to $80 ($8 savings), giving a final price of $72 (a total 28% discount, not 30%).'
      }
    ],
    relatedSlugs: ['percentage-calculator', 'sales-tax-calculator', 'tip-calculator'],
    targetQueries: {
      head: 'discount calculator',
      midTail: ['percent off calculator', 'sale price calculator'],
      longTail: ['how much is 30 percent off 80 dollars', 'calculate 25 percent discount on 120']
    }
  },
  {
    id: 'sales-tax-calculator',
    slug: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    shortName: 'Sales Tax',
    category: 'everyday-finance',
    subcategory: 'Shopping & Retail',
    metaTitle: 'Sales Tax Calculator - Add or Remove Tax from Price',
    metaDescription: 'Calculate sales tax, total purchase cost, or reverse calculate the pre-tax price. Supports US, Canadian GST/HST, UK VAT, and Australian GST presets.',
    h1: 'Sales Tax Calculator',
    summary: 'Easily calculate sales tax on purchases, find the grand total including tax, or reverse-calculate the before-tax price from a receipt total.',
    searchKeywords: ['sales tax calculator', 'tax calculator', 'calculate sales tax', 'reverse tax calculator', 'vat calculator'],
    popular: true,
    formula: {
      expression: 'Tax Amount = Price × (Rate / 100) ; Total = Price + Tax Amount',
      description: 'Multiply price by tax rate to find tax, and sum both for the grand total.',
      variables: [
        { symbol: 'Price', explanation: 'Pre-tax net price' },
        { symbol: 'Rate', explanation: 'Tax percentage' }
      ]
    },
    howItWorks: [
      'Multiply the retail price by the tax rate decimal (e.g. 8.25% = 0.0825).',
      'Add the computed tax amount to the retail price for the gross checkout total.',
      'To reverse-calculate pre-tax price from total: Divide Total by (1 + Tax Rate / 100).'
    ],
    example: {
      scenario: 'Purchase of $149.50 with an 8.5% state and local sales tax',
      inputs: { 'Net Price': '$149.50', 'Tax Rate': '8.5%' },
      steps: [
        'Tax: $149.50 × 0.085 = $12.71',
        'Total with tax: $149.50 + $12.71 = $162.21'
      ],
      result: 'Total: $162.21 (Tax: $12.71)'
    },
    faqs: [
      {
        question: 'How do I calculate the price before tax if I know the total?',
        answer: 'Divide the total receipt amount by (1 + Tax Rate ÷ 100). For example, if you paid $108 with 8% tax: $108 ÷ 1.08 = $100.'
      }
    ],
    relatedSlugs: ['discount-calculator', 'percentage-calculator', 'tip-calculator'],
    targetQueries: {
      head: 'sales tax calculator',
      midTail: ['calculate sales tax online', 'reverse sales tax calculator'],
      longTail: ['how to calculate sales tax on 150 dollars', 'find price before tax']
    }
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    shortName: 'Tip',
    category: 'everyday-finance',
    subcategory: 'Dining & Hospitality',
    metaTitle: 'Tip Calculator - Quick Gratuity & Bill Split per Person',
    metaDescription: 'Calculate tip amount and split bills evenly among multiple guests. Standard 15%, 18%, 20% gratuity options with custom amounts.',
    h1: 'Tip Calculator',
    summary: 'Calculate restaurant gratuity and split dining tabs easily among friends with standard percentage options, custom rates, and round-up choices.',
    searchKeywords: ['tip calculator', 'gratuity calculator', 'split tip calculator', 'bill split calculator'],
    popular: true,
    formula: {
      expression: 'Tip = Bill × (Tip% / 100) ; Per Person = (Bill + Tip) / Guests',
      description: 'Multiply bill by tip percentage and divide the combined grand total by the number of paying diners.',
      variables: [
        { symbol: 'Bill', explanation: 'Pre-tip restaurant tab' },
        { symbol: 'Tip%', explanation: 'Selected gratuity rate' },
        { symbol: 'Guests', explanation: 'Number of people splitting' }
      ]
    },
    howItWorks: [
      'Enter the pre-tax or total bill amount.',
      'Select a preset tip rate (15%, 18%, 20%, 25%) or enter a custom rate.',
      'Choose the number of diners splitting the payment.'
    ],
    example: {
      scenario: 'A dinner bill of $84.00 split among 3 friends with an 18% tip',
      inputs: { 'Bill': '$84.00', 'Tip Rate': '18%', 'People': '3' },
      steps: [
        'Tip amount: $84.00 × 0.18 = $15.12',
        'Total with tip: $84.00 + $15.12 = $99.12',
        'Per person share: $99.12 ÷ 3 = $33.04 each'
      ],
      result: '$33.04 per person ($15.12 total tip)'
    },
    faqs: [
      {
        question: 'Should I calculate tip before or after sales tax?',
        answer: 'Etiquette in North America generally advises calculating gratuity on the food and beverage total before sales tax, though many patrons tip on the final post-tax amount for convenience.'
      }
    ],
    relatedSlugs: ['split-bill-calculator', 'discount-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'tip calculator',
      midTail: ['restaurant tip calculator', 'split bill tip calculator'],
      longTail: ['what is 20 percent tip on 65 dollars', 'how to split 85 dollar bill 3 ways']
    }
  },
  {
    id: 'split-bill-calculator',
    slug: 'split-bill-calculator',
    name: 'Split Bill Calculator',
    shortName: 'Split Bill',
    category: 'everyday-finance',
    subcategory: 'Dining & Hospitality',
    metaTitle: 'Split Bill Calculator - Fair Check Splitting with Tip & Tax',
    metaDescription: 'Split restaurant bills and group expenses evenly or proportionally with included tip and tax calculations.',
    h1: 'Split Bill Calculator',
    summary: 'Easily divide any group tab, dining check, or shared expense between 2 to 50 people with exact per-person totals.',
    searchKeywords: ['split bill calculator', 'split check calculator', 'split tab calculator', 'divide bill between friends'],
    formula: {
      expression: 'Share = (Bill + Tip + Tax) / Number of People',
      description: 'Total check amount divided by the headcount.',
      variables: [
        { symbol: 'Share', explanation: 'Individual payment responsibility' }
      ]
    },
    howItWorks: [
      'Enter the total check amount.',
      'Specify gratuity or extra fees.',
      'Set the number of people to obtain each individual share.'
    ],
    example: {
      scenario: 'Four colleagues sharing a $140 meal tab with a $25 tip',
      inputs: { 'Bill': '$140.00', 'Tip': '$25.00', 'People': '4' },
      steps: [
        'Total: $140.00 + $25.00 = $165.00',
        'Individual share: $165.00 ÷ 4 = $41.25'
      ],
      result: '$41.25 each'
    },
    faqs: [
      {
        question: 'Can I round each person’s share up to the nearest dollar?',
        answer: 'Yes, rounding up each share simplifies cash collection and covers small transaction discrepancies.'
      }
    ],
    relatedSlugs: ['tip-calculator', 'sales-tax-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'split bill calculator',
      midTail: ['divide bill calculator', 'split check evenly'],
      longTail: ['how to split a 120 dollar bill 5 ways']
    }
  },
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    shortName: 'Profit Margin',
    category: 'everyday-finance',
    subcategory: 'Business & Commerce',
    metaTitle: 'Profit Margin Calculator - Gross Margin & Markup Percentage',
    metaDescription: 'Calculate gross profit margin, markup percentage, and net profit from revenue and product cost of goods sold (COGS).',
    h1: 'Profit Margin Calculator',
    summary: 'Determine gross profit, profit margin percentage, and markup rate from your cost of goods sold and retail selling price.',
    searchKeywords: ['profit margin calculator', 'margin calculator', 'gross profit calculator', 'markup vs margin'],
    popular: true,
    formula: {
      expression: 'Margin% = ((Revenue - Cost) / Revenue) × 100%',
      description: 'Profit divided by selling price (revenue).',
      variables: [
        { symbol: 'Margin%', explanation: 'Gross profit margin percentage' },
        { symbol: 'Revenue', explanation: 'Selling price' },
        { symbol: 'Cost', explanation: 'Cost of goods sold (COGS)' }
      ]
    },
    howItWorks: [
      'Subtract the unit cost from the selling price to find gross dollar profit.',
      'Divide the dollar profit by the selling price to get margin percentage.',
      'Divide the dollar profit by the unit cost to get markup percentage.'
    ],
    example: {
      scenario: 'An item costs $40 to make and sells for $100',
      inputs: { 'Cost': '$40.00', 'Revenue': '$100.00' },
      steps: [
        'Gross Profit: $100 - $40 = $60',
        'Profit Margin: ($60 / $100) × 100% = 60.0%',
        'Markup: ($60 / $40) × 100% = 150.0%'
      ],
      result: '60.0% Margin ($60 Profit)'
    },
    faqs: [
      {
        question: 'What is the key difference between profit margin and markup?',
        answer: 'Profit margin is profit relative to the selling price ($ profit ÷ selling price). Markup is profit relative to cost ($ profit ÷ cost). Markup is always higher than margin for positive profits.'
      }
    ],
    relatedSlugs: ['markup-calculator', 'commission-calculator', 'percent-change-calculator'],
    targetQueries: {
      head: 'profit margin calculator',
      midTail: ['gross profit calculator', 'how to calculate profit margin'],
      longTail: ['what is margin if cost is 40 and sell is 100']
    }
  },
  {
    id: 'markup-calculator',
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    shortName: 'Markup',
    category: 'everyday-finance',
    subcategory: 'Business & Commerce',
    metaTitle: 'Markup Calculator - Find Selling Price from Cost & Markup',
    metaDescription: 'Calculate the target selling price, gross profit, and revenue needed to hit your desired markup percentage on products.',
    h1: 'Markup Calculator',
    summary: 'Easily set your retail price by applying a target markup percentage over product manufacturing or wholesale costs.',
    searchKeywords: ['markup calculator', 'cost markup calculator', 'calculate selling price from markup'],
    formula: {
      expression: 'Selling Price = Cost × (1 + Markup% / 100)',
      description: 'Cost multiplied by (1 + markup rate).',
      variables: [
        { symbol: 'Cost', explanation: 'Product wholesale cost' },
        { symbol: 'Markup%', explanation: 'Desired markup percentage' }
      ]
    },
    howItWorks: [
      'Enter the cost of the item.',
      'Enter your desired markup percentage.',
      'Calculate the required retail price and resulting profit.'
    ],
    example: {
      scenario: 'A product costs $50 with a target 40% markup',
      inputs: { 'Cost': '$50.00', 'Markup': '40%' },
      steps: [
        'Markup dollar amount: $50 × 0.40 = $20',
        'Selling price: $50 + $20 = $70',
        'Equivalent margin: ($20 / $70) × 100% = 28.57%'
      ],
      result: 'Selling Price: $70.00 (Profit: $20.00)'
    },
    faqs: [
      {
        question: 'How do I convert a 50% markup into a profit margin?',
        answer: 'Use the formula: Margin = Markup ÷ (1 + Markup). A 50% markup equals 0.50 ÷ 1.50 = 33.33% margin.'
      }
    ],
    relatedSlugs: ['profit-margin-calculator', 'commission-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'markup calculator',
      midTail: ['calculate markup percentage', 'selling price calculator'],
      longTail: ['how to calculate selling price with 40 percent markup']
    }
  },
  {
    id: 'commission-calculator',
    slug: 'commission-calculator',
    name: 'Commission Calculator',
    shortName: 'Commission',
    category: 'everyday-finance',
    subcategory: 'Business & Commerce',
    metaTitle: 'Commission Calculator - Sales Commission & Total Pay',
    metaDescription: 'Calculate sales rep commission, tiered payout rates, and total earnings based on sales volume and base salary.',
    h1: 'Commission Calculator',
    summary: 'Calculate sales earnings from commission rates, flat percentages, or combined base pay plus incentives.',
    searchKeywords: ['commission calculator', 'sales commission calculator', 'calculate commission pay'],
    formula: {
      expression: 'Commission = Sales Total × (Rate / 100) ; Total = Base Pay + Commission',
      description: 'Multiply total sales volume by agreed commission rate.',
      variables: [
        { symbol: 'Sales Total', explanation: 'Revenue generated' },
        { symbol: 'Rate', explanation: 'Commission rate percentage' }
      ]
    },
    howItWorks: [
      'Enter total sales revenue.',
      'Input the commission percentage.',
      'Optionally add regular base pay to get total earnings.'
    ],
    example: {
      scenario: 'Sold $65,000 worth of equipment at a 4.5% commission rate with $2,000 base pay',
      inputs: { 'Sales': '$65,000', 'Rate': '4.5%', 'Base': '$2,000' },
      steps: [
        'Commission: $65,000 × 0.045 = $2,925',
        'Total pay: $2,000 + $2,925 = $4,925'
      ],
      result: '$2,925 Commission ($4,925 Total Pay)'
    },
    faqs: [
      {
        question: 'What is a typical sales commission rate?',
        answer: 'Standard rates vary widely: retail often ranges from 5% to 15%, real estate typically spans 2.5% to 6%, and SaaS/B2B software spans 10% to 25% of contract value.'
      }
    ],
    relatedSlugs: ['profit-margin-calculator', 'hourly-to-salary-calculator', 'salary-to-hourly-calculator'],
    targetQueries: {
      head: 'commission calculator',
      midTail: ['sales commission calculator', 'calculate commission on sales'],
      longTail: ['how to calculate 5 percent commission on 50000']
    }
  },
  {
    id: 'simple-interest-calculator',
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortName: 'Simple Interest',
    category: 'everyday-finance',
    subcategory: 'Banking & Loans',
    metaTitle: 'Simple Interest Calculator - Interest & Total Maturity Value',
    metaDescription: 'Calculate simple interest, principal growth, and final loan or investment balances over days, months, or years using I = Prt.',
    h1: 'Simple Interest Calculator',
    summary: 'Calculate non-compounding interest earned on savings or owed on simple personal loans using the classic I = Prt formula.',
    searchKeywords: ['simple interest calculator', 'calculate simple interest', 'I=prt calculator', 'interest calculator'],
    formula: {
      expression: 'I = P × r × t ; Total = P + I',
      description: 'Principal times annual rate times time in years.',
      variables: [
        { symbol: 'I', explanation: 'Total interest accrued' },
        { symbol: 'P', explanation: 'Principal initial sum' },
        { symbol: 'r', explanation: 'Annual interest rate decimal (Rate/100)' },
        { symbol: 't', explanation: 'Time duration in years' }
      ]
    },
    howItWorks: [
      'Multiply the principal amount by the annual interest rate divided by 100.',
      'Multiply that figure by the time in years.',
      'Add accrued interest to the principal to get the total maturity value.'
    ],
    example: {
      scenario: 'Investing $5,000 at 6% simple annual interest for 3 years',
      inputs: { 'Principal': '$5,000', 'Rate': '6%', 'Years': '3' },
      steps: [
        'Interest: $5,000 × 0.06 × 3 = $900',
        'Total balance: $5,000 + $900 = $5,900'
      ],
      result: '$900 Interest ($5,900 Total)'
    },
    faqs: [
      {
        question: 'When is simple interest used instead of compound interest?',
        answer: 'Simple interest is standard for short-term personal notes, auto loans, Treasury bills, and basic promissory agreements where interest is not reinvested into the principal.'
      }
    ],
    relatedSlugs: ['compound-interest-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'simple interest calculator',
      midTail: ['calculate simple interest online', 'simple interest formula calculator'],
      longTail: ['simple interest on 5000 for 3 years at 6 percent']
    }
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortName: 'Compound Interest',
    category: 'everyday-finance',
    subcategory: 'Banking & Loans',
    metaTitle: 'Compound Interest Calculator - Future Value & Growth',
    metaDescription: 'Calculate compound interest growth with daily, monthly, quarterly, or annual compounding. See how your savings or investments multiply.',
    h1: 'Compound Interest Calculator',
    summary: 'Project future investment growth and compounding returns over time, showing the power of interest reinvestment.',
    searchKeywords: ['compound interest calculator', 'compound interest', 'future value calculator', 'calculate compound interest'],
    popular: true,
    formula: {
      expression: 'A = P(1 + r/n)^(nt)',
      description: 'Principal multiplied by (1 + rate/compounds) raised to total compounding periods.',
      variables: [
        { symbol: 'A', explanation: 'Final balance' },
        { symbol: 'P', explanation: 'Initial principal' },
        { symbol: 'r', explanation: 'Annual interest rate decimal' },
        { symbol: 'n', explanation: 'Compounding frequency per year' },
        { symbol: 't', explanation: 'Duration in years' }
      ]
    },
    howItWorks: [
      'Divide annual rate by compounding periods per year (e.g., 12 for monthly).',
      'Add 1 and raise to the power of (periods × years).',
      'Multiply by starting principal to calculate future balance.'
    ],
    example: {
      scenario: '$10,000 invested at 7% annual interest compounded monthly for 5 years',
      inputs: { 'Principal': '$10,000', 'Rate': '7%', 'Years': '5', 'Frequency': 'Monthly (12)' },
      steps: [
        'r/n = 0.07 / 12 = 0.005833',
        'Total periods: 12 × 5 = 60',
        'Compound factor: (1.005833)^60 = 1.4176',
        'Ending balance: $10,000 × 1.4176 = $14,176.25'
      ],
      result: '$14,176.25 ($4,176.25 Interest Earned)'
    },
    faqs: [
      {
        question: 'Why does more frequent compounding yield more money?',
        answer: 'Frequent compounding calculates interest on previously earned interest sooner, allowing earnings to start producing their own returns earlier.'
      }
    ],
    relatedSlugs: ['simple-interest-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'compound interest calculator',
      midTail: ['compound interest daily monthly', 'how to calculate compound interest'],
      longTail: ['what will 10000 grow to in 5 years at 7 percent']
    }
  },
  {
    id: 'hourly-to-salary-calculator',
    slug: 'hourly-to-salary-calculator',
    name: 'Hourly to Salary Calculator',
    shortName: 'Hourly to Salary',
    category: 'everyday-finance',
    subcategory: 'Income & Wages',
    metaTitle: 'Hourly to Salary Calculator - Wage to Annual Income Converter',
    metaDescription: 'Convert your hourly wage into annual, monthly, bi-weekly, and weekly gross income based on 40 hours per week or custom schedules.',
    h1: 'Hourly to Salary Calculator',
    summary: 'Convert an hourly pay rate into its equivalent annual salary, monthly paycheck, and bi-weekly take-home estimates.',
    searchKeywords: ['hourly to salary calculator', 'hourly to salary', 'convert hourly to annual salary', 'wage calculator'],
    popular: true,
    formula: {
      expression: 'Annual Salary = Hourly Rate × Hours per Week × Weeks per Year',
      description: 'Standard full-time calculation uses 40 hours per week and 52 weeks (2,080 annual hours).',
      variables: [
        { symbol: 'Annual Salary', explanation: 'Total annual gross pay' },
        { symbol: 'Hourly Rate', explanation: 'Wage per hour worked' }
      ]
    },
    howItWorks: [
      'Multiply the hourly wage by weekly scheduled hours (default 40).',
      'Multiply the weekly earnings by working weeks per year (default 52).',
      'Divide by 12 to find monthly gross salary.'
    ],
    example: {
      scenario: 'Converting $28.00 per hour at 40 hours/week into annual salary',
      inputs: { 'Hourly Rate': '$28.00', 'Hours/Week': '40', 'Weeks/Year': '52' },
      steps: [
        'Weekly gross: $28 × 40 = $1,120',
        'Bi-weekly gross: $1,120 × 2 = $2,240',
        'Annual salary: $1,120 × 52 = $58,240'
      ],
      result: '$58,240 / year ($4,853 / month)'
    },
    faqs: [
      {
        question: 'How many working hours are there in a standard working year?',
        answer: 'A standard full-time year (40 hours/week × 52 weeks) equals exactly 2,080 working hours.'
      }
    ],
    relatedSlugs: ['salary-to-hourly-calculator', 'commission-calculator'],
    targetQueries: {
      head: 'hourly to salary calculator',
      midTail: ['convert hourly to salary', '28 an hour is how much a year'],
      longTail: ['what is 35 dollars an hour annual salary full time']
    }
  },
  {
    id: 'salary-to-hourly-calculator',
    slug: 'salary-to-hourly-calculator',
    name: 'Salary to Hourly Calculator',
    shortName: 'Salary to Hourly',
    category: 'everyday-finance',
    subcategory: 'Income & Wages',
    metaTitle: 'Salary to Hourly Calculator - Annual Pay to Wage Converter',
    metaDescription: 'Convert your annual salary into equivalent hourly, daily, and weekly wage rates based on standard 40-hour workweeks.',
    h1: 'Salary to Hourly Calculator',
    summary: 'Break down an annual compensation package into exact hourly, daily, and weekly wage figures.',
    searchKeywords: ['salary to hourly calculator', 'salary to hourly', 'convert salary to hourly wage', 'annual to hourly'],
    popular: true,
    formula: {
      expression: 'Hourly Rate = Annual Salary / (Hours per Week × Weeks per Year)',
      description: 'Divide gross salary by 2,080 working hours (40 hrs × 52 weeks).',
      variables: [
        { symbol: 'Hourly Rate', explanation: 'Equivalent pay per hour' }
      ]
    },
    howItWorks: [
      'Take total annual salary before taxes and deductions.',
      'Divide by 52 to calculate the weekly pay rate.',
      'Divide weekly pay by standard work hours per week (e.g. 40 or 37.5).'
    ],
    example: {
      scenario: 'A $75,000 annual salary at 40 hours per week',
      inputs: { 'Annual Salary': '$75,000', 'Hours/Week': '40' },
      steps: [
        'Total annual hours: 40 × 52 = 2,080 hours',
        'Hourly wage: $75,000 ÷ 2,080 = $36.06 per hour'
      ],
      result: '$36.06 / hour ($1,442.31 / week)'
    },
    faqs: [
      {
        question: 'Does this calculator account for paid time off (PTO)?',
        answer: 'The standard calculation assumes a 52-week salaried year with paid holidays and vacation. If vacation is unpaid, adjust the weeks worked per year.'
      }
    ],
    relatedSlugs: ['hourly-to-salary-calculator', 'commission-calculator'],
    targetQueries: {
      head: 'salary to hourly calculator',
      midTail: ['annual to hourly calculator', '75k a year is how much an hour'],
      longTail: ['what is 60000 salary converted to hourly wage']
    }
  },

  // ==========================================
  // DATE & TIME (9 Calculators)
  // ==========================================
  {
    id: 'days-between-dates',
    slug: 'days-between-dates',
    name: 'Days Between Dates Calculator',
    shortName: 'Days Between Dates',
    category: 'date-time',
    subcategory: 'Date Intervals',
    metaTitle: 'Days Between Dates Calculator - Count Days, Weeks & Months',
    metaDescription: 'Calculate the exact number of days, weeks, and months between any two calendar dates. Includes leap years and day count breakdown.',
    h1: 'Days Between Dates Calculator',
    summary: 'Find the precise number of calendar days, weeks, or business days between any start and end date with zero guesswork.',
    searchKeywords: ['days between dates', 'days between dates calculator', 'number of days between two dates', 'count days between dates'],
    popular: true,
    featured: true,
    formula: {
      expression: 'Days = (End Date - Start Date) / (1000 × 60 × 60 × 24)',
      description: 'Subtract start timestamp from end timestamp in milliseconds and convert to whole days.',
      variables: [
        { symbol: 'Days', explanation: 'Total calendar days elapsed' }
      ]
    },
    howItWorks: [
      'Select your starting calendar date.',
      'Select your ending calendar date.',
      'Choose whether to include the end date in the total count.'
    ],
    example: {
      scenario: 'Counting days between June 1, 2026 and August 15, 2026',
      inputs: { 'Start Date': '2026-06-01', 'End Date': '2026-08-15' },
      steps: [
        'June: 29 remaining days',
        'July: 31 full days',
        'August: 15 days',
        'Total: 29 + 31 + 15 = 75 days (10 weeks and 5 days)'
      ],
      result: '75 days (10 weeks, 5 days)'
    },
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes, full calendar leap years (29 days in February) are automatically calculated using standard astronomical Gregorian rules.'
      }
    ],
    relatedSlugs: ['date-difference-calculator', 'days-from-today', 'business-days-calculator', 'age-calculator'],
    targetQueries: {
      head: 'days between dates',
      midTail: ['days between dates calculator', 'how many days between two dates'],
      longTail: ['how many days between june 1 and august 15', 'count calendar days between dates']
    }
  },
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    shortName: 'Date Difference',
    category: 'date-time',
    subcategory: 'Date Intervals',
    metaTitle: 'Date Difference Calculator - Years, Months & Days Elapsed',
    metaDescription: 'Calculate the comprehensive time duration between two dates expressed in years, months, weeks, days, hours, and minutes.',
    h1: 'Date Difference Calculator',
    summary: 'View exact chronological time intervals between two dates broken down into years, months, and days.',
    searchKeywords: ['date difference calculator', 'date difference', 'time between dates', 'calculate difference between two dates'],
    popular: true,
    formula: {
      expression: 'Interval = Exact Gregorian Calendar Delta(Date 1, Date 2)',
      description: 'Calculates chronological calendar years, months, and days accounting for varying month lengths.',
      variables: [{ symbol: 'Interval', explanation: 'Combined duration' }]
    },
    howItWorks: [
      'Pick a starting date and ending date.',
      'The engine computes exact completed calendar years, remaining months, and remaining days.'
    ],
    example: {
      scenario: 'Duration between March 15, 2023 and October 20, 2026',
      inputs: { 'Start': '2023-03-15', 'End': '2026-10-20' },
      steps: [
        'Years: March 15, 2023 to March 15, 2026 = 3 full years',
        'Months: March 15 to October 15 = 7 months',
        'Days: October 15 to October 20 = 5 days'
      ],
      result: '3 years, 7 months, 5 days'
    },
    faqs: [
      {
        question: 'How are months of different lengths handled?',
        answer: 'Each calendar month is evaluated using its true day count (28, 29, 30, or 31 days) based on the specific calendar years traversed.'
      }
    ],
    relatedSlugs: ['days-between-dates', 'age-calculator', 'countdown-calculator'],
    targetQueries: {
      head: 'date difference calculator',
      midTail: ['time duration between dates', 'calculate years months days between dates'],
      longTail: ['how many years months and days between two dates']
    }
  },
  {
    id: 'days-from-today',
    slug: 'days-from-today',
    name: 'Days From Today Calculator',
    shortName: 'Days From Today',
    category: 'date-time',
    subcategory: 'Date Intervals',
    metaTitle: 'Days From Today Calculator - Add or Subtract Days from Current Date',
    metaDescription: 'Find out what date will be in X days from today, or what the date was X days ago. Instant calendar lookup with day of the week.',
    h1: 'Days From Today Calculator',
    summary: 'Instantly determine future or past calendar dates by adding or subtracting days, weeks, or months from today.',
    searchKeywords: ['days from today', 'days from today calculator', 'what date will it be in 30 days', 'days ago calculator'],
    popular: true,
    formula: {
      expression: 'Target Date = Today ± Number of Days',
      description: 'Offset the current calendar date by the requested number of days.',
      variables: [{ symbol: 'Target Date', explanation: 'Resulting calendar date' }]
    },
    howItWorks: [
      'Enter the number of days you want to calculate.',
      'Select whether to project forward into the future or backwards into the past.',
      'View the resulting date and the day of the week.'
    ],
    example: {
      scenario: 'What date will it be in 45 days from today?',
      inputs: { 'Current Date': 'Today', 'Days to Add': '45' },
      steps: [
        'Add 45 calendar days to today’s timestamp',
        'Account for month end transitions and leap years',
        'Determine day of week and formatted date'
      ],
      result: 'Projected calendar date and day of week'
    },
    faqs: [
      {
        question: 'Can I add business days instead of calendar days?',
        answer: 'Yes, visit our Business Days Calculator for calculations that skip weekends and public holidays.'
      }
    ],
    relatedSlugs: ['days-between-dates', 'business-days-calculator', 'countdown-calculator'],
    targetQueries: {
      head: 'days from today',
      midTail: ['what date is 30 days from today', 'what date is 90 days from today'],
      longTail: ['what date will it be in 45 days from today']
    }
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortName: 'Age',
    category: 'date-time',
    subcategory: 'Personal Dates',
    metaTitle: 'Age Calculator - Exact Age in Years, Months, Days & Hours',
    metaDescription: 'Calculate your exact chronological age today in years, months, days, hours, and minutes. See your next birthday countdown.',
    h1: 'Age Calculator',
    summary: 'Calculate exact chronological age from date of birth down to the day, hour, and minute, plus days remaining until next birthday.',
    searchKeywords: ['age calculator', 'calculate age', 'how old am i', 'exact age calculator', 'birthday countdown'],
    popular: true,
    featured: true,
    formula: {
      expression: 'Age = Current Date - Date of Birth',
      description: 'Chronological time calculation accounting for leap years and month transitions.',
      variables: [{ symbol: 'Age', explanation: 'Completed age interval' }]
    },
    howItWorks: [
      'Enter your date of birth.',
      'Optionally specify a reference date other than today.',
      'Instantly see total years, months, days, total weeks lived, and total hours.'
    ],
    example: {
      scenario: 'Born on May 20, 1995 evaluated in 2026',
      inputs: { 'Date of Birth': 'May 20, 1995' },
      steps: [
        'Count completed years from 1995',
        'Count remaining months and days',
        'Compute total days lived and time until next birthday'
      ],
      result: '31 years, months, and days'
    },
    faqs: [
      {
        question: 'How is someone born on February 29 handled on non-leap years?',
        answer: 'Under legal convention in most jurisdictions, birthdays in non-leap years are recognized on March 1.'
      }
    ],
    relatedSlugs: ['date-difference-calculator', 'days-between-dates', 'countdown-calculator'],
    targetQueries: {
      head: 'age calculator',
      midTail: ['calculate my age', 'exact age in days'],
      longTail: ['how old am i if born in 1998', 'age calculator in years months days']
    }
  },
  {
    id: 'business-days-calculator',
    slug: 'business-days-calculator',
    name: 'Business Days Calculator',
    shortName: 'Business Days',
    category: 'date-time',
    subcategory: 'Work & Schedule',
    metaTitle: 'Business Days Calculator - Working Days Between Dates',
    metaDescription: 'Calculate business days between two dates excluding Saturdays and Sundays. Add or subtract working days for project deadlines.',
    h1: 'Business Days Calculator',
    summary: 'Calculate work days between two calendar dates excluding weekends, or project forward to find a deadline date based on business days.',
    searchKeywords: ['business days calculator', 'working days calculator', 'work days between dates', 'business days between two dates'],
    popular: true,
    formula: {
      expression: 'Business Days = Total Days - Weekend Days (Sat & Sun)',
      description: 'Counts only Monday through Friday calendar dates.',
      variables: [{ symbol: 'Business Days', explanation: 'Number of active working days' }]
    },
    howItWorks: [
      'Choose a start date and an end date.',
      'The calculator iterates through the range, filtering out weekend days (Saturday and Sunday).',
      'View the total working days and total weekend days.'
    ],
    example: {
      scenario: 'Counting business days from Monday, Oct 5 to Friday, Oct 23',
      inputs: { 'Start Date': '2026-10-05', 'End Date': '2026-10-23' },
      steps: [
        'Total calendar span: 19 days',
        'Saturdays and Sundays: 4 weekend days',
        'Net business days: 15 working days'
      ],
      result: '15 Business Days (3 full work weeks)'
    },
    faqs: [
      {
        question: 'Are public holidays excluded?',
        answer: 'This utility standardizes on weekend filtering (Monday through Friday). Because statutory holidays vary by country and state, verify public holidays for your specific locality.'
      }
    ],
    relatedSlugs: ['days-between-dates', 'time-duration-calculator', 'date-difference-calculator'],
    targetQueries: {
      head: 'business days calculator',
      midTail: ['working days between dates', 'work days calculator'],
      longTail: ['how many business days between two dates', 'calculate 10 business days from today']
    }
  },
  {
    id: 'time-duration-calculator',
    slug: 'time-duration-calculator',
    name: 'Time Duration Calculator',
    shortName: 'Time Duration',
    category: 'date-time',
    subcategory: 'Time & Clocks',
    metaTitle: 'Time Duration Calculator - Hours & Minutes Between Times',
    metaDescription: 'Calculate the exact elapsed time in hours and minutes between a start time and end time. Supports 12-hour AM/PM and 24-hour military time.',
    h1: 'Time Duration Calculator',
    summary: 'Calculate hours and minutes between two clock times, including intervals that span across midnight.',
    searchKeywords: ['time duration calculator', 'hours calculator', 'time between two times', 'elapsed time calculator'],
    popular: true,
    formula: {
      expression: 'Duration = End Time - Start Time (mod 24 Hours)',
      description: 'Subtract start minutes from end minutes, adding 24 hours if end time crosses midnight.',
      variables: [{ symbol: 'Duration', explanation: 'Elapsed hours and minutes' }]
    },
    howItWorks: [
      'Enter the starting time (hour, minute, AM/PM or 24-hour).',
      'Enter the ending time.',
      'Get total hours, minutes, and decimal hours (useful for work timesheets).'
    ],
    example: {
      scenario: 'Work shift starting at 8:30 AM and ending at 5:15 PM with a 45-minute lunch break',
      inputs: { 'Start Time': '8:30 AM', 'End Time': '5:15 PM', 'Break': '45 min' },
      steps: [
        'Gross elapsed time: 8 hours and 45 minutes (8.75 hours)',
        'Subtract unpaid break: 45 minutes',
        'Net working duration: 8 hours and 0 minutes (8.00 decimal hours)'
      ],
      result: '8 hours, 0 minutes (8.00 hours)'
    },
    faqs: [
      {
        question: 'How do I convert minutes into decimal hours for payroll?',
        answer: 'Divide the number of minutes by 60. For example, 45 minutes ÷ 60 = 0.75 hours.'
      }
    ],
    relatedSlugs: ['business-days-calculator', 'hourly-to-salary-calculator'],
    targetQueries: {
      head: 'time duration calculator',
      midTail: ['hours between times calculator', 'elapsed time calculator'],
      longTail: ['how many hours between 8 30 am and 5 15 pm']
    }
  },
  {
    id: 'countdown-calculator',
    slug: 'countdown-calculator',
    name: 'Countdown Calculator',
    shortName: 'Countdown',
    category: 'date-time',
    subcategory: 'Holiday & Events',
    metaTitle: 'Countdown Calculator - Days, Hours & Minutes Until Any Date',
    metaDescription: 'Live countdown timer to any upcoming date, holiday, or event. See days until Christmas, New Year, Halloween, or your custom date.',
    h1: 'Countdown Calculator',
    summary: 'Live real-time countdown showing exact days, hours, minutes, and seconds until any holiday, deadline, vacation, or milestone.',
    searchKeywords: ['countdown calculator', 'days until christmas', 'days until new year', 'days until halloween', 'countdown timer online'],
    popular: true,
    formula: {
      expression: 'Time Remaining = Target Timestamp - Current Timestamp',
      description: 'Real-time delta broken down into days, hours, minutes, and seconds.',
      variables: [{ symbol: 'Time Remaining', explanation: 'Remaining countdown' }]
    },
    howItWorks: [
      'Choose a popular holiday (Christmas, New Year, Halloween, Thanksgiving) or pick a custom date and time.',
      'The live timer updates every second showing exact remaining time.'
    ],
    example: {
      scenario: 'Counting down to Christmas Day (December 25)',
      inputs: { 'Event': 'Christmas Day', 'Target Date': 'December 25' },
      steps: [
        'Calculate remaining calendar days',
        'Calculate remaining hours, minutes, and seconds'
      ],
      result: 'Live days, hours, and minutes remaining'
    },
    faqs: [
      {
        question: 'What time zone does the countdown use?',
        answer: 'The countdown automatically detects your computer or phone’s local time zone.'
      }
    ],
    relatedSlugs: ['days-from-today', 'days-between-dates', 'age-calculator'],
    targetQueries: {
      head: 'countdown calculator',
      midTail: ['days until christmas calculator', 'days until new year'],
      longTail: ['how many days until christmas', 'how many days until halloween']
    }
  },
  {
    id: 'week-number-calculator',
    slug: 'week-number-calculator',
    name: 'Week Number Calculator',
    shortName: 'Week Number',
    category: 'date-time',
    subcategory: 'Calendar & Standards',
    metaTitle: 'Week Number Calculator - Current & ISO 8601 Calendar Week',
    metaDescription: 'Find the current week number of the year or look up the ISO 8601 calendar week for any past or future date.',
    h1: 'Week Number Calculator',
    summary: 'Look up the exact week number (1 to 53) for any date according to international ISO 8601 business standards.',
    searchKeywords: ['week number calculator', 'what week of the year is it', 'current week number', 'iso week number'],
    formula: {
      expression: 'ISO Week = Week containing the first Thursday of the calendar year',
      description: 'ISO-8601 standard defines week 1 as the week starting on Monday that contains January 4th.',
      variables: [{ symbol: 'ISO Week', explanation: 'Official calendar week integer (1–53)' }]
    },
    howItWorks: [
      'Pick any calendar date.',
      'The calculator computes the ISO week number and starting/ending dates of that week.'
    ],
    example: {
      scenario: 'Checking week number for October 5, 2026',
      inputs: { 'Date': 'October 5, 2026' },
      steps: [
        'Find the ISO week containing October 5',
        'Determine start (Monday) and end (Sunday)'
      ],
      result: 'Week 41 of 2026'
    },
    faqs: [
      {
        question: 'Why do some years have 53 weeks?',
        answer: 'A regular year has 365 days, which is 52 weeks and 1 day (or 2 days in a leap year). When the year starts or ends on a Thursday, an official 53rd week occurs in ISO 8601.'
      }
    ],
    relatedSlugs: ['days-between-dates', 'business-days-calculator'],
    targetQueries: {
      head: 'week number calculator',
      midTail: ['what week number is it', 'current week of the year'],
      longTail: ['what week of the year is today iso 8601']
    }
  },

  // ==========================================
  // MATH & STATISTICS (11 Calculators)
  // ==========================================
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    name: 'Scientific & Basic Calculator',
    shortName: 'Scientific Calc',
    category: 'math-stats',
    subcategory: 'Arithmetic & Algebra',
    metaTitle: 'Scientific Calculator - Free Online Math Calculator',
    metaDescription: 'Free online scientific calculator with trigonometry, logarithms, powers, square roots, parentheses, and instant calculation history.',
    h1: 'Scientific & Basic Calculator',
    summary: 'A fast, responsive online scientific calculator supporting standard arithmetic, trigonometric functions, exponents, and memory functions.',
    searchKeywords: ['scientific calculator', 'online calculator', 'basic calculator', 'math calculator', 'free calculator'],
    popular: true,
    featured: true,
    formula: {
      expression: 'f(x) Standard mathematical order of operations (PEMDAS/BODMAS)',
      description: 'Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.',
      variables: [{ symbol: 'f(x)', explanation: 'Evaluated arithmetic expression' }]
    },
    howItWorks: [
      'Use the on-screen keypad or your physical keyboard.',
      'Supports standard functions: sin, cos, tan, log, ln, sqrt, powers (^), and parentheses.'
    ],
    example: {
      scenario: 'Evaluating 25 + (14 × 3) - sqrt(81)',
      inputs: { 'Expression': '25 + (14 × 3) - sqrt(81)' },
      steps: [
        'Parentheses: 14 × 3 = 42',
        'Square root: sqrt(81) = 9',
        'Arithmetic: 25 + 42 - 9 = 58'
      ],
      result: '58'
    },
    faqs: [
      {
        question: 'Does this calculator use degrees or radians for trigonometry?',
        answer: 'You can toggle between Degree (DEG) and Radian (RAD) mode at the top of the keypad.'
      }
    ],
    relatedSlugs: ['fraction-calculator', 'percentage-calculator', 'square-root-calculator', 'exponent-calculator'],
    targetQueries: {
      head: 'scientific calculator',
      midTail: ['online scientific calculator', 'free math calculator'],
      longTail: ['scientific calculator with trigonometry and powers']
    }
  },
  {
    id: 'fraction-calculator',
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    shortName: 'Fraction',
    category: 'math-stats',
    subcategory: 'Arithmetic & Algebra',
    metaTitle: 'Fraction Calculator - Add, Subtract, Multiply & Divide Fractions',
    metaDescription: 'Step-by-step fraction calculator. Add, subtract, multiply, and divide fractions and mixed numbers with reduced simplified results.',
    h1: 'Fraction Calculator',
    summary: 'Solve fraction math problems with full step-by-step working, common denominators, and simplified mixed number results.',
    searchKeywords: ['fraction calculator', 'fraction simplifier', 'add fractions calculator', 'multiply fractions', 'divide fractions'],
    popular: true,
    formula: {
      expression: '(a/b) ± (c/d) = (ad ± bc) / bd ; (a/b) × (c/d) = ac / bd',
      description: 'Find a common denominator for addition/subtraction, or multiply straight across.',
      variables: [
        { symbol: 'a/b', explanation: 'First fraction' },
        { symbol: 'c/d', explanation: 'Second fraction' }
      ]
    },
    howItWorks: [
      'Enter the numerator and denominator for both fractions.',
      'Choose the operation: Add (+), Subtract (-), Multiply (×), or Divide (÷).',
      'The calculator reduces the fraction to lowest terms and converts to a mixed number and decimal.'
    ],
    example: {
      scenario: 'Adding 2/3 + 3/4',
      inputs: { 'Fraction 1': '2/3', 'Operation': '+', 'Fraction 2': '3/4' },
      steps: [
        'Find common denominator: 3 × 4 = 12',
        'Convert numerators: (2 × 4) / 12 + (3 × 3) / 12 = 8/12 + 9/12',
        'Add numerators: 17/12',
        'Convert to mixed fraction: 1 5/12 (Decimal: ~1.4167)'
      ],
      result: '17/12 = 1 5/12 (~1.417)'
    },
    faqs: [
      {
        question: 'How do you divide fractions?',
        answer: 'To divide fractions, multiply the first fraction by the reciprocal (flip) of the second fraction: (a/b) ÷ (c/d) = (a/b) × (d/c).'
      }
    ],
    relatedSlugs: ['decimal-to-fraction-calculator', 'ratio-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'fraction calculator',
      midTail: ['add fractions calculator', 'fraction simplifier online'],
      longTail: ['how to add 2/3 and 3/4 step by step']
    }
  },
  {
    id: 'decimal-to-fraction-calculator',
    slug: 'decimal-to-fraction-calculator',
    name: 'Decimal to Fraction Calculator',
    shortName: 'Decimal to Fraction',
    category: 'math-stats',
    subcategory: 'Arithmetic & Algebra',
    metaTitle: 'Decimal to Fraction Calculator - Convert & Reduce to Lowest Terms',
    metaDescription: 'Convert any terminating or repeating decimal into a simplified fraction or mixed number with step-by-step GCD reduction.',
    h1: 'Decimal to Fraction Calculator',
    summary: 'Convert decimals into fully simplified fractions and mixed numbers with step-by-step reduction using the Greatest Common Divisor.',
    searchKeywords: ['decimal to fraction calculator', 'convert decimal to fraction', 'decimal fraction converter', '0.75 as a fraction'],
    popular: true,
    formula: {
      expression: 'Fraction = (Decimal × 10^k) / 10^k',
      description: 'Place the decimal digits over powers of 10 and reduce using the GCD.',
      variables: [{ symbol: '10^k', explanation: 'Power of 10 matching decimal places' }]
    },
    howItWorks: [
      'Enter any decimal value (e.g. 0.625 or 3.75).',
      'The converter sets the decimal over 10, 100, 1000, etc.',
      'Divides both numerator and denominator by their greatest common factor to reduce to simplest terms.'
    ],
    example: {
      scenario: 'Converting 0.625 to a simplified fraction',
      inputs: { 'Decimal': '0.625' },
      steps: [
        'Count decimal places: 3 places -> 625 / 1000',
        'Find GCD of 625 and 1000: GCD = 125',
        'Divide numerator & denominator by 125: 625 ÷ 125 = 5, 1000 ÷ 125 = 8'
      ],
      result: '5/8'
    },
    faqs: [
      {
        question: 'What is 0.75 as a fraction in simplest form?',
        answer: '0.75 is 75/100, which reduces to 3/4.'
      }
    ],
    relatedSlugs: ['fraction-calculator', 'percentage-calculator'],
    targetQueries: {
      head: 'decimal to fraction calculator',
      midTail: ['convert decimal to fraction', 'decimal to mixed number'],
      longTail: ['what is 0.625 as a fraction in simplest form']
    }
  },
  {
    id: 'ratio-calculator',
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    shortName: 'Ratio',
    category: 'math-stats',
    subcategory: 'Ratios & Proportions',
    metaTitle: 'Ratio Calculator - Simplify Ratios & Solve for X',
    metaDescription: 'Simplify ratios (A:B), solve equivalent ratios (A:B = C:D), find the missing value X, and scale recipe or aspect ratios.',
    h1: 'Ratio Calculator',
    summary: 'Simplify ratios to lowest terms, solve for missing variables in proportions (A:B = C:X), and scale quantities proportionally.',
    searchKeywords: ['ratio calculator', 'simplify ratio calculator', 'solve ratio', 'aspect ratio calculator', 'ratio simplifier'],
    popular: true,
    formula: {
      expression: 'A / B = C / D => D = (B × C) / A',
      description: 'Cross-multiplication to solve for missing proportional terms.',
      variables: [
        { symbol: 'A, B', explanation: 'Known ratio pair' },
        { symbol: 'C, D', explanation: 'Proportional target pair' }
      ]
    },
    howItWorks: [
      'To simplify: divide both sides of A:B by their greatest common divisor.',
      'To solve for missing value: use cross-multiplication (A × D = B × C).'
    ],
    example: {
      scenario: 'Solve 3 : 5 = 12 : X',
      inputs: { 'A': '3', 'B': '5', 'C': '12', 'D': '?' },
      steps: [
        'Cross multiply: 3 × X = 5 × 12',
        '3X = 60',
        'X = 60 / 3 = 20'
      ],
      result: 'X = 20 (Ratio is 12 : 20)'
    },
    faqs: [
      {
        question: 'How do you simplify a ratio like 24:36?',
        answer: 'Find the greatest common divisor of 24 and 36, which is 12. Divide both numbers by 12: (24÷12) : (36÷12) = 2:3.'
      }
    ],
    relatedSlugs: ['fraction-calculator', 'percentage-calculator', 'lcm-gcd-calculator'],
    targetQueries: {
      head: 'ratio calculator',
      midTail: ['ratio simplifier', 'solve ratio for x'],
      longTail: ['how to solve ratio 3 to 5 equals 12 to x']
    }
  },
  {
    id: 'square-root-calculator',
    slug: 'square-root-calculator',
    name: 'Square Root Calculator',
    shortName: 'Square Root',
    category: 'math-stats',
    subcategory: 'Arithmetic & Algebra',
    metaTitle: 'Square Root Calculator - Find √x, Cube Roots & Nth Roots',
    metaDescription: 'Calculate the square root (√x), cube root (∛x), and nth root of any positive number with decimal precision and radical simplification.',
    h1: 'Square Root Calculator',
    summary: 'Find the exact square root, cube root, or nth root of any number, check for perfect squares, and view simplified radicals.',
    searchKeywords: ['square root calculator', 'sqrt calculator', 'cube root calculator', 'find square root', 'root calculator'],
    formula: {
      expression: '√x = r such that r² = x',
      description: 'The number r which multiplied by itself yields x.',
      variables: [{ symbol: 'r', explanation: 'Root solution' }]
    },
    howItWorks: [
      'Enter the number x.',
      'Select square root (√), cube root (∛), or specify an nth root.',
      'The calculator computes the root value and indicates whether x is a perfect square.'
    ],
    example: {
      scenario: 'Finding the square root of 144',
      inputs: { 'Number': '144' },
      steps: [
        '12 × 12 = 144',
        'Therefore √144 = 12 (144 is a perfect square)'
      ],
      result: '12'
    },
    faqs: [
      {
        question: 'Can you take the square root of a negative number in real numbers?',
        answer: 'In real numbers, square roots of negative numbers are undefined. In complex numbers, √(-1) is represented by the imaginary unit i.'
      }
    ],
    relatedSlugs: ['exponent-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'square root calculator',
      midTail: ['cube root calculator', 'find square root online'],
      longTail: ['what is the square root of 144']
    }
  },
  {
    id: 'exponent-calculator',
    slug: 'exponent-calculator',
    name: 'Exponent Calculator',
    shortName: 'Exponent',
    category: 'math-stats',
    subcategory: 'Arithmetic & Algebra',
    metaTitle: 'Exponent Calculator - Calculate Powers (x^y) Online',
    metaDescription: 'Calculate base numbers raised to powers (x^y), negative exponents, fractional exponents, and large scientific power values.',
    h1: 'Exponent Calculator',
    summary: 'Compute powers and exponential values (base raised to exponent), handling positive, negative, and fractional powers.',
    searchKeywords: ['exponent calculator', 'power calculator', 'x to the power of y', 'calculate exponents'],
    formula: {
      expression: 'x^y = x × x × ... × x (y times)',
      description: 'Repeated multiplication of the base number x, y times.',
      variables: [
        { symbol: 'x', explanation: 'Base value' },
        { symbol: 'y', explanation: 'Exponent power' }
      ]
    },
    howItWorks: [
      'Enter the base number (x).',
      'Enter the power exponent (y).',
      'Negative exponents are evaluated as 1 / (x^y).'
    ],
    example: {
      scenario: 'Calculating 2 to the power of 8 (2⁸)',
      inputs: { 'Base': '2', 'Exponent': '8' },
      steps: [
        '2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 256'
      ],
      result: '256'
    },
    faqs: [
      {
        question: 'What is any number raised to the power of 0?',
        answer: 'Any non-zero number raised to the power of 0 equals 1 (e.g. 5⁰ = 1).'
      }
    ],
    relatedSlugs: ['square-root-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'exponent calculator',
      midTail: ['power calculator online', 'calculate powers'],
      longTail: ['what is 2 to the power of 8']
    }
  },
  {
    id: 'lcm-gcd-calculator',
    slug: 'lcm-gcd-calculator',
    name: 'LCM and GCD Calculator',
    shortName: 'LCM & GCD',
    category: 'math-stats',
    subcategory: 'Number Theory',
    metaTitle: 'LCM and GCD Calculator - Least Common Multiple & Greatest Common Divisor',
    metaDescription: 'Find the Least Common Multiple (LCM) and Greatest Common Divisor (GCD/GCF) for two or more numbers with step-by-step prime factorizations.',
    h1: 'LCM and GCD Calculator',
    summary: 'Calculate the LCM and GCD/GCF of two or more numbers instantly, complete with prime factor tree breakdowns.',
    searchKeywords: ['lcm calculator', 'gcd calculator', 'gcf calculator', 'least common multiple', 'greatest common divisor'],
    formula: {
      expression: 'LCM(a, b) = |a × b| / GCD(a, b)',
      description: 'Relationship between product of two integers and their greatest common divisor.',
      variables: [
        { symbol: 'GCD', explanation: 'Greatest common factor dividing both numbers' },
        { symbol: 'LCM', explanation: 'Smallest positive integer divisible by both' }
      ]
    },
    howItWorks: [
      'Enter two or more comma-separated integers.',
      'The calculator uses the Euclidean algorithm to find the GCD.',
      'Computes the LCM using prime factor maximum powers.'
    ],
    example: {
      scenario: 'Finding LCM and GCD of 12 and 18',
      inputs: { 'Numbers': '12, 18' },
      steps: [
        'Prime factors of 12: 2² × 3',
        'Prime factors of 18: 2 × 3²',
        'GCD = 2 × 3 = 6',
        'LCM = 2² × 3² = 36'
      ],
      result: 'GCD = 6, LCM = 36'
    },
    faqs: [
      {
        question: 'What is the Euclidean Algorithm?',
        answer: 'The Euclidean algorithm is an efficient method for computing the greatest common divisor of two integers by repeatedly taking remainders until remainder is 0.'
      }
    ],
    relatedSlugs: ['prime-number-calculator', 'fraction-calculator'],
    targetQueries: {
      head: 'lcm and gcd calculator',
      midTail: ['least common multiple calculator', 'greatest common factor calculator'],
      longTail: ['how to find lcm and gcd of 12 and 18']
    }
  },
  {
    id: 'prime-number-calculator',
    slug: 'prime-number-calculator',
    name: 'Prime Number Calculator',
    shortName: 'Prime Numbers',
    category: 'math-stats',
    subcategory: 'Number Theory',
    metaTitle: 'Prime Number Calculator - Check Primes & Find Prime Factors',
    metaDescription: 'Check whether a number is prime or composite, discover its complete prime factor tree, and find the next nearest prime numbers.',
    h1: 'Prime Number Calculator',
    summary: 'Test any integer for primality, find its complete list of prime factors, and discover adjacent prime numbers.',
    searchKeywords: ['prime number calculator', 'prime factor calculator', 'is it prime', 'check prime number'],
    formula: {
      expression: 'Prime Test: Only divisible by 1 and itself (n > 1)',
      description: 'Tested via trial division up to √n.',
      variables: [{ symbol: 'n', explanation: 'Tested integer' }]
    },
    howItWorks: [
      'Enter any positive integer.',
      'The calculator checks divisibility up to the square root of the number.',
      'Outputs prime status and complete prime factorization.'
    ],
    example: {
      scenario: 'Testing 360 for primality and factors',
      inputs: { 'Number': '360' },
      steps: [
        '360 is composite (divisible by 2, 3, 5, etc.)',
        'Prime factorization: 2³ × 3² × 5'
      ],
      result: 'Composite: 2³ × 3² × 5'
    },
    faqs: [
      {
        question: 'Is 1 considered a prime number?',
        answer: 'No. By definition, a prime number must be greater than 1 and possess exactly two distinct positive divisors: 1 and itself.'
      }
    ],
    relatedSlugs: ['lcm-gcd-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'prime number calculator',
      midTail: ['prime factor calculator', 'is 97 a prime number'],
      longTail: ['find prime factorization of 360']
    }
  },
  {
    id: 'mean-median-mode-calculator',
    slug: 'mean-median-mode-calculator',
    name: 'Mean, Median, Mode Calculator',
    shortName: 'Mean Median Mode',
    category: 'math-stats',
    subcategory: 'Statistics',
    metaTitle: 'Mean, Median, Mode Calculator - Descriptive Statistics Solver',
    metaDescription: 'Calculate the mean (average), median, mode, range, sum, count, min, and max for any list of numbers with step-by-step math.',
    h1: 'Mean, Median, Mode Calculator',
    summary: 'Input a list of numbers to instantly compute the arithmetic mean (average), median midpoint, mode frequencies, and range.',
    searchKeywords: ['mean median mode calculator', 'average calculator', 'find median', 'find mode', 'statistics calculator'],
    popular: true,
    formula: {
      expression: 'Mean = (Σx) / n ; Median = Middle value in sorted set',
      description: 'Sum of all values divided by count, and central positional value.',
      variables: [
        { symbol: 'Σx', explanation: 'Sum of all dataset values' },
        { symbol: 'n', explanation: 'Total count of observations' }
      ]
    },
    howItWorks: [
      'Enter numbers separated by commas, spaces, or lines.',
      'The calculator sorts the dataset in ascending order.',
      'Computes the mean, median, mode, minimum, maximum, and range.'
    ],
    example: {
      scenario: 'Analyzing dataset: 4, 8, 6, 5, 3, 8, 9',
      inputs: { 'Data': '4, 8, 6, 5, 3, 8, 9' },
      steps: [
        'Sorted: 3, 4, 5, 6, 8, 8, 9 (Count = 7)',
        'Sum = 43. Mean = 43 ÷ 7 = 6.14',
        'Median = 6 (middle 4th value)',
        'Mode = 8 (appears twice)',
        'Range = 9 - 3 = 6'
      ],
      result: 'Mean: 6.14, Median: 6, Mode: 8'
    },
    faqs: [
      {
        question: 'How do you find the median when a dataset has an even number of values?',
        answer: 'When the count is even, the median is the arithmetic average of the two middle numbers.'
      }
    ],
    relatedSlugs: ['standard-deviation-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'mean median mode calculator',
      midTail: ['average calculator online', 'calculate median and mode'],
      longTail: ['how to find mean median and mode of a set of numbers']
    }
  },
  {
    id: 'standard-deviation-calculator',
    slug: 'standard-deviation-calculator',
    name: 'Standard Deviation Calculator',
    shortName: 'Standard Deviation',
    category: 'math-stats',
    subcategory: 'Statistics',
    metaTitle: 'Standard Deviation Calculator - Sample & Population Variance',
    metaDescription: 'Calculate sample standard deviation (s), population standard deviation (σ), variance, mean, and sum of squares with step-by-step tables.',
    h1: 'Standard Deviation Calculator',
    summary: 'Measure dataset dispersion and variance with automatic calculation of both sample (n - 1) and population (N) standard deviations.',
    searchKeywords: ['standard deviation calculator', 'sample standard deviation', 'variance calculator', 'population standard deviation'],
    formula: {
      expression: 's = √[ Σ(x - x̄)² / (n - 1) ] ; σ = √[ Σ(x - μ)² / N ]',
      description: 'Square root of the average squared deviations from the dataset mean.',
      variables: [
        { symbol: 's', explanation: 'Sample standard deviation' },
        { symbol: 'σ', explanation: 'Population standard deviation' }
      ]
    },
    howItWorks: [
      'Enter comma or space-separated numbers.',
      'Computes the mean and squared differences from the mean.',
      'Provides both sample standard deviation and population standard deviation.'
    ],
    example: {
      scenario: 'Dataset: 10, 12, 23, 23, 16, 23, 21, 16',
      inputs: { 'Data': '10, 12, 23, 23, 16, 23, 21, 16' },
      steps: [
        'Count n = 8, Mean = 18.0',
        'Sum of squared differences: 160',
        'Sample Variance s² = 160 / 7 = 22.86',
        'Sample Standard Deviation s = √22.86 = 4.78'
      ],
      result: 'Sample SD: 4.78 (Variance: 22.86)'
    },
    faqs: [
      {
        question: 'When should I use sample vs population standard deviation?',
        answer: 'Use sample standard deviation (n-1) when your data represents a sample of a larger group. Use population standard deviation (N) only when your data includes every single member of the entire group.'
      }
    ],
    relatedSlugs: ['mean-median-mode-calculator', 'scientific-calculator'],
    targetQueries: {
      head: 'standard deviation calculator',
      midTail: ['sample standard deviation calculator', 'variance and standard deviation'],
      longTail: ['how to calculate sample standard deviation step by step']
    }
  },

  // ==========================================
  // UNIT CONVERTERS (9 Calculators)
  // ==========================================
  {
    id: 'length-converter',
    slug: 'length-converter',
    name: 'Length Converter',
    shortName: 'Length',
    category: 'converters',
    subcategory: 'Distance & Dimensions',
    metaTitle: 'Length Converter - Feet, Meters, Inches, Miles & Centimeters',
    metaDescription: 'Convert between inches, feet, yards, miles, meters, centimeters, and kilometers instantly with exact conversion factors.',
    h1: 'Length Converter',
    summary: 'Convert length and distance measurements seamlessly between US Customary, Imperial, and Metric units.',
    searchKeywords: ['length converter', 'feet to meters', 'inches to cm', 'miles to km', 'meters to feet'],
    popular: true,
    featured: true,
    formula: {
      expression: 'Length_target = Length_source × Conversion_Factor',
      description: 'Standard international SI metric base meter conversions.',
      variables: [{ symbol: 'Factor', explanation: 'Exact ratio (e.g. 1 in = 0.0254 m)' }]
    },
    howItWorks: [
      'Enter the length value and select the source unit.',
      'Select your target unit or view all equivalent lengths simultaneously in a quick comparison table.'
    ],
    example: {
      scenario: 'Convert 6 feet to centimeters and meters',
      inputs: { 'Value': '6', 'Unit': 'Feet' },
      steps: [
        '1 foot = 12 inches = 30.48 cm',
        '6 feet × 30.48 = 182.88 cm (1.8288 meters)'
      ],
      result: '182.88 cm (1.83 m)'
    },
    faqs: [
      {
        question: 'How many inches are in a foot and a meter?',
        answer: 'There are 12 inches in a foot, and approximately 39.37 inches in one meter.'
      }
    ],
    relatedSlugs: ['area-converter', 'speed-converter', 'square-footage-calculator'],
    targetQueries: {
      head: 'length converter',
      midTail: ['feet to meters converter', 'inches to cm'],
      longTail: ['how many centimeters is 6 feet']
    }
  },
  {
    id: 'weight-mass-converter',
    slug: 'weight-mass-converter',
    name: 'Weight and Mass Converter',
    shortName: 'Weight & Mass',
    category: 'converters',
    subcategory: 'Mass & Weight',
    metaTitle: 'Weight Converter - Pounds, Kilograms, Ounces & Grams',
    metaDescription: 'Convert pounds (lbs) to kilograms (kg), ounces (oz) to grams (g), and UK stone instantly with precise decimal conversions.',
    h1: 'Weight and Mass Converter',
    summary: 'Convert weights and masses easily between pounds, kilograms, ounces, grams, stones, and metric tons.',
    searchKeywords: ['weight converter', 'lbs to kg', 'kg to lbs', 'pounds to kilograms', 'ounces to grams'],
    popular: true,
    formula: {
      expression: '1 lb = 0.45359237 kg ; 1 kg = 2.20462262 lb',
      description: 'International avoirdupois pound to metric kilogram conversion standard.',
      variables: [{ symbol: 'lb / kg', explanation: 'Standard mass relationship' }]
    },
    howItWorks: [
      'Enter the weight number.',
      'Select starting unit (lbs, kg, oz, g, stone).',
      'View converted values across all common measurement systems.'
    ],
    example: {
      scenario: 'Convert 165 pounds to kilograms',
      inputs: { 'Value': '165', 'Unit': 'Pounds (lbs)' },
      steps: [
        '165 lbs × 0.45359237 = 74.8427 kg'
      ],
      result: '74.84 kg (11 stone 11 lbs)'
    },
    faqs: [
      {
        question: 'How many pounds are in a British stone?',
        answer: 'One stone equals exactly 14 pounds (approx. 6.35 kg).'
      }
    ],
    relatedSlugs: ['length-converter', 'volume-converter'],
    targetQueries: {
      head: 'weight converter',
      midTail: ['pounds to kilograms converter', 'lbs to kg'],
      longTail: ['how many kg is 165 pounds']
    }
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    shortName: 'Temperature',
    category: 'converters',
    subcategory: 'Physics & Weather',
    metaTitle: 'Temperature Converter - Fahrenheit, Celsius & Kelvin',
    metaDescription: 'Convert between Fahrenheit (°F), Celsius (°C), and Kelvin (K) with exact formulas, boiling/freezing points, and step-by-step working.',
    h1: 'Temperature Converter',
    summary: 'Convert temperatures between Fahrenheit, Celsius, and Kelvin with step-by-step formula explanations and common reference points.',
    searchKeywords: ['temperature converter', 'fahrenheit to celsius', 'celsius to fahrenheit', 'f to c', 'c to f'],
    popular: true,
    formula: {
      expression: '°C = (°F - 32) × 5/9 ; °F = (°C × 9/5) + 32 ; K = °C + 273.15',
      description: 'Exact thermodynamic scale relationships.',
      variables: [
        { symbol: '°F', explanation: 'Degrees Fahrenheit' },
        { symbol: '°C', explanation: 'Degrees Celsius' },
        { symbol: 'K', explanation: 'Kelvin temperature' }
      ]
    },
    howItWorks: [
      'Enter the temperature degrees.',
      'Select Fahrenheit, Celsius, or Kelvin.',
      'Outputs conversions to all other scales instantly.'
    ],
    example: {
      scenario: 'Convert 68°F to Celsius',
      inputs: { 'Temperature': '68', 'Scale': 'Fahrenheit' },
      steps: [
        'Subtract 32: 68 - 32 = 36',
        'Multiply by 5/9: 36 × (5 / 9) = 20°C'
      ],
      result: '20°C (293.15 K)'
    },
    faqs: [
      {
        question: 'At what temperature are Fahrenheit and Celsius equal?',
        answer: 'Fahrenheit and Celsius are equal at exactly -40° (-40°F = -40°C).'
      }
    ],
    relatedSlugs: ['speed-converter', 'pressure-converter'],
    targetQueries: {
      head: 'temperature converter',
      midTail: ['fahrenheit to celsius converter', 'celsius to fahrenheit'],
      longTail: ['what is 68 fahrenheit in celsius']
    }
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    name: 'Area Converter',
    shortName: 'Area',
    category: 'converters',
    subcategory: 'Distance & Dimensions',
    metaTitle: 'Area Converter - Square Feet, Meters, Acres & Hectares',
    metaDescription: 'Convert between square feet (sq ft), square meters (sq m), acres, hectares, square yards, and square inches.',
    h1: 'Area Converter',
    summary: 'Convert land and floor surface areas between square feet, square meters, acres, hectares, and square yards.',
    searchKeywords: ['area converter', 'sq ft to sq m', 'acres to hectares', 'square feet to square meters', 'acres to square feet'],
    popular: true,
    formula: {
      expression: '1 sq m = 10.7639 sq ft ; 1 acre = 43,560 sq ft = 0.404686 hectares',
      description: 'Standard geographic and land survey conversions.',
      variables: [{ symbol: 'Area', explanation: 'Surface area equivalence' }]
    },
    howItWorks: [
      'Enter the surface area number.',
      'Pick the starting unit.',
      'Instantly see conversions across residential and land units.'
    ],
    example: {
      scenario: 'Convert 2,000 square feet to square meters',
      inputs: { 'Area': '2,000', 'Unit': 'Square Feet (sq ft)' },
      steps: [
        '2,000 sq ft ÷ 10.7639 = 185.806 sq m'
      ],
      result: '185.81 sq meters'
    },
    faqs: [
      {
        question: 'How many square feet are in one acre of land?',
        answer: 'One acre equals exactly 43,560 square feet (about 4,047 square meters).'
      }
    ],
    relatedSlugs: ['square-footage-calculator', 'length-converter', 'flooring-calculator'],
    targetQueries: {
      head: 'area converter',
      midTail: ['square feet to square meters', 'acres to sq ft'],
      longTail: ['how many square meters is 2000 square feet']
    }
  },
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    name: 'Volume and Capacity Converter',
    shortName: 'Volume',
    category: 'converters',
    subcategory: 'Capacity & Fluid',
    metaTitle: 'Volume Converter - Gallons, Liters, Cups, Milliliters & Fl Oz',
    metaDescription: 'Convert fluid ounces, cups, pints, quarts, US gallons, UK imperial gallons, milliliters, and liters with cooking and commercial ratios.',
    h1: 'Volume and Capacity Converter',
    summary: 'Convert liquid capacity and cubic volume between gallons, liters, milliliters, fluid ounces, cups, tablespoons, and cubic meters.',
    searchKeywords: ['volume converter', 'gallons to liters', 'liters to gallons', 'cups to ml', 'fluid ounces to ml'],
    popular: true,
    formula: {
      expression: '1 US Gallon = 3.78541 Liters = 128 US fl oz ; 1 UK Gallon = 4.54609 Liters',
      description: 'Standard liquid volume relationships.',
      variables: [{ symbol: 'Volume', explanation: 'Fluid measure' }]
    },
    howItWorks: [
      'Enter volume quantity.',
      'Select origin unit (US Gallon, Liter, Cup, fl oz, ml, UK Gallon).',
      'View conversions in both US customary and metric systems.'
    ],
    example: {
      scenario: 'Convert 5 US gallons to liters',
      inputs: { 'Value': '5', 'Unit': 'US Gallon' },
      steps: [
        '5 × 3.78541 = 18.927 liters'
      ],
      result: '18.93 Liters'
    },
    faqs: [
      {
        question: 'What is the difference between a US gallon and an Imperial (UK) gallon?',
        answer: 'A US gallon is approx. 3.785 liters (128 US fl oz), whereas a UK Imperial gallon is approx. 4.546 liters (160 UK fl oz)—about 20% larger.'
      }
    ],
    relatedSlugs: ['weight-mass-converter', 'length-converter'],
    targetQueries: {
      head: 'volume converter',
      midTail: ['gallons to liters converter', 'cups to ml'],
      longTail: ['how many liters in 5 gallons us']
    }
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    name: 'Speed Converter',
    shortName: 'Speed',
    category: 'converters',
    subcategory: 'Physics & Motion',
    metaTitle: 'Speed Converter - MPH, KM/H, Knots & Meters per Second',
    metaDescription: 'Convert speed between miles per hour (mph), kilometers per hour (km/h), knots, and meters per second (m/s) with instant vehicle speed tables.',
    h1: 'Speed Converter',
    summary: 'Convert travel and wind speeds between miles per hour (mph), kilometers per hour (km/h), knots, and meters per second.',
    searchKeywords: ['speed converter', 'mph to kmh', 'kmh to mph', 'miles per hour to kilometers per hour', 'knots to mph'],
    popular: true,
    formula: {
      expression: '1 mph = 1.609344 km/h ; 1 knot = 1.150779 mph = 1.852 km/h',
      description: 'Standard international velocity relationships.',
      variables: [{ symbol: 'Speed', explanation: 'Velocity rate' }]
    },
    howItWorks: [
      'Enter speed number.',
      'Select starting unit (mph, km/h, knots, m/s).',
      'Get instant conversions and common highway speed comparisons.'
    ],
    example: {
      scenario: 'Convert 65 mph highway speed to km/h',
      inputs: { 'Speed': '65', 'Unit': 'mph' },
      steps: [
        '65 × 1.609344 = 104.607 km/h'
      ],
      result: '104.61 km/h'
    },
    faqs: [
      {
        question: 'How fast is 1 knot compared to mph?',
        answer: '1 knot (one nautical mile per hour) is equal to 1.151 statute miles per hour, or 1.852 km/h.'
      }
    ],
    relatedSlugs: ['length-converter', 'fuel-economy-converter', 'running-pace-calculator'],
    targetQueries: {
      head: 'speed converter',
      midTail: ['mph to kmh converter', 'kmh to mph'],
      longTail: ['what is 65 mph in kmh']
    }
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    shortName: 'Data Storage',
    category: 'converters',
    subcategory: 'Digital & Computing',
    metaTitle: 'Data Storage Converter - Bytes, KB, MB, GB & Terabytes',
    metaDescription: 'Convert digital storage units between Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB) in decimal and binary.',
    h1: 'Data Storage Converter',
    summary: 'Convert file sizes and digital memory capacities between Bytes, KB, MB, GB, and TB using both decimal (1,000) and binary (1,024) standards.',
    searchKeywords: ['data converter', 'mb to gb', 'gb to tb', 'bytes to megabytes', 'data storage converter'],
    formula: {
      expression: '1 GB = 1,024 MB (binary) or 1,000 MB (decimal)',
      description: 'Operating systems generally report binary (GiB/MiB), while drive makers advertise decimal.',
      variables: [{ symbol: 'Bytes', explanation: 'Digital information unit' }]
    },
    howItWorks: [
      'Enter the file or disk size.',
      'Select origin unit (MB, GB, TB, etc.).',
      'Outputs exact sizes in both binary (base 2) and decimal (base 10).'
    ],
    example: {
      scenario: 'Convert 500 Gigabytes to Megabytes and Terabytes',
      inputs: { 'Value': '500', 'Unit': 'GB' },
      steps: [
        'In decimal: 500 GB = 500,000 MB = 0.5 TB',
        'In binary: 500 × 1,024 = 512,000 MB = ~0.488 TB'
      ],
      result: '500,000 MB (0.5 TB)'
    },
    faqs: [
      {
        question: 'Why does my 1TB hard drive only show 931 GB in Windows?',
        answer: 'Drive manufacturers use decimal (1 TB = 1,000,000,000,000 bytes). Windows measures using binary gibibytes (1024³ bytes), resulting in 1,000,000,000,000 ÷ 1,073,741,824 ≈ 931.3 GB.'
      }
    ],
    relatedSlugs: ['speed-converter'],
    targetQueries: {
      head: 'data storage converter',
      midTail: ['mb to gb converter', 'gb to tb'],
      longTail: ['how many megabytes in 500 gigabytes']
    }
  },
  {
    id: 'pressure-converter',
    slug: 'pressure-converter',
    name: 'Pressure Converter',
    shortName: 'Pressure',
    category: 'converters',
    subcategory: 'Physics & Engineering',
    metaTitle: 'Pressure Converter - PSI, Bar, Pascal, kPa & Atmospheres',
    metaDescription: 'Convert pressure units between PSI, Bar, Pascal (Pa), Kilopascals (kPa), Atmospheres (atm), and mmHg for tire, weather, and engineering use.',
    h1: 'Pressure Converter',
    summary: 'Convert pressure between pounds per square inch (PSI), bar, kilopascals (kPa), and atmospheres for tire pressures and engineering.',
    searchKeywords: ['pressure converter', 'psi to bar', 'bar to psi', 'psi to kpa', 'atm to psi'],
    formula: {
      expression: '1 bar = 14.5038 PSI = 100 kPa = 0.986923 atm',
      description: 'Standard barometric and mechanical pressure equivalencies.',
      variables: [{ symbol: 'Pressure', explanation: 'Force per unit area' }]
    },
    howItWorks: [
      'Enter the pressure reading (e.g. car tire PSI or bar).',
      'Select starting unit.',
      'View converted values instantly.'
    ],
    example: {
      scenario: 'Convert 32 PSI tire pressure to bar and kPa',
      inputs: { 'Value': '32', 'Unit': 'PSI' },
      steps: [
        '32 PSI ÷ 14.5038 = 2.206 bar',
        '2.206 bar × 100 = 220.6 kPa'
      ],
      result: '2.21 bar (220.6 kPa)'
    },
    faqs: [
      {
        question: 'What is normal car tire pressure in bar and PSI?',
        answer: 'Most passenger vehicles specify between 30 and 35 PSI, which corresponds to approximately 2.1 to 2.4 bar.'
      }
    ],
    relatedSlugs: ['temperature-converter'],
    targetQueries: {
      head: 'pressure converter',
      midTail: ['psi to bar converter', 'bar to psi'],
      longTail: ['what is 32 psi in bar tire pressure']
    }
  },
  {
    id: 'fuel-economy-converter',
    slug: 'fuel-economy-converter',
    name: 'Fuel Economy Converter',
    shortName: 'Fuel Economy',
    category: 'converters',
    subcategory: 'Automotive & Travel',
    metaTitle: 'Fuel Economy Converter - MPG (US), MPG (UK) & L/100km',
    metaDescription: 'Convert vehicle gas mileage and fuel consumption between US MPG, UK Imperial MPG, Liters per 100km (L/100km), and km/L.',
    h1: 'Fuel Economy Converter',
    summary: 'Compare car gas mileage ratings between US Miles per Gallon (MPG), UK Imperial MPG, and European/Canadian Liters per 100 km (L/100km).',
    searchKeywords: ['fuel economy converter', 'mpg to l 100km', 'mpg to l/100km', 'miles per gallon to liters per 100km', 'gas mileage converter'],
    formula: {
      expression: 'L/100km = 235.215 / MPG_US ; MPG_UK = MPG_US × 1.20095',
      description: 'Inverse relationship between distance-per-volume and volume-per-distance.',
      variables: [{ symbol: 'Fuel', explanation: 'Mileage efficiency' }]
    },
    howItWorks: [
      'Enter your vehicle fuel rating.',
      'Select starting unit (US MPG, UK MPG, L/100km, km/L).',
      'Get converted ratings for international travel or vehicle spec comparisons.'
    ],
    example: {
      scenario: 'Convert 30 US MPG to Liters per 100 km',
      inputs: { 'Rating': '30', 'Unit': 'US MPG' },
      steps: [
        'L/100km = 235.215 ÷ 30 = 7.84 L/100km',
        'UK MPG = 30 × 1.20095 = 36.03 UK MPG'
      ],
      result: '7.84 L/100km (36.03 UK MPG)'
    },
    faqs: [
      {
        question: 'Why is UK MPG higher than US MPG for the same car?',
        answer: 'Because the UK Imperial gallon is larger (4.546 L) than the US gallon (3.785 L), a car travels farther on a single UK gallon.'
      }
    ],
    relatedSlugs: ['speed-converter', 'volume-converter'],
    targetQueries: {
      head: 'fuel economy converter',
      midTail: ['mpg to l 100km converter', 'convert gas mileage'],
      longTail: ['what is 30 mpg us in liters per 100km']
    }
  },

  // ==========================================
  // HOME IMPROVEMENT (6 Calculators)
  // ==========================================
  {
    id: 'square-footage-calculator',
    slug: 'square-footage-calculator',
    name: 'Square Footage Calculator',
    shortName: 'Square Footage',
    category: 'home-improvement',
    subcategory: 'Flooring & Rooms',
    metaTitle: 'Square Footage Calculator - Room & Area Sq Ft Estimator',
    metaDescription: 'Calculate square footage (sq ft) for rooms, walls, yards, or irregular spaces. Add multiple rooms with price per square foot estimates.',
    h1: 'Square Footage Calculator',
    summary: 'Calculate exact room square footage by entering length and width in feet or inches, add multiple rooms, and estimate total material cost.',
    searchKeywords: ['square footage calculator', 'sq ft calculator', 'how to calculate square footage', 'room square footage', 'square feet calculator'],
    popular: true,
    featured: true,
    formula: {
      expression: 'Square Feet = Length (ft) × Width (ft) ; Sq Yards = Sq Ft / 9',
      description: 'Length multiplied by width in feet.',
      variables: [
        { symbol: 'Sq Ft', explanation: 'Total floor or wall area' },
        { symbol: 'Sq Yards', explanation: 'Carpet yardage' }
      ]
    },
    howItWorks: [
      'Enter length and width in feet (and optional inches).',
      'Add multiple rooms or sections to find total square footage.',
      'Optionally enter price per square foot to calculate project cost.'
    ],
    example: {
      scenario: 'A bedroom measuring 14 feet 6 inches by 12 feet',
      inputs: { 'Length': '14.5 ft', 'Width': '12 ft', 'Cost/sq ft': '$4.50' },
      steps: [
        'Area: 14.5 ft × 12 ft = 174 sq ft',
        'In square yards: 174 ÷ 9 = 19.33 sq yds',
        'Cost estimate: 174 × $4.50 = $783.00'
      ],
      result: '174 sq ft ($783.00 at $4.50/sq ft)'
    },
    faqs: [
      {
        question: 'How do I calculate square footage if I measured in inches?',
        answer: 'Multiply length (inches) by width (inches) and divide the total by 144 (since there are 144 square inches in one square foot).'
      }
    ],
    relatedSlugs: ['paint-calculator', 'flooring-calculator', 'tile-calculator', 'area-converter'],
    targetQueries: {
      head: 'square footage calculator',
      midTail: ['sq ft calculator room', 'calculate square footage'],
      longTail: ['how many square feet is a 14 by 12 room']
    }
  },
  {
    id: 'paint-calculator',
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    shortName: 'Paint',
    category: 'home-improvement',
    subcategory: 'Painting & Walls',
    metaTitle: 'Paint Calculator - How Many Gallons of Paint Do I Need?',
    metaDescription: 'Calculate how much paint to buy for walls and rooms. Subtracts doors and windows, and estimates total gallons or liters needed.',
    h1: 'Paint Calculator',
    summary: 'Determine exactly how many gallons or liters of paint you need for a room or exterior wall, accounting for coats, doors, and windows.',
    searchKeywords: ['paint calculator', 'how much paint do i need', 'room paint calculator', 'wall paint calculator', 'gallons of paint needed'],
    popular: true,
    formula: {
      expression: 'Gallons = (Total Wall Area - Openings Area) × Coats / 350 sq ft',
      description: 'Standard interior paint covers approximately 350 to 400 square feet per gallon.',
      variables: [
        { symbol: 'Total Wall Area', explanation: '2 × (Length + Width) × Height' },
        { symbol: '350 sq ft', explanation: 'Average coverage per gallon' }
      ]
    },
    howItWorks: [
      'Enter room length, width, and ceiling height.',
      'Specify number of standard doors (20 sq ft each) and windows (15 sq ft each).',
      'Select 1 coat or 2 coats of paint to get exact gallons to purchase.'
    ],
    example: {
      scenario: 'Painting a 12×15 ft room with 8 ft ceilings, 1 door, 2 windows, and 2 coats of paint',
      inputs: { 'Length': '15 ft', 'Width': '12 ft', 'Height': '8 ft', 'Doors': '1', 'Windows': '2', 'Coats': '2' },
      steps: [
        'Gross wall perimeter: 2 × (15 + 12) = 54 ft. Gross area: 54 × 8 = 432 sq ft',
        'Deductions: 1 door (20 sq ft) + 2 windows (30 sq ft) = 50 sq ft',
        'Net wall area per coat: 432 - 50 = 382 sq ft',
        'Total painted area (2 coats): 382 × 2 = 764 sq ft',
        'Gallons needed: 764 ÷ 350 = 2.18 gallons (buy 3 gallons)'
      ],
      result: '3 Gallons (2.18 gal exact for 2 coats)'
    },
    faqs: [
      {
        question: 'How many square feet does one gallon of paint cover?',
        answer: 'One standard gallon of interior wall paint covers approximately 350 to 400 square feet on smooth primed walls. Textured or porous unprimed walls may require more.'
      }
    ],
    relatedSlugs: ['square-footage-calculator', 'flooring-calculator', 'tile-calculator'],
    targetQueries: {
      head: 'paint calculator',
      midTail: ['how many gallons of paint do i need', 'room paint calculator'],
      longTail: ['how much paint for a 12 by 15 room with 8 ft ceiling']
    }
  },
  {
    id: 'flooring-calculator',
    slug: 'flooring-calculator',
    name: 'Flooring Calculator',
    shortName: 'Flooring',
    category: 'home-improvement',
    subcategory: 'Flooring & Rooms',
    metaTitle: 'Flooring Calculator - Hardwood, Laminate & Vinyl Plank Estimator',
    metaDescription: 'Calculate flooring material requirements, box counts, and 10% cutting waste for hardwood, laminate, vinyl plank (LVP), and carpet.',
    h1: 'Flooring Calculator',
    summary: 'Estimate total flooring square footage, add recommended 10% cutting and installation waste, and determine the exact number of boxes to buy.',
    searchKeywords: ['flooring calculator', 'laminate flooring calculator', 'hardwood calculator', 'vinyl plank calculator', 'how many boxes of flooring'],
    popular: true,
    formula: {
      expression: 'Total Sq Ft = Room Area × (1 + Waste% / 100) ; Boxes = Ceil(Total Sq Ft / Box Sq Ft)',
      description: 'Adds waste factor (usually 10%) and rounds up to nearest full unopened box.',
      variables: [
        { symbol: 'Waste%', explanation: 'Cutting & pattern allowance (typically 10%)' },
        { symbol: 'Box Sq Ft', explanation: 'Coverage per carton' }
      ]
    },
    howItWorks: [
      'Enter room length and width.',
      'Choose cutting waste allowance (10% standard, 15% for diagonal or herringbone layouts).',
      'Enter square feet per box from your manufacturer carton to see exact boxes required.'
    ],
    example: {
      scenario: 'Installing vinyl plank in a 14×20 ft living room with 24 sq ft per box and 10% waste',
      inputs: { 'Room Area': '14 × 20 = 280 sq ft', 'Waste': '10%', 'Box Coverage': '24 sq ft' },
      steps: [
        'With 10% waste: 280 × 1.10 = 308 sq ft needed',
        'Boxes needed: 308 ÷ 24 = 12.83 boxes',
        'Round up to whole boxes: 13 boxes (312 sq ft total)'
      ],
      result: '13 Boxes (308 sq ft needed)'
    },
    faqs: [
      {
        question: 'Why should I always add 10% waste to flooring orders?',
        answer: 'Cutting planks to fit walls, doorways, and closets produces end cutoffs. Having extra planks guarantees matching dye lots and spares for future repairs.'
      }
    ],
    relatedSlugs: ['square-footage-calculator', 'tile-calculator', 'paint-calculator'],
    targetQueries: {
      head: 'flooring calculator',
      midTail: ['laminate flooring calculator', 'how many boxes of flooring do i need'],
      longTail: ['calculate flooring for 14 by 20 room with 10 percent waste']
    }
  },
  {
    id: 'tile-calculator',
    slug: 'tile-calculator',
    name: 'Tile Calculator',
    shortName: 'Tile',
    category: 'home-improvement',
    subcategory: 'Flooring & Rooms',
    metaTitle: 'Tile Calculator - Floor & Wall Tile Count Estimator',
    metaDescription: 'Calculate how many tiles and boxes you need for bathroom walls, kitchen backsplashes, and floor tile installations including grout gap and waste.',
    h1: 'Tile Calculator',
    summary: 'Calculate tile counts for floors, walls, and backsplashes based on tile dimensions (12x12, 12x24, subway tile) and cut waste.',
    searchKeywords: ['tile calculator', 'how many tiles do i need', 'subway tile calculator', 'bathroom tile calculator', 'backsplash calculator'],
    formula: {
      expression: 'Tile Count = (Area Sq Ft / Tile Area Sq Ft) × (1 + Waste% / 100)',
      description: 'Calculates raw tile count and adds 10-15% for corner cutting and breakage.',
      variables: [{ symbol: 'Tile Count', explanation: 'Total individual tiles' }]
    },
    howItWorks: [
      'Enter total surface area to be tiled in square feet.',
      'Select common tile size (e.g. 12"×12", 12"×24", 3"×6" subway, 6"×6") or enter custom inches.',
      'Add waste percentage (10% straight grid, 15% staggered/diagonal).'
    ],
    example: {
      scenario: 'Tiling an 8×10 ft bathroom floor (80 sq ft) with 12×12 inch tiles and 10% waste',
      inputs: { 'Area': '80 sq ft', 'Tile Size': '12" × 12"', 'Waste': '10%' },
      steps: [
        'Tile area: 12 × 12 = 144 sq in = 1.0 sq ft per tile',
        'Base tiles: 80 sq ft ÷ 1.0 = 80 tiles',
        'With 10% waste: 80 × 1.10 = 88 tiles needed'
      ],
      result: '88 Tiles (88 sq ft total)'
    },
    faqs: [
      {
        question: 'How many 12x12 tiles do I need for 100 square feet?',
        answer: 'Since each 12x12 tile is exactly 1 square foot, you need 100 tiles plus 10% waste, giving a recommended order of 110 tiles.'
      }
    ],
    relatedSlugs: ['square-footage-calculator', 'flooring-calculator', 'concrete-calculator'],
    targetQueries: {
      head: 'tile calculator',
      midTail: ['bathroom tile calculator', 'how many tiles do i need'],
      longTail: ['how many 12x12 tiles for 80 square feet']
    }
  },
  {
    id: 'concrete-calculator',
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    shortName: 'Concrete',
    category: 'home-improvement',
    subcategory: 'Masonry & Paving',
    metaTitle: 'Concrete Calculator - Cubic Yards & Bags Needed for Slabs & Footings',
    metaDescription: 'Calculate how much concrete you need in cubic yards, cubic feet, and 60lb or 80lb bags for slabs, patios, driveways, and round post footings.',
    h1: 'Concrete Calculator',
    summary: 'Calculate exact cubic yards of ready-mix concrete or pre-mixed 60lb and 80lb bags for slabs, walkways, and cylindrical post holes.',
    searchKeywords: ['concrete calculator', 'how much concrete do i need', 'cubic yards concrete calculator', 'concrete slab calculator', 'concrete bags calculator'],
    popular: true,
    formula: {
      expression: 'Cubic Yards = (Length ft × Width ft × Thickness in / 12) / 27',
      description: 'Volume in cubic feet divided by 27 (27 cubic feet = 1 cubic yard).',
      variables: [
        { symbol: 'Cubic Yards', explanation: 'Volume measure for ready-mix trucks' },
        { symbol: '80lb Bag', explanation: 'Yields approx. 0.60 cubic feet (45 bags / yd³)' }
      ]
    },
    howItWorks: [
      'Enter slab length, width, and thickness in inches (4 inches standard for patios/walkways).',
      'For round footings: enter hole diameter and depth.',
      'Outputs total cubic yards and corresponding bag counts for 60lb and 80lb sacks.'
    ],
    example: {
      scenario: 'A 10×12 ft patio slab poured at 4 inches thickness',
      inputs: { 'Length': '12 ft', 'Width': '10 ft', 'Thickness': '4 in' },
      steps: [
        'Volume: 12 × 10 × (4 / 12) = 40 cubic feet',
        'Cubic yards: 40 ÷ 27 = 1.48 cubic yards',
        '80 lb bags needed: 40 ÷ 0.60 = 67 bags (approx 67 bags)'
      ],
      result: '1.48 Cubic Yards (or 67 eighty-pound bags)'
    },
    faqs: [
      {
        question: 'How many 80 lb bags of concrete make one cubic yard?',
        answer: 'It takes 45 bags of 80 lb concrete (or 60 bags of 60 lb concrete) to make 1 cubic yard.'
      }
    ],
    relatedSlugs: ['mulch-gravel-calculator', 'square-footage-calculator'],
    targetQueries: {
      head: 'concrete calculator',
      midTail: ['cubic yards of concrete calculator', 'how many bags of concrete do i need'],
      longTail: ['how much concrete for a 10 by 12 slab 4 inches thick']
    }
  },
  {
    id: 'mulch-gravel-calculator',
    slug: 'mulch-gravel-calculator',
    name: 'Mulch and Gravel Calculator',
    shortName: 'Mulch & Gravel',
    category: 'home-improvement',
    subcategory: 'Landscaping & Garden',
    metaTitle: 'Mulch and Gravel Calculator - Cubic Yards & Bags for Landscaping',
    metaDescription: 'Calculate cubic yards and bags of mulch, topsoil, or gravel needed for flower beds, pathways, and landscaping projects.',
    h1: 'Mulch and Gravel Calculator',
    summary: 'Estimate cubic yards and 2 cu ft bag counts of garden mulch, crushed gravel, or topsoil for landscape beds.',
    searchKeywords: ['mulch calculator', 'gravel calculator', 'how much mulch do i need', 'cubic yards of mulch', 'topsoil calculator'],
    formula: {
      expression: 'Cubic Yards = (Length ft × Width ft × Depth in / 12) / 27',
      description: 'Calculates volume in cubic yards for bulk delivery or 2 cubic foot retail bags.',
      variables: [{ symbol: 'Depth in', explanation: 'Typically 2 to 3 inches for mulch' }]
    },
    howItWorks: [
      'Enter length and width of the garden bed in feet.',
      'Specify desired mulch depth in inches (typically 2" to 3").',
      'The calculator computes cubic yards and number of standard 2 cu ft retail bags.'
    ],
    example: {
      scenario: 'Mulching a garden bed measuring 20 ft by 6 ft at 3 inches deep',
      inputs: { 'Length': '20 ft', 'Width': '6 ft', 'Depth': '3 in' },
      steps: [
        'Area = 20 × 6 = 120 sq ft',
        'Volume = 120 × (3 / 12) = 30 cubic feet',
        'Cubic yards = 30 ÷ 27 = 1.11 cubic yards',
        'Standard 2 cu ft bags = 30 ÷ 2 = 15 bags'
      ],
      result: '1.11 Cubic Yards (or 15 two-cubic-foot bags)'
    },
    faqs: [
      {
        question: 'What is the recommended depth for garden mulch?',
        answer: 'A depth of 2 to 3 inches is ideal for weed suppression, moisture retention, and plant health. Excessive mulch over 4 inches can suffocate roots.'
      }
    ],
    relatedSlugs: ['concrete-calculator', 'square-footage-calculator'],
    targetQueries: {
      head: 'mulch calculator',
      midTail: ['how many bags of mulch do i need', 'gravel calculator cubic yards'],
      longTail: ['how much mulch for 120 square feet at 3 inches deep']
    }
  },

  // ==========================================
  // EVERYDAY HEALTH & FITNESS UTILITIES (4 Calculators)
  // ==========================================
  {
    id: 'running-pace-calculator',
    slug: 'running-pace-calculator',
    name: 'Running Pace Calculator',
    shortName: 'Running Pace',
    category: 'health-fitness',
    subcategory: 'Running & Cardio',
    metaTitle: 'Running Pace Calculator - Pace per Mile & Kilometer',
    metaDescription: 'Calculate running pace per mile or km from your distance and time. Plan race splits for 5K, 10K, half marathon, and marathon finishes.',
    h1: 'Running Pace Calculator',
    summary: 'Calculate exact running pace per mile and pace per kilometer from your workout time and distance, or predict finish times for 5K, 10K, and marathons.',
    searchKeywords: ['running pace calculator', 'pace calculator', '5k pace calculator', 'marathon pace calculator', 'calculate pace per mile'],
    popular: true,
    formula: {
      expression: 'Pace = Time (minutes & seconds) / Distance (miles or km)',
      description: 'Divide total elapsed running duration by total distance traversed.',
      variables: [{ symbol: 'Pace', explanation: 'Minutes and seconds per mile or kilometer' }]
    },
    howItWorks: [
      'Enter your distance (or choose standard presets like 5K, 10K, Half Marathon, Marathon).',
      'Enter total finish time in hours, minutes, and seconds.',
      'View your required pace per mile and pace per kilometer.'
    ],
    example: {
      scenario: 'Running a 5K (3.10686 miles) in 25 minutes flat',
      inputs: { 'Distance': '5K (3.11 mi)', 'Time': '00:25:00' },
      steps: [
        'Total minutes = 25.0',
        'Pace per mile = 25.0 ÷ 3.10686 = 8.047 min/mile (8 min 03 sec / mile)',
        'Pace per kilometer = 25.0 ÷ 5.0 = 5.00 min/km (5 min 00 sec / km)'
      ],
      result: '8:03 / mile (5:00 / km)'
    },
    faqs: [
      {
        question: 'What pace is needed to run a sub-2 hour half marathon?',
        answer: 'To break 2 hours in a half marathon (13.1 miles), you must maintain an average pace of 9:09 per mile (5:41 per kilometer) or faster.'
      }
    ],
    relatedSlugs: ['speed-converter', 'walking-steps-to-distance-calories'],
    targetQueries: {
      head: 'running pace calculator',
      midTail: ['5k pace calculator', 'marathon pace calculator'],
      longTail: ['what pace do i need to run a 25 minute 5k']
    }
  },
  {
    id: 'walking-steps-to-distance-calories',
    slug: 'walking-steps-to-distance-calories',
    name: 'Walking Steps to Distance and Calories',
    shortName: 'Steps to Calories',
    category: 'health-fitness',
    subcategory: 'Walking & Activity',
    metaTitle: 'Steps to Miles, Km & Calories Calculator - Walking Converter',
    metaDescription: 'Convert daily step counts (e.g. 10,000 steps) to miles, kilometers, and estimated calories burned based on height and body weight.',
    h1: 'Steps to Distance & Calories Calculator',
    summary: 'Convert your pedometer or smartwatch steps into miles, kilometers, and estimated active calories burned.',
    searchKeywords: ['steps to miles calculator', 'steps to calories calculator', '10000 steps in miles', 'how many miles is 10000 steps', 'steps to km'],
    popular: true,
    formula: {
      expression: 'Distance = Steps × Stride Length ; Calories = Steps × 0.04 (approx)',
      description: 'Average adult stride is approximately 2.2 to 2.5 feet (approx. 2,000 to 2,200 steps per mile).',
      variables: [{ symbol: 'Stride', explanation: 'Step length based on height' }]
    },
    howItWorks: [
      'Enter your step count (e.g. 5,000, 10,000, 15,000).',
      'Optionally specify your body weight for a more accurate calorie burn estimate.',
      'View your distance in miles, kilometers, and calories.'
    ],
    example: {
      scenario: 'Walking 10,000 steps for an average adult weighing 160 lbs',
      inputs: { 'Steps': '10,000', 'Weight': '160 lbs' },
      steps: [
        'Average stride yields ~2,100 steps per mile',
        'Distance: 10,000 ÷ 2,100 = ~4.76 miles (~7.66 km)',
        'Estimated calorie burn: ~400–450 kcal'
      ],
      result: '4.76 Miles (7.66 km) · ~420 kcal'
    },
    faqs: [
      {
        question: 'How many miles is 10,000 steps on average?',
        answer: 'For most adults with an average stride length, 10,000 steps equals roughly 4.5 to 5.0 miles (7.2 to 8.0 kilometers).'
      }
    ],
    relatedSlugs: ['running-pace-calculator', 'daily-water-intake-calculator'],
    targetQueries: {
      head: 'steps to miles calculator',
      midTail: ['10000 steps in miles', 'steps to calories calculator'],
      longTail: ['how many miles and calories is 10000 steps']
    }
  },
  {
    id: 'daily-water-intake-calculator',
    slug: 'daily-water-intake-calculator',
    name: 'Daily Water Intake Calculator',
    shortName: 'Daily Water Intake',
    category: 'health-fitness',
    subcategory: 'Wellness & Hydration',
    metaTitle: 'Daily Water Intake Calculator - Recommended Ounces & Liters',
    metaDescription: 'Calculate how much water you should drink daily based on your body weight, climate, and daily exercise minutes.',
    h1: 'Daily Water Intake Calculator',
    summary: 'Estimate your recommended daily water consumption in fluid ounces and liters based on body weight, climate, and physical activity levels.',
    searchKeywords: ['water intake calculator', 'how much water should i drink', 'daily water intake', 'ounces of water per day'],
    formula: {
      expression: 'Water (fl oz) = (Weight lbs × 0.5) + (Exercise min / 30 × 12)',
      description: 'General hydration baseline of roughly 0.5 oz per pound plus 12 oz per 30 minutes of vigorous exercise.',
      variables: [{ symbol: 'Water', explanation: 'Daily fluid baseline' }]
    },
    howItWorks: [
      'Enter your body weight in pounds or kilograms.',
      'Add daily exercise minutes.',
      'Receive recommended water volume in fluid ounces, cups, and liters.'
    ],
    example: {
      scenario: 'A 160 lb individual with 45 minutes of daily workout',
      inputs: { 'Weight': '160 lbs', 'Exercise': '45 min' },
      steps: [
        'Baseline: 160 × 0.5 = 80 fl oz',
        'Exercise addition: (45 ÷ 30) × 12 = 18 fl oz',
        'Total: 80 + 18 = 98 fl oz (~2.9 liters or ~12 cups)'
      ],
      result: '98 fl oz (2.9 Liters / ~12 cups)'
    },
    faqs: [
      {
        question: 'Does coffee or tea count toward daily water intake?',
        answer: 'Yes, moderate consumption of coffee, tea, and moisture-rich foods (fruits and vegetables) contributes to daily hydration.'
      }
    ],
    relatedSlugs: ['walking-steps-to-distance-calories', 'body-mass-index-calculator'],
    targetQueries: {
      head: 'water intake calculator',
      midTail: ['how much water should i drink a day', 'daily water intake calculator'],
      longTail: ['how many ounces of water should a 160 pound person drink']
    }
  },
  {
    id: 'body-mass-index-calculator',
    slug: 'body-mass-index-calculator',
    name: 'Body Mass Index (BMI) Reference Calculator',
    shortName: 'BMI Calculator',
    category: 'health-fitness',
    subcategory: 'Screening Metrics',
    metaTitle: 'BMI Calculator - Body Mass Index & Healthy Weight Range',
    metaDescription: 'Calculate reference Body Mass Index (BMI) and healthy weight ranges for adults using standard World Health Organization (WHO) categories.',
    h1: 'Body Mass Index (BMI) Reference Calculator',
    summary: 'Calculate adult Body Mass Index (BMI) and view standard World Health Organization (WHO) reference categories and healthy weight bands.',
    searchKeywords: ['bmi calculator', 'body mass index calculator', 'calculate bmi', 'healthy weight calculator'],
    popular: true,
    formula: {
      expression: 'BMI = (Weight lbs × 703) / Height in²  or  Weight kg / Height m²',
      description: 'Standard demographic screening metric for adult body mass relative to height.',
      variables: [
        { symbol: 'BMI', explanation: 'Body Mass Index score' },
        { symbol: 'Weight', explanation: 'Body weight in lbs or kg' },
        { symbol: 'Height', explanation: 'Stature in inches or meters' }
      ]
    },
    howItWorks: [
      'Select Imperial (feet/inches, pounds) or Metric (cm, kg).',
      'Enter height and weight.',
      'View your calculated score alongside WHO reference classifications: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), and Obese (≥30).'
    ],
    example: {
      scenario: 'Adult standing 5 feet 10 inches tall (70 in) weighing 165 lbs',
      inputs: { 'Height': '5 ft 10 in', 'Weight': '165 lbs' },
      steps: [
        'BMI = (165 × 703) / (70 × 70) = 115,995 / 4,900 = 23.67',
        '23.67 falls within the WHO Normal weight category (18.5 to 24.9)'
      ],
      result: 'BMI 23.7 (Normal weight reference)'
    },
    faqs: [
      {
        question: 'What are the limitations of the BMI calculation?',
        answer: 'BMI is an epidemiological population screening tool. It does not distinguish between muscle mass and fat mass, making it less representative for athletes, pregnant women, or muscular individuals.'
      },
      {
        question: 'Is this calculator a medical diagnosis?',
        answer: 'No. This calculator is provided for informational and educational screening purposes only. It is not medical advice, diagnosis, or treatment. Consult a licensed healthcare provider for personal health guidance.'
      }
    ],
    relatedSlugs: ['daily-water-intake-calculator', 'walking-steps-to-distance-calories'],
    targetQueries: {
      head: 'bmi calculator',
      midTail: ['calculate bmi online', 'body mass index calculator'],
      longTail: ['what is bmi for 5 foot 10 and 165 pounds']
    }
  }
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find(c => c.slug === slug || c.id === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.category === category);
}

export function getPopularCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.popular);
}

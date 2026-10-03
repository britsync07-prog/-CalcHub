import { ComparisonTable } from '../types/calculator';

/**
 * Real <table> comparison content, keyed by calculator id.
 * Every number below is a verifiable reference value.
 */
export const COMPARISON_TABLES: Record<string, ComparisonTable> = {
  'percentage-calculator': {
    title: 'Percentage of a number vs percent change vs percentage difference',
    caption: 'Pick the right percentage tool for your question.',
    headers: ['Tool', 'Question it answers', 'Example'],
    rows: [
      ['Percentage of a number', 'What is X% of Y?', '20% of 150 = 30'],
      ['Percent change', 'How much did it grow or shrink?', '80 to 100 = +25% increase'],
      ['Percentage difference', 'How far apart are two values?', '80 vs 100 = 22.2% difference']
    ]
  },
  'percent-change-calculator': {
    title: 'Percent change vs percentage difference',
    caption: 'Direction matters: use percent change for growth, difference for gaps.',
    headers: ['Tool', 'Denominator', '80 to 100 gives'],
    rows: [
      ['Percent change', 'Old value (80)', '+25% increase'],
      ['Percentage difference', 'Average of both (90)', '22.2% difference']
    ]
  },
  'simple-interest-calculator': {
    title: 'Simple vs compound interest on $1,000 at 5% for 10 years',
    caption: 'Compounding earns interest on interest; simple interest does not.',
    headers: ['Type', 'Formula', '$1,000 at 5% x 10 yrs'],
    rows: [
      ['Simple', 'I = P x r x t', '$1,500.00'],
      ['Compound (annual)', 'A = P(1 + r)^t', '$1,628.89']
    ]
  },
  'compound-interest-calculator': {
    title: 'Simple vs compound interest on $1,000 at 5% for 10 years',
    caption: 'Compounding earns interest on interest; simple interest does not.',
    headers: ['Type', 'Formula', '$1,000 at 5% x 10 yrs'],
    rows: [
      ['Simple', 'I = P x r x t', '$1,500.00'],
      ['Compound (annual)', 'A = P(1 + r)^t', '$1,628.89']
    ]
  },
  'profit-margin-calculator': {
    title: 'Profit margin vs markup on a $100 cost sold for $150',
    caption: 'Markup divides by cost; margin divides by price. Same dollars, different percentages.',
    headers: ['Metric', 'Divides profit by', '$100 cost, $150 price'],
    rows: [
      ['Markup', 'Cost ($100)', '50%'],
      ['Margin', 'Price ($150)', '33.3%']
    ]
  },
  'markup-calculator': {
    title: 'Profit margin vs markup on a $100 cost sold for $150',
    caption: 'Markup divides by cost; margin divides by price. Same dollars, different percentages.',
    headers: ['Metric', 'Divides profit by', '$100 cost, $150 price'],
    rows: [
      ['Markup', 'Cost ($100)', '50%'],
      ['Margin', 'Price ($150)', '33.3%']
    ]
  },
  'body-mass-index-calculator': {
    title: 'WHO adult BMI reference bands',
    caption: 'Screening bands for adults aged 20+. Source: World Health Organization.',
    headers: ['BMI (kg/m2)', 'Band', 'Meaning'],
    rows: [
      ['Below 18.5', 'Underweight', 'Below the healthy range'],
      ['18.5 - 24.9', 'Healthy range', 'Reference healthy band'],
      ['25.0 - 29.9', 'Overweight', 'Above the healthy range'],
      ['30.0 and above', 'Obesity', 'Clinical obesity range']
    ]
  },
  'temperature-converter': {
    title: 'Everyday reference temperatures',
    caption: 'Anchor points for converting between Fahrenheit, Celsius, and Kelvin.',
    headers: ['Reference point', 'Fahrenheit', 'Celsius', 'Kelvin'],
    rows: [
      ['Water freezes', '32 F', '0 C', '273.15 K'],
      ['Human body', '98.6 F', '37 C', '310.15 K'],
      ['Water boils (sea level)', '212 F', '100 C', '373.15 K']
    ]
  },
  'length-converter': {
    title: 'Exact imperial-metric length factors',
    caption: 'International definitions used by this converter.',
    headers: ['From', 'Equals exactly'],
    rows: [
      ['1 inch', '2.54 centimetres'],
      ['1 foot', '30.48 centimetres (0.3048 m)'],
      ['1 yard', '0.9144 metres'],
      ['1 mile', '1.609344 kilometres']
    ]
  },
  'weight-mass-converter': {
    title: 'Exact imperial-metric mass factors',
    caption: 'International definitions used by this converter.',
    headers: ['From', 'Equals exactly'],
    rows: [
      ['1 pound (lb)', '0.45359237 kilograms'],
      ['1 ounce (oz)', '28.349523125 grams'],
      ['1 stone (st)', '6.35029318 kilograms']
    ]
  },
  'hourly-to-salary-calculator': {
    title: 'Hourly wage to annual salary (40 h/week, 52 weeks = 2,080 h)',
    caption: 'Full-time equivalence before taxes and deductions.',
    headers: ['Hourly wage', 'Annual salary'],
    rows: [
      ['$20 / hour', '$41,600 / year'],
      ['$25 / hour', '$52,000 / year'],
      ['$40 / hour', '$83,200 / year']
    ]
  },
  'salary-to-hourly-calculator': {
    title: 'Annual salary to hourly rate (2,080 work hours/year)',
    caption: 'Full-time equivalence before taxes and deductions.',
    headers: ['Annual salary', 'Hourly rate'],
    rows: [
      ['$52,000 / year', '$25.00 / hour'],
      ['$75,000 / year', '$36.06 / hour'],
      ['$100,000 / year', '$48.08 / hour']
    ]
  },
  'data-storage-converter': {
    title: 'Decimal (SI) vs binary (IEC) storage units',
    caption: 'Drive makers use decimal; operating systems often show binary.',
    headers: ['Unit', 'Bytes (decimal)', 'Bytes (binary)'],
    rows: [
      ['Kilobyte', '1,000 B (KB)', '1,024 B (KiB)'],
      ['Megabyte', '1,000,000 B (MB)', '1,048,576 B (MiB)'],
      ['Gigabyte', '1,000,000,000 B (GB)', '1,073,741,824 B (GiB)']
    ]
  },
  'tip-calculator': {
    title: 'Standard tip amounts on a $100 bill',
    caption: 'Common US restaurant gratuity rates.',
    headers: ['Rate', 'Tip on $100', 'Total'],
    rows: [
      ['15%', '$15.00', '$115.00'],
      ['18%', '$18.00', '$118.00'],
      ['20%', '$20.00', '$120.00'],
      ['25%', '$25.00', '$125.00']
    ]
  },
  'running-pace-calculator': {
    title: 'Marathon (26.2 mi) finish times by pace',
    caption: 'Even-pace projections for a full marathon.',
    headers: ['Pace per mile', 'Marathon finish'],
    rows: [
      ['8:00 / mi', '3:29:36'],
      ['9:00 / mi', '3:55:44'],
      ['10:00 / mi', '4:22:00']
    ]
  },
  'standard-deviation-calculator': {
    title: 'Population vs sample standard deviation',
    caption: 'Use population (N) for full datasets, sample (n-1) for estimates from a subset.',
    headers: ['Type', 'Divides by', 'When to use'],
    rows: [
      ['Population', 'N', 'You measured the entire group'],
      ['Sample', 'n - 1', 'You measured a sample of a larger group']
    ]
  },
  'mean-median-mode-calculator': {
    title: 'Mean vs median vs mode',
    caption: 'Three different answers to "what is typical?" for the same numbers.',
    headers: ['Average', 'What it is', 'Skewed by outliers?'],
    rows: [
      ['Mean', 'Sum divided by count', 'Yes'],
      ['Median', 'Middle value when sorted', 'No'],
      ['Mode', 'Most frequent value', 'No']
    ]
  },
  'paint-calculator': {
    title: 'Typical interior paint coverage per US gallon',
    caption: 'Manufacturer guidance; always check your can and plan two coats.',
    headers: ['Surface', 'Coverage per gallon (one coat)'],
    rows: [
      ['Smooth primed drywall', '350 - 400 sq ft'],
      ['Textured or porous walls', '250 - 350 sq ft'],
      ['Ceilings', '300 - 350 sq ft']
    ]
  },
  'concrete-calculator': {
    title: 'Ready-mix bags per cubic yard (approximate yield)',
    caption: 'Yields vary by mix; confirm with the bag label before ordering.',
    headers: ['Bag size', 'Yield per bag', 'Bags per cubic yard'],
    rows: [
      ['80 lb bag', '0.60 cu ft', '45 bags'],
      ['60 lb bag', '0.45 cu ft', '60 bags'],
      ['40 lb bag', '0.30 cu ft', '90 bags']
    ]
  }
};

export function getComparisonTable(calculatorId: string) {
  return COMPARISON_TABLES[calculatorId];
}

import { CategoryId, ComparisonTable, FAQItem, Source } from '../types/calculator';
import { DEFAULT_AUTHOR_ID, DEFAULT_REVIEWER_ID, getTeamMember } from './editorialTeam';
import { getComparisonTable } from './comparisonTables';

export const DEFAULT_DATE_PUBLISHED = '2025-02-10';
export const DEFAULT_DATE_UPDATED = '2026-10-01';

/** One-sentence "X is..." definitions for direct-answer / AI extraction. */
export const DEFINITIONS: Record<string, string> = {
  'percentage-calculator': 'A percentage calculator finds what a rate out of 100 equals for any number, for example 20% of 150 is 30.',
  'percent-change-calculator': 'A percent change calculator measures growth or shrinkage between an old and a new value, for example 80 to 100 is a 25% increase.',
  'percentage-difference-calculator': 'A percentage difference calculator measures the gap between two values relative to their average, ignoring direction.',
  'discount-calculator': 'A discount calculator subtracts a sale percentage from a price, so a $80 item at 25% off costs $60 and saves $20.',
  'sales-tax-calculator': 'A sales tax calculator adds the local tax rate to a price or reverses a total back to its pre-tax price.',
  'tip-calculator': 'A tip calculator multiplies a bill by a gratuity rate, so 20% on $50 is a $10 tip and a $60 total.',
  'split-bill-calculator': 'A split bill calculator divides a restaurant check, including tax and tip, evenly among every guest.',
  'profit-margin-calculator': 'A profit margin calculator divides profit by selling price, so a $50 profit on a $150 sale is a 33.3% margin.',
  'markup-calculator': 'A markup calculator divides profit by cost, so a $50 profit on a $100 cost is a 50% markup.',
  'commission-calculator': 'A commission calculator multiplies sales by a commission rate to find rep pay, for example 5% on $40,000 is $2,000.',
  'simple-interest-calculator': 'A simple interest calculator applies I = P x r x t with no compounding, so $1,000 at 5% for 2 years earns $100.',
  'compound-interest-calculator': 'A compound interest calculator grows money with A = P(1 + r/n)^(nt), so compounding frequency changes the final balance.',
  'hourly-to-salary-calculator': 'An hourly-to-salary calculator annualizes a wage, so $25 per hour full-time equals $52,000 per year before tax.',
  'salary-to-hourly-calculator': 'A salary-to-hourly calculator divides annual pay by work hours, so $75,000 a year equals about $36.06 per hour full-time.',
  'days-between-dates': 'A days-between-dates calculator counts exact calendar days between two dates, including leap days.',
  'date-difference-calculator': 'A date difference calculator expresses the gap between two dates as years, months, and days.',
  'days-from-today': 'A days-from-today calculator adds or subtracts a number of days from the current date to find a target date.',
  'age-calculator': 'An age calculator computes exact chronological age in years, months, and days from a date of birth to today.',
  'business-days-calculator': 'A business days calculator counts weekdays between two dates, skipping Saturdays and Sundays.',
  'time-duration-calculator': 'A time duration calculator measures elapsed hours and minutes between a start and end time, minus breaks.',
  'countdown-calculator': 'A countdown calculator shows live days, hours, minutes, and seconds remaining until a holiday or custom date.',
  'week-number-calculator': 'A week number calculator returns the ISO 8601 calendar week of the year for any date.',
  'scientific-calculator': 'A scientific calculator evaluates arithmetic plus trigonometry, powers, roots, logarithms, and percentages in one keypad.',
  'fraction-calculator': 'A fraction calculator adds, subtracts, multiplies, and divides fractions and reduces the answer to lowest terms.',
  'decimal-to-fraction-calculator': 'A decimal-to-fraction calculator converts decimals like 0.75 to simplified fractions like 3/4.',
  'ratio-calculator': 'A ratio calculator simplifies ratios such as 8:12 to 2:3 and solves missing values in proportions.',
  'square-root-calculator': 'A square root calculator finds the number that multiplies by itself to give your input, for example the square root of 144 is 12.',
  'exponent-calculator': 'An exponent calculator raises a base to a power, for example 2^10 equals 1,024.',
  'lcm-gcd-calculator': 'An LCM and GCD calculator finds the smallest shared multiple and the largest shared divisor of two numbers.',
  'prime-number-calculator': 'A prime number calculator tests whether a number is prime and lists its prime factors.',
  'mean-median-mode-calculator': 'A mean, median, and mode calculator summarizes a list of numbers with its average, middle value, and most frequent value.',
  'standard-deviation-calculator': 'A standard deviation calculator measures how spread out numbers are around their mean, for samples or full populations.',
  'length-converter': 'A length converter translates between feet, meters, inches, centimetres, yards, miles, and kilometres using exact international factors.',
  'weight-mass-converter': 'A weight converter translates between pounds, kilograms, ounces, grams, and stone using exact international factors.',
  'temperature-converter': 'A temperature converter translates between Fahrenheit, Celsius, and Kelvin with exact thermodynamic formulas.',
  'area-converter': 'An area converter translates between square feet, square metres, acres, and hectares.',
  'volume-converter': 'A volume converter translates between US gallons, imperial gallons, litres, millilitres, cups, and fluid ounces.',
  'speed-converter': 'A speed converter translates between miles per hour, kilometres per hour, knots, and metres per second.',
  'data-storage-converter': 'A data storage converter translates between bytes, KB, MB, GB, and TB in both decimal (SI) and binary (IEC) systems.',
  'pressure-converter': 'A pressure converter translates between PSI, bar, kilopascals, and atmospheres.',
  'fuel-economy-converter': 'A fuel economy converter translates between US MPG, imperial MPG, and litres per 100 kilometres.',
  'square-footage-calculator': 'A square footage calculator multiplies room length by width and totals every room into square feet and square yards.',
  'paint-calculator': 'A paint calculator multiplies wall area minus doors and windows by coats and coverage to estimate gallons to buy.',
  'flooring-calculator': 'A flooring calculator adds a 10% cutting-waste allowance to room area and converts it into boxes to purchase.',
  'tile-calculator': 'A tile calculator divides floor area by tile area plus grout and waste to estimate tiles to buy.',
  'concrete-calculator': 'A concrete calculator converts slab volume into cubic yards and ready-mix bags for footings and slabs.',
  'mulch-gravel-calculator': 'A mulch and gravel calculator converts bed area times depth into cubic yards and retail bags.',
  'running-pace-calculator': 'A running pace calculator converts finish time and distance into per-mile and per-kilometre pace for 5K to marathon races.',
  'walking-steps-to-distance-calories': 'A steps converter turns step counts into miles, kilometres, and estimated active calories using stride length and body weight.',
  'daily-water-intake-calculator': 'A water intake calculator estimates daily fluid ounces and litres from body weight plus workout time.',
  'body-mass-index-calculator': 'A BMI calculator divides weight by height squared and maps the result to WHO adult reference bands.'
};

/** Extra FAQs merged after each calculator's built-in FAQs (5-8 total on key pages). */
export const EXTRA_FAQS: Record<string, FAQItem[]> = {
  'percentage-calculator': [
    { question: 'How do you calculate 20% of 150?', answer: 'Convert 20% to 0.20 and multiply by 150. 0.20 x 150 = 30, so 20% of 150 is 30.' },
    { question: 'What is the easiest way to find 10% of any number?', answer: 'Move the decimal point one place left. 10% of 250 is 25, 10% of 80 is 8. Double it for 20%, halve it for 5%.' },
    { question: 'How do you find what percent one number is of another?', answer: 'Divide the part by the whole and multiply by 100. For 45 out of 60: (45 / 60) x 100 = 75%.' },
    { question: 'What is the difference between percent and percentage points?', answer: 'Percent is relative; percentage points are absolute. Rising from 20% to 25% is a 5-point rise but a 25% relative increase.' }
  ],
  'percent-change-calculator': [
    { question: 'How do you calculate percent increase from 80 to 100?', answer: 'Subtract (100 - 80 = 20), divide by the original (20 / 80 = 0.25), multiply by 100. The increase is 25%.' },
    { question: 'Can percent change be over 100%?', answer: 'Yes. Growing from 50 to 150 is a 200% increase, because the gain of 100 is twice the starting value of 50.' },
    { question: 'What does a negative percent change mean?', answer: 'A fall from the original value. Dropping from 100 to 80 is (80 - 100) / 100 x 100 = -20%.' }
  ],
  'discount-calculator': [
    { question: 'How do you calculate 25% off $80?', answer: 'Multiply $80 by 0.25 to get $20 savings, then subtract: $80 - $20 = $60 sale price.' },
    { question: 'How do stacked coupons work, for example 20% then 10% off?', answer: 'They multiply, not add. $100 at 20% off is $80, then 10% off $80 is $72. The combined saving is 28%, not 30%.' },
    { question: 'How do you reverse a discount to find the original price?', answer: 'Divide the sale price by (1 - discount). A $60 item at 25% off was $60 / 0.75 = $80 originally.' }
  ],
  'tip-calculator': [
    { question: 'How much should you tip on $50 at 20%?', answer: 'Multiply $50 by 0.20 to get a $10 tip, for a $60 total.' },
    { question: 'What are the standard US restaurant tip rates?', answer: '15% for adequate service, 18-20% for good service, and 22-25% for excellent service or large parties.' },
    { question: 'How do you split a $120 bill with 20% tip among 4 people?', answer: 'Add the $24 tip for a $144 total, then divide by 4. Each person pays $36.' }
  ],
  'sales-tax-calculator': [
    { question: 'How do you add 8% sales tax to $100?', answer: 'Multiply $100 by 1.08 to get $108 total. The tax portion is $8.' },
    { question: 'How do you find the pre-tax price from a total?', answer: 'Divide the total by (1 + rate). A $108 total at 8% tax means $108 / 1.08 = $100 pre-tax.' },
    { question: 'Why does sales tax vary by location?', answer: 'US sales tax combines state, county, and city rates that differ by jurisdiction. Always confirm the combined local rate; this tool models the math, not your local code.' }
  ],
  'compound-interest-calculator': [
    { question: 'How much is $1,000 at 5% compounded annually for 10 years?', answer: 'Apply A = 1000 x (1.05)^10 = $1,628.89. Simple interest would only reach $1,500.' },
    { question: 'Does compounding frequency matter?', answer: 'Yes. Monthly compounding at the same nominal 5% beats annual compounding slightly, because interest starts earning its own interest sooner.' },
    { question: 'What is the Rule of 72?', answer: 'Divide 72 by the rate to estimate doubling time. At 6%, money doubles in about 72 / 6 = 12 years.' }
  ],
  'hourly-to-salary-calculator': [
    { question: 'What is $25 an hour annually full-time?', answer: 'Multiply $25 by 2,080 hours (40 x 52) to get $52,000 per year before taxes.' },
    { question: 'How many work hours are in a year?', answer: 'A standard full-time year is 40 hours x 52 weeks = 2,080 hours, excluding holidays and paid time off.' },
    { question: 'Does salary conversion include overtime or benefits?', answer: 'No. The conversion is base pay only; overtime, bonuses, benefits, and taxes are excluded.' }
  ],
  'age-calculator': [
    { question: 'How is exact age in years, months, and days computed?', answer: 'Subtract the birth date from today, borrowing months and days like calendar arithmetic so leap years and month lengths are exact.' },
    { question: 'Why do online age calculators differ by a day sometimes?', answer: 'Time zones and whether the count includes today. This tool uses calendar dates in your local time zone.' }
  ],
  'fraction-calculator': [
    { question: 'How do you add 1/4 + 2/3?', answer: 'Use the common denominator 12: 3/12 + 8/12 = 11/12.' },
    { question: 'How do you divide fractions?', answer: 'Multiply by the reciprocal. (2/3) / (4/5) = (2/3) x (5/4) = 10/12 = 5/6.' },
    { question: 'What does simplify to lowest terms mean?', answer: 'Divide numerator and denominator by their greatest common divisor. 8/12 simplifies to 2/3.' }
  ],
  'length-converter': [
    { question: 'How many centimetres are in one inch?', answer: 'Exactly 2.54 cm per inch by international definition.' },
    { question: 'How do you convert feet to metres?', answer: 'Multiply feet by 0.3048. A 6-foot person is 6 x 0.3048 = 1.8288 m.' },
    { question: 'How many kilometres are in a mile?', answer: 'Exactly 1.609344 km per international mile.' }
  ],
  'temperature-converter': [
    { question: 'How do you convert 68 F to Celsius?', answer: 'Subtract 32 and multiply by 5/9: (68 - 32) x 5/9 = 20 C, a mild room temperature.' },
    { question: 'What is -40 in Fahrenheit and Celsius?', answer: 'They meet at -40: -40 F equals -40 C, the only point where both scales agree.' },
    { question: 'How do you convert Celsius to Kelvin?', answer: 'Add 273.15. Water freezes at 273.15 K and boils at 373.15 K at sea level.' }
  ],
  'body-mass-index-calculator': [
    { question: 'How is BMI calculated?', answer: 'Divide weight in kilograms by height in metres squared. A 70 kg adult at 1.75 m has BMI 70 / (1.75 x 1.75) = 22.9.' },
    { question: 'What is a healthy BMI for adults?', answer: 'The WHO reference band is 18.5 to 24.9. Below is underweight, 25-29.9 is overweight, 30+ is obesity.' },
    { question: 'Is BMI a diagnosis?', answer: 'No. BMI is a population screening tool that ignores muscle, bone density, and fat distribution. Ask a clinician for personal advice.' }
  ],
  'concrete-calculator': [
    { question: 'How many 80 lb bags make a cubic yard of concrete?', answer: 'About 45 bags, since each 80 lb bag yields roughly 0.60 cubic feet and a yard holds 27 cubic feet.' },
    { question: 'Should you add extra concrete to an order?', answer: 'Yes. Order 5-10% extra for spillage, uneven subgrade, and form bulging on slabs and footings.' }
  ],
};

const CATEGORY_SOURCES: Record<CategoryId, Source[]> = {
  'everyday-finance': [
    { label: 'Internal Revenue Service (IRS)', url: 'https://www.irs.gov' },
    { label: 'U.S. Bureau of Labor Statistics', url: 'https://www.bls.gov' },
    { label: 'Tax Foundation - State & Local Tax Data', url: 'https://taxfoundation.org' }
  ],
  'date-time': [
    { label: 'ISO 8601 Date and Time Format', url: 'https://www.iso.org/iso-8601-date-and-time-format.html' },
    { label: 'timeanddate.com - Calendar Standards', url: 'https://www.timeanddate.com' }
  ],
  'math-stats': [
    { label: 'NIST Digital Library of Mathematical Functions', url: 'https://dlmf.nist.gov' },
    { label: 'Khan Academy - Math Library', url: 'https://www.khanacademy.org/math' }
  ],
  'converters': [
    { label: 'BIPM - The International System of Units (SI)', url: 'https://www.bipm.org/en/measurement-units' },
    { label: 'NIST Special Publication 811 - Guide for the SI', url: 'https://www.nist.gov/pml/special-publication-811' }
  ],
  'home-improvement': [
    { label: 'Portland Cement Association', url: 'https://www.cement.org' },
    { label: 'This Old House - DIY Guides', url: 'https://www.thisoldhouse.com' }
  ],
  'health-fitness': [
    { label: 'WHO - Obesity and Overweight Fact Sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight' },
    { label: 'Mayo Clinic - Water: How Much Should You Drink?', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256' },
    { label: 'World Athletics', url: 'https://worldathletics.org' }
  ]
};

const AUTHOR_BY_CATEGORY: Record<CategoryId, string> = {
  'everyday-finance': 'maya-chen',
  'date-time': 'daniel-okoro',
  'math-stats': 'daniel-okoro',
  'converters': 'daniel-okoro',
  'home-improvement': 'sofia-marchetti',
  'health-fitness': 'sofia-marchetti'
};

const REVIEWER_BY_CATEGORY: Record<CategoryId, string> = {
  'everyday-finance': 'daniel-okoro',
  'date-time': 'maya-chen',
  'math-stats': 'maya-chen',
  'converters': 'maya-chen',
  'home-improvement': 'daniel-okoro',
  'health-fitness': 'daniel-okoro'
};

export function getCalculatorDates() {
  return { published: DEFAULT_DATE_PUBLISHED, updated: DEFAULT_DATE_UPDATED };
}

export function getCalculatorAuthor(category: CategoryId, authorId?: string) {
  return getTeamMember(authorId || AUTHOR_BY_CATEGORY[category], DEFAULT_AUTHOR_ID);
}

export function getCalculatorReviewer(category: CategoryId, reviewerId?: string) {
  return getTeamMember(reviewerId || REVIEWER_BY_CATEGORY[category], DEFAULT_REVIEWER_ID);
}

export function getDefinition(calculatorId: string, name: string): string {
  return (
    DEFINITIONS[calculatorId] ||
    `The ${name} is a free online calculator that shows every step of the working so you can verify the result yourself.`
  );
}

export function getExtraFaqs(calculatorId: string): FAQItem[] {
  return EXTRA_FAQS[calculatorId] || [];
}

export function getSources(category: CategoryId, own?: Source[]): Source[] {
  if (own && own.length > 0) return own;
  return CATEGORY_SOURCES[category] || [];
}

export function getEnrichedComparisonTable(
  calculatorId: string,
  own?: ComparisonTable
): ComparisonTable | undefined {
  return own || getComparisonTable(calculatorId);
}

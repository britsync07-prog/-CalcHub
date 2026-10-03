import { CategoryId, ComparisonTable, FAQItem, Source } from '../types/calculator';
import { DEFAULT_AUTHOR_ID, DEFAULT_REVIEWER_ID, getTeamMember } from './editorialTeam';
import { getComparisonTable } from './comparisonTables';

export const DEFAULT_DATE_PUBLISHED = '2025-02-10';
export const DEFAULT_DATE_UPDATED = '2026-10-01';

/** One-sentence "X is..." definitions for direct-answer / AI extraction. */
export const DEFINITIONS: Record<string, string> = {
  'percentage-calculator': 'A percentage calculator is a mathematical utility that computes what a specific rate out of one hundred equals for any whole number or amount. Using the core formula Value = (Rate / 100) × Base, it instantly solves percentage problems, such as finding that 20% of 150 equals 30.',
  'percent-change-calculator': 'A percent change calculator measures the relative rate of growth or shrinkage between an original baseline value and an updated final value. Calculated using the formula ((New - Old) / |Old|) × 100%, it clearly indicates direction and magnitude, such as an increase from $80 to $100 representing a +25% change.',
  'percentage-difference-calculator': 'A percentage difference calculator calculates the relative difference between two non-directional numerical values relative to their average. Using the formula (|V1 - V2| / ((V1 + V2) / 2)) × 100%, it evaluates variance without a baseline, showing that the difference between 100 and 120 is exactly 18.18%.',
  'discount-calculator': 'A discount calculator determines the final reduced sale price and total cash savings from any promotional percentage or coupon markdown. Using the formula Sale Price = Original × (1 - Discount%), it shows shoppers that purchasing an $80 item at 25% off costs $60 while saving $20.',
  'sales-tax-calculator': 'A sales tax calculator computes the added tax amount and total transaction cost from local retail rates or reverses a grand total back to its pre-tax price. Using Total = Pretax × (1 + Rate), it verifies that a 7% sales tax on a $50 purchase adds $3.50.',
  'tip-calculator': 'A tip calculator is a dining utility that computes exact gratuity amounts and divides the final restaurant bill evenly among diners. Using the formula Tip = Bill × (Tip% / 100), it quickly calculates customary gratuity rates like 15%, 18%, or 20%, showing that a 20% tip on $50 equals $10.',
  'split-bill-calculator': 'A split bill calculator divides total dining and event checks, including restaurant food, local sales tax, and custom tips, evenly or individually among guests. By dividing the grand total by the party size, it shows that a $120 bill shared among four people equals $30 per person.',
  'profit-margin-calculator': 'A profit margin calculator measures gross profit percentage and markup ratio by comparing revenue against the cost of goods sold (COGS). Using Margin = ((Revenue - Cost) / Revenue) × 100%, it reveals that earning $50 gross profit on a $150 sale yields a 33.33% profit margin.',
  'markup-calculator': 'A markup calculator computes the optimal retail selling price, target gross revenue, and profit percentage from wholesale production costs. Applying the formula Price = Cost × (1 + Markup%), it confirms that a 50% markup on a product costing $100 establishes an optimal selling price of $150.',
  'commission-calculator': 'A commission calculator computes sales compensation, bonus rates, and total payouts for commercial representatives based on gross revenue and tiered commission structures. Using Earnings = Sales × Rate, it proves that a representative earning a 5% commission rate on $40,000 in monthly sales receives $2,000.',
  'simple-interest-calculator': 'A simple interest calculator computes financial interest earnings and total maturity balances without exponential compounding over days, months, or years. Using the formula Interest = Principal × Rate × Time (I = Prt), it confirms that depositing $1,000 at a 5% annual rate for 2 years yields $100 in interest.',
  'compound-interest-calculator': 'A compound interest calculator models wealth accumulation and future investment balances by compounding interest earnings into principal across recurring periods. Applying the formula A = P(1 + r/n)^(nt), it demonstrates how $5,000 invested at 7% compounded monthly grows into $10,048 over a ten-year investment horizon.',
  'hourly-to-salary-calculator': 'An hourly to salary calculator converts hourly wages into unadjusted annual, monthly, biweekly, and weekly gross earnings based on standard working schedules. By multiplying an hourly wage by 2,080 annual full-time hours (40 hours × 52 weeks), it shows that a $25 hourly wage equals $52,000 per year before taxes.',
  'salary-to-hourly-calculator': 'A salary to hourly calculator converts annual base compensation into equivalent hourly, daily, and weekly earnings across varying work schedules. By dividing gross annual pay by 2,080 standard annual work hours, it determines that a $75,000 annual corporate salary yields an equivalent earning rate of approximately $36.06 per hour.',
  'fuel-cost-calculator': 'A fuel cost calculator estimates total trip gas expenses, vehicle fuel consumption, cost per mile, and shared travel costs for road trips and commutes. By dividing total trip distance by vehicle fuel economy (MPG or L/100km) and multiplying by fuel price, it determines exact driving expenditure per passenger.',
  'days-between-dates': 'A days between dates calculator counts the exact number of calendar days, weeks, months, and leap days elapsed between two selected dates. Operating on standard Gregorian calendar algorithms, it accurately calculates the exact duration between dates, such as identifying 90 calendar days between January 1 and April 1.',
  'date-difference-calculator': 'A date difference calculator calculates the exact chronological interval between two calendar points, breaking the elapsed duration down into years, months, and days. By accounting for variable month lengths and leap years, it verifies that the difference between June 1, 2020, and March 1, 2026, is 5 years and 9 months.',
  'days-from-today': 'A days from today calculator adds or subtracts a specific number of calendar days from the present date to identify an exact target date. Designed for project deadlines and travel planning, it verifies future and past milestones, such as finding the exact calendar date occurring 45 days from today.',
  'age-calculator': 'An age calculator computes chronological age from a date of birth to the current date, expressed in years, months, days, hours, and minutes. By adjusting for leap years and calendar month lengths, it reveals that a person born March 15, 1995, is exactly 31 years old.',
  'business-days-calculator': 'A business days calculator counts the total number of workdays between two selected dates while automatically excluding weekend days (Saturdays and Sundays). Used for contractual delivery timelines and sprint planning, it shows that a four-week period containing 28 total calendar days includes exactly 20 productive business days.',
  'time-duration-calculator': 'A time duration calculator measures total elapsed hours, minutes, and seconds between an initial start time and end time, accounting for unpaid breaks. Ideal for payroll timesheets and athletic logs, it verifies that working from 8:30 AM to 5:00 PM with a 45-minute lunch yields 7.75 hours.',
  'countdown-calculator': 'A countdown calculator displays live, precision days, hours, minutes, and seconds remaining until an upcoming holiday, anniversary, or scheduled event. By synchronizing with international UTC time, it gives an accurate real-time countdown to target deadlines such as New Year\'s Day or Christmas morning.',
  'week-number-calculator': 'A week number calculator returns the official calendar week of the year for any date according to the ISO 8601 international scheduling standard. It identifies work weeks from Week 1 to Week 52 (or 53), showing corporate planners the standardized fiscal week containing any given day.',
  'time-zone-planner': 'A time zone planner is a cross-border scheduling utility that compares active hours across global cities simultaneously on a 24-hour visual matrix. It identifies optimal overlapping business hours (9 AM to 5 PM) between remote team members in cities like New York, London, Tokyo, and Sydney to eliminate scheduling friction.',
  'scientific-calculator': 'A scientific calculator evaluates advanced arithmetic, trigonometry, exponents, natural logarithms, roots, and factorial operations directly in the browser. Designed with strict mathematical order of operations (PEMDAS), it accurately computes complex formulas such as sin(45°), log(100), and square roots with high floating-point precision.',
  'fraction-calculator': 'A fraction calculator adds, subtracts, multiplies, and divides proper, improper, and mixed fractions while reducing final answers to lowest common denominators. Using prime factorization, it shows each step of fraction arithmetic, demonstrating that adding 1/2 and 1/3 yields 5/6 through a shared denominator of 6.',
  'decimal-to-fraction-calculator': 'A decimal to fraction calculator converts terminating and repeating decimal numbers into fully simplified proper or mixed fractions. By expressing the decimal over powers of ten and dividing by the greatest common divisor (GCD), it shows that 0.75 simplifies into 3/4 and 1.625 simplifies into 1 5/8.',
  'ratio-calculator': 'A ratio calculator simplifies mathematical ratios into lowest integers and solves for missing fourth terms in proportionate mathematical equations (A:B = C:D). By applying cross-multiplication, it verifies that a ratio of 8:12 simplifies to 2:3, and solves proportions such as 4/8 = x/16 to find x = 8.',
  'square-root-calculator': 'A square root calculator determines the principal square root (√x) and arbitrary nth roots of any positive real number. By finding the number that multiplies by itself to produce the radicand, it verifies that √144 = 12 and calculates irrational roots to six decimal places.',
  'exponent-calculator': 'An exponent calculator computes powers by raising any base number (b) to an integer or fractional exponent (n) using bⁿ. Designed for compound mathematics and scientific notation, it computes large powers instantly, showing that raising 2 to the 10th power (2¹⁰) produces an exact result of 1,024.',
  'lcm-gcd-calculator': 'An LCM and GCD calculator finds the Least Common Multiple and Greatest Common Divisor of two or more numbers using prime factorization and Euclidean algorithms. It simplifies fraction operations and modular arithmetic, showing that 12 and 18 share a GCD of 6 and an LCM of 36.',
  'prime-number-calculator': 'A prime number calculator tests whether any integer is a prime number and generates its complete prime factorization tree. By testing divisibility up to the square root of the number, it confirms that 97 is prime while demonstrating that 84 factors into 2² × 3 × 7.',
  'mean-median-mode-calculator': 'A mean, median, and mode calculator computes central tendency statistics, sum, range, and count from any entered list of numbers. It finds the mathematical average (mean), central ordered value (median), and most frequent number (mode), showing that for {2, 4, 4, 8, 12}, the mean is 6.',
  'standard-deviation-calculator': 'A standard deviation calculator computes population and sample standard deviation (σ and s), variance, and mean from a dataset. By calculating root-mean-square deviations, it quantifies data dispersion, proving how tightly individual data points cluster around the average in statistical analysis.',
  'length-converter': 'A length converter translates distance measurements between metric and imperial units including meters, feet, inches, centimeters, yards, kilometers, and miles. Adhering to international treaty factors, it provides exact mathematical conversions, confirming that 1 inch equals exactly 2.54 centimeters and 1 meter equals approximately 3.28084 feet.',
  'weight-mass-converter': 'A weight converter converts mass values between pounds, kilograms, ounces, grams, stones, and metric tons using international avoirdupois standards. Applying the exact conversion factor of 1 pound to 0.45359237 kilograms, it reliably translates kitchen recipe measurements, postal package weights, and body mass values.',
  'temperature-converter': 'A temperature converter translates thermal readings between Fahrenheit (°F), Celsius (°C), and Kelvin (K) using exact thermodynamic conversion equations. By applying formulas like °C = (°F - 32) × 5/9, it confirms that water freezes at 32°F (0°C) and boils at 212°F (100°C) at standard atmospheric pressure.',
  'oven-temperature-converter': 'An oven temperature converter translates cooking temperatures between Fahrenheit, Celsius, British Gas Marks, and fan-forced convection ovens. It incorporates the standard culinary rule of reducing conventional temperatures by 20°C (25°F) for fan ovens, showing that a standard 350°F recipe corresponds to 177°C conventional, 160°C fan, or Gas Mark 4.',
  'area-converter': 'An area converter converts surface measurements between square feet, square meters, acres, hectares, square yards, and square inches. Operating on exact geometric factors, it assists real estate transactions and construction estimates, showing that 1 acre contains exactly 43,560 square feet or approximately 4,046.86 square meters.',
  'volume-converter': 'A volume converter converts liquid and dry capacities between US fluid ounces, milliliters, liters, cups, pints, quarts, and gallons. Designed for baking and fluid engineering, it confirms that 1 US gallon equals 128 fluid ounces (3.78541 liters) and 1 liter equals 1,000 milliliters.',
  'speed-converter': 'A speed converter translates velocity rates between miles per hour (mph), kilometers per hour (km/h), meters per second (m/s), and nautical knots. Employed in automotive and aviation calculations, it confirms that traveling at 60 mph corresponds to 96.56 km/h or approximately 26.82 meters per second.',
  'data-storage-converter': 'A data storage converter converts digital storage volumes between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB) in decimal and binary. By distinguishing between 1,000-byte metric units and 1,024-byte binary kibibytes (KiB), it resolves file size discrepancies on hard drives and cloud storage.',
  'pressure-converter': 'A pressure converter translates fluid and atmospheric pressure between pounds per square inch (PSI), bar, kilopascals (kPa), and standard atmospheres (atm). Essential for automotive tires and HVAC engineering, it confirms that standard atmospheric pressure equals 14.696 PSI, 1.01325 bar, or 101.325 kilopascals.',
  'fuel-economy-converter': 'A fuel economy converter translates vehicle mileage consumption between US miles per gallon (MPG), UK Imperial MPG, and liters per 100 kilometers (L/100km). Applying inverse metric formulas, it proves that an American car rated at 30 US MPG consumes approximately 7.84 liters of fuel per 100 kilometers.',
  'square-footage-calculator': 'A square footage calculator measures total floor and wall area in square feet and square yards from room length and width dimensions. Built to estimate home remodeling materials, it sums multiple rooms into a single tally, showing that a 12-by-15-foot room contains exactly 180 square feet.',
  'paint-calculator': 'A paint calculator estimates the number of paint gallons required for interior and exterior painting projects based on wall dimensions, doors, and coats. Factoring in the standard coverage of 350 to 400 square feet per gallon, it prevents overbuying by estimating exact paint volumes needed.',
  'flooring-calculator': 'A flooring calculator determines total square footage, required tile or hardwood cartons, and estimated materials expenditure for flooring installations. By automatically adding a recommended 10% cutting-waste allowance to raw room dimensions, it ensures homeowners purchase sufficient square footage to complete their project without shortages.',
  'tile-calculator': 'A tile calculator estimates the total number of ceramic or porcelain floor and wall tiles needed based on room dimensions and individual tile sizes. By accounting for grout joint widths and a 10% cutting-waste factor, it shows that tiling a 100-square-foot room with 12x12 tiles requires 110 tiles.',
  'concrete-calculator': 'A concrete calculator computes the required volume of ready-mix concrete in cubic yards and standard commercial bags for slabs, footings, and post holes. Using the formula Volume = Length × Width × Depth, it confirms that a 10-by-10-foot patio slab poured 4 inches thick requires 1.23 cubic yards.',
  'mulch-gravel-calculator': 'A mulch and gravel calculator estimates landscaping material volumes in cubic yards, tons, and retail bags based on garden bed dimensions and coverage depth. By converting bed square footage into cubic yards, it confirms that covering a 200-square-foot garden at a 3-inch depth requires 1.85 cubic yards.',
  'running-pace-calculator': 'A running pace calculator converts overall running time and race distance into pace per mile and pace per kilometer for training and competition. Designed for 5K, 10K, half-marathons, and marathons, it shows that running a 5K race in 25 minutes requires an average pace of 8:03 per mile.',
  'walking-steps-to-distance-calories': 'A steps to distance calculator converts daily pedometer step counts into estimated miles, kilometers, and active calories burned based on height and body weight. Based on an average stride length of 2.2 to 2.5 feet, it reveals that walking 10,000 steps covers approximately 5 miles and burns roughly 400 calories.',
  'daily-water-intake-calculator': 'A daily water intake calculator estimates optimal fluid consumption in fluid ounces and liters based on body weight, climate, and daily exercise minutes. Factoring in metabolic hydration requirements, it shows that an active 160-pound individual exercising 45 minutes daily should consume approximately 105 fluid ounces of water.',
  'body-mass-index-calculator': 'A body mass index (BMI) calculator evaluates weight status by dividing a person\'s body weight by height squared according to World Health Organization (WHO) categories. Applying the formula BMI = kg/m² or 703 × lb/in², it categorizes results into underweight, normal weight (18.5–24.9), overweight, and obesity ranges.'
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

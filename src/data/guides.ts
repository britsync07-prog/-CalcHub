export interface GuideSection {
  heading: string;
  level?: 2 | 3;
  content: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    title: string;
    text: string;
    calculatorSlug: string;
    calculatorName: string;
  };
}

export interface GuideDefinition {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
  };
  readTimeMinutes: number;
  category: string;
  tags: string[];
  primaryCalculatorSlug: string;
  relatedCalculatorSlugs: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
}

export const GUIDES: GuideDefinition[] = [
  {
    slug: 'ultimate-tipping-guide',
    title: 'The Definitive Guide to Tipping: When, How Much, and International Etiquette',
    metaTitle: 'The Definitive Guide to Tipping: Rates, Rules & International Etiquette',
    metaDescription: 'Complete guide to tipping etiquette for restaurants, food delivery, bartenders, salons, and hotels. Master tipping percentages and calculation formulas.',
    h1: 'The Definitive Guide to Tipping: Rates, Rules, and Modern Etiquette',
    summary: 'Master standard tipping percentages, pre-tax vs post-tax calculation rules, salon and rideshare etiquette, and international customs with practical formulas.',
    publishedDate: '2025-01-15',
    updatedDate: '2026-02-10',
    author: {
      name: 'Elena Rostova, CFP',
      role: 'Consumer Finance Analyst'
    },
    readTimeMinutes: 7,
    category: 'Everyday & Money',
    tags: ['tipping', 'dining', 'etiquette', 'personal finance', 'restaurants'],
    primaryCalculatorSlug: 'tip-calculator',
    relatedCalculatorSlugs: ['split-bill-calculator', 'percentage-calculator'],
    sections: [
      {
        heading: 'Understanding Modern Tipping Norms',
        level: 2,
        content: [
          'Tipping practices have evolved significantly over the past decade with the widespread adoption of point-of-sale tablets and digital checkout screens. While tipping was traditionally reserved for sit-down restaurant servers, consumers now encounter tip prompts at coffee counters, takeout windows, and self-serve kiosks.',
          'In full-service dining across North America, tips constitute the primary source of compensation for waitstaff under federal and state sub-minimum tipped wage regulations. Understanding standard baseline percentages protects you from awkward social misunderstandings while ensuring service workers are fairly compensated.'
        ],
        callout: {
          title: 'Calculate Your Tip Instantly',
          text: 'Use our free interactive tool to calculate exact tip amounts, split totals per diner, and round up.',
          calculatorSlug: 'tip-calculator',
          calculatorName: 'Tip Calculator'
        }
      },
      {
        heading: 'Standard Tipping Rates by Service Category',
        level: 2,
        content: [
          'Different service industries follow distinct tipping benchmarks. The table below outlines the standard etiquette expected in the United States and Canada:'
        ],
        table: {
          headers: ['Service Type', 'Standard Gratuity', 'Exceptional Service', 'Notes'],
          rows: [
            ['Sit-down Restaurant', '18% - 20%', '22% - 25%', 'Calculated on the pre-tax food and beverage subtotal.'],
            ['Food Delivery (DoorDash/UberEats)', '15% - 20% ($4 min)', '$5 - $8+', 'Increase tip during rain, snow, or peak rush hour.'],
            ['Bartender', '$1 - $2 per drink or 20%', '$2+ for craft cocktails', 'Tip higher for labor-intensive bespoke drinks.'],
            ['Coffee Barista', 'Optional ($1 or change)', '$1 - $2', 'Standard for complex custom espresso drinks.'],
            ['Hairstylist / Barber', '18% - 20%', '25%', 'Tip applies to full service cost before product purchases.'],
            ['Hotel Housekeeping', '$3 - $5 per night', '$5 - $10 per night', 'Leave cash daily with a note marked "Housekeeping".'],
            ['Rideshare (Uber / Lyft)', '15% - 20%', '20%+', 'Add extra for assistance with heavy luggage.']
          ]
        }
      },
      {
        heading: 'Pre-Tax vs. Post-Tax: The Golden Calculation Rule',
        level: 2,
        content: [
          'A frequent point of confusion is whether to calculate tips before or after sales tax. Etiquette experts agree: gratuity should always be calculated on the pre-tax subtotal of food and beverages.',
          'Sales tax is a government assessment, not a service provided by your server. In jurisdictions with high municipal sales tax rates (such as 8% to 10%), tipping on the post-tax total can inflate your gratuity by several dollars needlessly.',
          'Formula: Tip Amount = Pre-Tax Subtotal × (Tip Percentage / 100).'
        ]
      },
      {
        heading: 'International Tipping Customs',
        level: 2,
        content: [
          'Tipping culture varies drastically across borders. In Japan and South Korea, leaving a monetary tip can be considered insulting, as good service is viewed as a fundamental standard included in the bill.',
          'Throughout most of Western Europe (such as France, Italy, and Germany), a service charge (service compris) is built directly into prices. While rounding up the change or leaving 5% to 10% in cash for attentive service is appreciated, 20% gratuities are neither expected nor customary.',
          'In the UK and Australia, tipping is discretionary. In the UK, 10% to 12.5% optional service charges are often added to restaurant bills in London, whereas in Australia and New Zealand, tipping remains rare due to higher statutory minimum wages.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Should I tip on takeout or counter pickup orders?',
        answer: 'Tipping on takeout is optional. For standard counter pickup, 0% to 10% (or leaving loose change in a jar) is customary. However, for large catering orders or complex packaging, tipping 10% to 15% is appreciated.'
      },
      {
        question: 'What should I do if the bill includes an automatic gratuity?',
        answer: 'Always inspect your itemized check before writing a tip. Many restaurants automatically apply an 18% to 20% service fee for parties of 6 or more. If auto-gratuity is already included, you do not need to add another tip unless service was extraordinary.'
      },
      {
        question: 'How do I split a restaurant tip fairly among a group?',
        answer: 'Calculate the total bill including food and tip, then divide by the number of paying guests. Use our Split Bill Calculator to handle itemized uneven splits where one guest ordered wine or premium entrees.'
      }
    ]
  },
  {
    slug: 'kitchen-measurement-conversions',
    title: 'Kitchen Measurement & Volume Conversions: Cups, Grams, Tablespoons, and Ounces',
    metaTitle: 'Kitchen Measurement Conversions: Weight to Volume, Cups to Grams & Spoons',
    metaDescription: 'Complete kitchen measurement conversion guide. Convert dry and liquid cups to grams, ounces, milliliters, tablespoons, and teaspoons accurately.',
    h1: 'Kitchen Measurement & Volume Conversions: The Ultimate Culinary Guide',
    summary: 'Convert recipes effortlessly between US Customary, Imperial, and Metric units. Understand why weighing flour beats scooping and master volume-to-weight conversions.',
    publishedDate: '2025-01-14',
    updatedDate: '2026-02-12',
    author: {
      name: 'Chef Marcus Sterling',
      role: 'Culinary Specialist & Recipe Developer'
    },
    readTimeMinutes: 8,
    category: 'Unit Converters',
    tags: ['cooking', 'baking', 'kitchen conversion', 'cups to grams', 'food math'],
    primaryCalculatorSlug: 'cooking-unit-converter',
    relatedCalculatorSlugs: ['oven-temperature-converter', 'volume-converter'],
    sections: [
      {
        heading: 'Why Weight Beats Volume in Baking',
        level: 2,
        content: [
          'In baking, precision is chemistry. A single measuring cup of all-purpose flour can weigh anywhere from 115 grams to 160 grams depending on how you scoop it: dip-and-sweep packs flour tightly, whereas spooning and leveling aerates it.',
          'Professional pastry chefs exclusively use digital kitchen scales measuring in grams. When converting European or modern American recipes, using an exact weight-to-volume chart prevents dry cakes, dense bread, and flat cookies.'
        ],
        callout: {
          title: 'Convert Cooking Units Instantly',
          text: 'Convert tablespoons, cups, ounces, grams, and milliliters for all common baking ingredients.',
          calculatorSlug: 'cooking-unit-converter',
          calculatorName: 'Cooking Unit Converter'
        }
      },
      {
        heading: 'Essential Baking Ingredient Weight Reference',
        level: 2,
        content: [
          'Different ingredients have varying densities. One cup of granulated white sugar is significantly heavier than one cup of flour or cocoa powder:'
        ],
        table: {
          headers: ['Ingredient', '1 Cup', '1/2 Cup', '1/4 Cup', '1 Tablespoon'],
          rows: [
            ['All-Purpose Flour', '125 grams (4.4 oz)', '63 grams', '31 grams', '8 grams'],
            ['Granulated White Sugar', '200 grams (7.1 oz)', '100 grams', '50 grams', '12.5 grams'],
            ['Brown Sugar (Packed)', '220 grams (7.8 oz)', '110 grams', '55 grams', '14 grams'],
            ['Powdered / Icing Sugar', '120 grams (4.2 oz)', '60 grams', '30 grams', '7.5 grams'],
            ['Butter (Unsalted)', '227 grams (2 sticks / 8 oz)', '113 grams (1 stick)', '57 grams', '14.2 grams'],
            ['Rolled Oats', '90 grams (3.2 oz)', '45 grams', '23 grams', '6 grams'],
            ['Cocoa Powder (Unsweetened)', '85 grams (3.0 oz)', '43 grams', '21 grams', '5.5 grams'],
            ['Whole Milk / Water', '240 ml / 240g (8.5 oz)', '120 ml', '60 ml', '15 ml']
          ]
        }
      },
      {
        heading: 'Liquid Volume Conversions Cheat Sheet',
        level: 2,
        content: [
          'Liquid measuring cups feature spouts and lines designed for surface meniscus measurement. Keep these basic culinary volume equivalencies in mind:',
          '• 1 Tablespoon (tbsp) = 3 Teaspoons (tsp) = 15 ml = 1/2 Fluid Ounce (fl oz)',
          '• 1/4 Cup = 4 Tablespoons = 60 ml = 2 fl oz',
          '• 1/3 Cup = 5 Tablespoons + 1 Teaspoon = 80 ml = 2.7 fl oz',
          '• 1/2 Cup = 8 Tablespoons = 120 ml = 4 fl oz',
          '• 1 Cup = 16 Tablespoons = 48 Teaspoons = 240 ml = 8 fl oz',
          '• 1 Pint = 2 Cups = 480 ml = 16 fl oz',
          '• 1 Quart = 4 Cups = 2 Pints = 960 ml = 32 fl oz',
          '• 1 Gallon = 16 Cups = 4 Quarts = 3.785 Liters = 128 fl oz'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are US measuring cups the same as UK or Australian cups?',
        answer: 'No. A US Customary legal cup is 240 ml (or 236.6 ml traditional), while an Imperial UK cup is 284 ml. Australia, New Zealand, and South Africa use a metric cup standard of exactly 250 ml. When following international recipes, weigh ingredients in grams to bypass cup volume differences.'
      },
      {
        question: 'How many dry ounces are in a cup of flour?',
        answer: 'One standard cup of sifted all-purpose flour weighs approximately 4.4 dry weight ounces (125 grams). Note that fluid ounces (a measure of volume) and dry ounces (a measure of mass) are different units.'
      }
    ]
  },
  {
    slug: 'oven-temperatures-convection-gas-mark',
    title: 'Oven Temperatures Demystified: Convection, Gas Mark, and Fan Oven Conversion',
    metaTitle: 'Oven Temperature Guide: Convection, Gas Mark, Celsius & Fahrenheit',
    metaDescription: 'Complete oven temperature conversion chart. How to adjust temperatures for fan ovens, understand British Gas Marks, and avoid burnt baked goods.',
    h1: 'Oven Temperatures Demystified: Convection, Gas Mark, and Fan Oven Conversions',
    summary: 'Learn how to convert recipe oven temperatures across Fahrenheit, Celsius, Gas Mark, and Fan-assisted ovens with exact formulas and baking rules.',
    publishedDate: '2025-01-20',
    updatedDate: '2026-02-15',
    author: {
      name: 'Chef Marcus Sterling',
      role: 'Culinary Specialist & Recipe Developer'
    },
    readTimeMinutes: 7,
    category: 'Unit Converters',
    tags: ['oven temperature', 'baking', 'convection oven', 'gas mark', 'kitchen tips'],
    primaryCalculatorSlug: 'oven-temperature-converter',
    relatedCalculatorSlugs: ['cooking-unit-converter', 'temperature-converter'],
    sections: [
      {
        heading: 'Why Fan Ovens Require Temperature Reductions',
        level: 2,
        content: [
          'Convection ovens (commonly termed "fan ovens" in the UK, Australia, and New Zealand) incorporate an internal fan that actively circulates heated air around food. This continuous airflow breaks down the blanket of cooler air that naturally surrounds cold dough or meat.',
          'Because convection transfers thermal energy far more efficiently than still radiant heat, using the temperature specified for a conventional oven will cause cookies to burn on the edges before the center bakes. The standard culinary rule of thumb is to reduce the temperature by 20°C (or 25°F).'
        ],
        callout: {
          title: 'Convert Oven Temperatures Instantly',
          text: 'Switch between Fahrenheit, Celsius, British Gas Marks, and Fan Oven settings in real time.',
          calculatorSlug: 'oven-temperature-converter',
          calculatorName: 'Oven Temperature Converter'
        }
      },
      {
        heading: 'Master Oven Temperature Conversion Table',
        level: 2,
        content: [
          'Use this comprehensive comparison table to quickly convert recipe temperatures across all major international oven systems:'
        ],
        table: {
          headers: ['Gas Mark', 'Conventional °F', 'Conventional °C', 'Fan Oven °C', 'Culinary Description'],
          rows: [
            ['1/4', '225°F', '110°C', '90°C', 'Very Cool / Meringue & Fruit Dehydration'],
            ['1/2', '250°F', '130°C', '110°C', 'Slow Oven / Slow-cooked Stews'],
            ['1', '275°F', '140°C', '120°C', 'Warm / Rich Fruit Cakes'],
            ['2', '300°F', '150°C', '130°C', 'Slow / Cheesecakes & Shortbread'],
            ['3', '325°F', '165°C', '145°C', 'Moderate Slow / Sponge Cakes'],
            ['4', '350°F', '177°C', '160°C', 'Moderate Standard / Cookies, Muffins, Brownies'],
            ['5', '375°F', '190°C', '170°C', 'Moderate Hot / Quick Breads & Roasted Veggies'],
            ['6', '400°F', '200°C', '180°C', 'Hot / Pies, Choux Pastry & Roasted Chicken'],
            ['7', '425°F', '220°C', '200°C', 'Hot / Scones & Crispy Potatoes'],
            ['8', '450°F', '230°C', '210°C', 'Very Hot / Puff Pastry & Crusty Artisan Bread'],
            ['9', '475°F', '245°C', '225°C', 'Extremely Hot / Homemade Pizza']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'Should I reduce cooking time or temperature for convection?',
        answer: 'Culinary instructors recommend reducing the temperature by 20°C (25°F) while keeping cooking time the same. This preserves delicate crust development without drying out the interior.'
      },
      {
        question: 'What is 350°F in a fan oven?',
        answer: '350°F conventional is 177°C. In a fan-assisted oven, reduce the setting to 160°C (or 325°F) for identical baking performance.'
      }
    ]
  },
  {
    slug: 'home-renovation-materials-guide',
    title: 'Home Renovation Estimating: How to Calculate Paint, Flooring, and Tiles Accurately',
    metaTitle: 'Home Renovation Material Guide: Paint, Flooring & Tile Calculations',
    metaDescription: 'Step-by-step formulas for estimating renovation materials. How to calculate paint gallons, flooring boxes, tile waste, and room square footage.',
    h1: 'Home Renovation Estimating: How to Calculate Paint, Flooring, and Tiles Accurately',
    summary: 'Avoid expensive over-ordering or project delays. Master square footage calculations, waste percentages, and material coverage formulas for DIY home projects.',
    publishedDate: '2025-01-13',
    updatedDate: '2026-02-18',
    author: {
      name: 'Derek Vance',
      role: 'General Contractor & Construction Estimator'
    },
    readTimeMinutes: 9,
    category: 'Home & Construction',
    tags: ['renovation', 'paint calculator', 'flooring calculator', 'tile calculator', 'diy projects'],
    primaryCalculatorSlug: 'square-footage-calculator',
    relatedCalculatorSlugs: ['paint-calculator', 'flooring-calculator', 'tile-calculator'],
    sections: [
      {
        heading: 'The Foundation: Calculating True Net Square Footage',
        level: 2,
        content: [
          'Every material estimate begins with accurate surface area measurements. For rectangular rooms, calculating floor area is simple: Length × Width.',
          'For walls, measure the total perimeter of the room and multiply by the ceiling height, then subtract non-painted openings (windows average 15 sq ft each; standard interior doors average 21 sq ft each).',
          'Formula: Net Wall Area = (Perimeter × Ceiling Height) - (Door Area + Window Area).'
        ],
        callout: {
          title: 'Calculate Paint & Surface Area',
          text: 'Determine exact room dimensions and gallons required with our instant paint estimator.',
          calculatorSlug: 'paint-calculator',
          calculatorName: 'Paint Calculator'
        }
      },
      {
        heading: 'Flooring Calculations & Waste Margins',
        level: 2,
        content: [
          'When ordering hardwood, laminate, or luxury vinyl plank (LVP), you must account for cut-off scrap, plank alignment offsets, and perimeter expansions. Ordering the exact square footage of the room will leave you short.',
          'Industry standard waste factors:',
          '• Straight Plank Installation: Add 10% waste buffer.',
          '• Diagonal or Herringbone Pattern: Add 15% to 20% waste buffer due to angled wall trimming.',
          'Formula: Total Boxes = Ceiling[ (Room Area × (1 + Waste Factor)) / Box Coverage ].'
        ]
      },
      {
        heading: 'Tile Project Estimation',
        level: 2,
        content: [
          'Tile quantities depend on individual tile surface dimensions. For a standard 12" × 12" tile, each tile covers exactly 1 sq ft. For smaller 3" × 6" subway tiles, each piece covers only 0.125 sq ft (meaning 8 tiles per square foot).',
          'Always order 10% extra for straight layouts and 15% extra for bathrooms with intricate plumbing cutouts, niche insets, and curb edges.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many square feet does one gallon of paint cover?',
        answer: 'One standard gallon of interior acrylic latex paint covers 350 to 400 square feet on smooth, pre-primed walls. For unprimed drywall or textured plaster, coverage drops to 250 to 300 square feet per gallon.'
      },
      {
        question: 'Should I buy whole boxes of flooring or loose planks?',
        answer: 'Flooring manufacturers only sell material in sealed cartons (typically 18 to 24 sq ft per box). Always round up to the nearest whole box.'
      }
    ]
  },
  {
    slug: 'splitting-bills-fairly',
    title: 'How to Split Bills Fairly: Group Dining, Shared Utilities, and Modern Etiquette',
    metaTitle: 'How to Split Bills Fairly: Group Dining, Shared Expenses & Modern Etiquette',
    metaDescription: 'Learn how to split restaurant checks and household expenses without awkwardness. Pros and cons of even splitting, itemized breakdowns, and digital app tips.',
    h1: 'How to Split Bills Fairly: Group Dining, Shared Utilities, and Modern Etiquette',
    summary: 'Navigate group expenses with grace. Understand when even splitting works, how to handle non-drinkers and dietary differences, and master sales tax allocation.',
    publishedDate: '2025-01-12',
    updatedDate: '2026-02-18',
    author: {
      name: 'Elena Rostova, CFP',
      role: 'Consumer Finance Analyst'
    },
    readTimeMinutes: 7,
    category: 'Everyday & Money',
    tags: ['bill splitting', 'group dining', 'roommates', 'budgeting', 'personal finance'],
    primaryCalculatorSlug: 'split-bill-calculator',
    relatedCalculatorSlugs: ['tip-calculator', 'percentage-calculator'],
    sections: [
      {
        heading: 'The Three Methods of Bill Splitting',
        level: 2,
        content: [
          'Group outings can quickly turn awkward when the bill arrives. Choosing the right split methodology beforehand ensures fair contributions and preserves friendships:',
          '1. Even Division (The Equal Split): The total check is divided equally by the number of diners. Best for casual gatherings where everyone ordered similar appetizers and entrees.',
          '2. Itemized Individual Split: Each person pays for their exact entree, drinks, and a proportional share of tax and gratuity. Essential when alcohol consumption varies widely.',
          '3. Income-Proportional Split: Used primarily by couples or long-term roommates for shared household expenses (rent, utilities, groceries) where contributions mirror relative earnings.'
        ],
        callout: {
          title: 'Split Your Check Instantly',
          text: 'Divide bills evenly or calculate custom gratuity splits among up to 50 diners.',
          calculatorSlug: 'split-bill-calculator',
          calculatorName: 'Split Bill Calculator'
        }
      },
      {
        heading: 'Handling the Non-Drinker & Dietary Differences',
        level: 2,
        content: [
          'Alcohol is the #1 cause of bill-splitting friction. Cocktails at upscale restaurants cost $16 to $22 each. When two diners order two craft cocktails each ($80 total) while another drinks tap water, an equal split unfairly subsidizes the drinkers.',
          'Etiquette rule: Drinkers should volunteer to pay for their alcohol separately, or the group should agree in advance to itemize beverage tabs.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you calculate tax and tip proportionally on an itemized bill?',
        answer: 'Calculate each diner’s food subtotal, find what percentage that represents of the entire table’s subtotal, then apply that percentage to the total tax and tip.'
      },
      {
        question: 'Is it rude to ask for separate checks at a restaurant?',
        answer: 'Not at all, provided you ask before ordering begins so the server can open separate tickets in their point-of-sale terminal.'
      }
    ]
  },
  {
    slug: 'true-commute-cost-calculation',
    title: 'The Real Cost of Your Daily Commute: Fuel, Depreciation, and Travel Time',
    metaTitle: 'The Real Cost of Your Daily Commute: Gas, Wear, and Financial Impact',
    metaDescription: 'Calculate the true monthly and annual cost of commuting to work. Formulas for fuel consumption, IRS mileage rates, vehicle depreciation, and lost time.',
    h1: 'The Real Cost of Your Daily Commute: Fuel, Depreciation, and Travel Time',
    summary: 'Commuting costs far more than gas pump charges. Calculate tire wear, insurance rate increments, vehicle depreciation, and opportunity cost of drive time.',
    publishedDate: '2025-01-11',
    updatedDate: '2026-02-20',
    author: {
      name: 'Elena Rostova, CFP',
      role: 'Consumer Finance Analyst'
    },
    readTimeMinutes: 8,
    category: 'Everyday & Money',
    tags: ['commute', 'gas prices', 'car expenses', 'fuel cost', 'personal finance'],
    primaryCalculatorSlug: 'commute-cost-calculator',
    relatedCalculatorSlugs: ['fuel-cost-calculator', 'hourly-to-salary-calculator'],
    sections: [
      {
        heading: 'Beyond the Gas Pump: The Hidden Costs of Driving',
        level: 2,
        content: [
          'Most drivers underestimate commuting costs by only looking at gasoline fill-ups. According to transportation economics studies, fuel represents less than 35% of total operating expenses.',
          'The remaining 65% consists of vehicle depreciation, tire wear, oil changes, brake pads, insurance adjustments for high annual mileage, and highway tolls.',
          'The IRS standard business mileage rate (typically $0.67 to $0.70 per mile) provides a realistic picture of the comprehensive true cost of operating an automobile.'
        ],
        callout: {
          title: 'Calculate Your Commute Expenses',
          text: 'Find your monthly and annual travel expenses with our dedicated commute calculator.',
          calculatorSlug: 'commute-cost-calculator',
          calculatorName: 'Commute Cost Calculator'
        }
      },
      {
        heading: 'Commute Cost Formula',
        level: 2,
        content: [
          'To calculate your annual commute expenditure:',
          '1. Annual Mileage = Round Trip Miles × Workdays per Year (typically 240 days for full-time work).',
          '2. Annual Fuel Cost = (Annual Mileage / Vehicle MPG) × Gas Price per Gallon.',
          '3. Maintenance & Wear = Annual Mileage × $0.09 per mile (standard maintenance factor).',
          '4. Total Annual Commute = Fuel Cost + Maintenance + Tolls + Parking.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much does a 30-mile daily commute cost per year?',
        answer: 'A 30-mile round trip (7,200 miles/year) at 28 MPG with gas at $3.50/gal costs approximately $900 in fuel alone, plus $650 in maintenance and $1,200 in depreciation—totaling over $2,750 per year.'
      }
    ]
  },
  {
    slug: 'chronological-age-time-difference',
    title: 'Calculating Exact Chronological Age, Days Lived, and Calendar Intervals',
    metaTitle: 'How to Calculate Exact Chronological Age, Days Lived & Time Intervals',
    metaDescription: 'Understand chronological age calculations, leap year adjustments, elapsed calendar days, and next birthday countdowns with precision.',
    h1: 'Calculating Exact Chronological Age, Days Lived, and Calendar Intervals',
    summary: 'Discover how chronological age is computed down to years, months, days, and total hours lived. Learn how leap years and variable calendar month lengths work.',
    publishedDate: '2025-01-10',
    updatedDate: '2026-02-20',
    author: {
      name: 'Dr. Aris Thorne',
      role: 'Applied Mathematician & Statistical Consultant'
    },
    readTimeMinutes: 6,
    category: 'Date & Time',
    tags: ['age calculator', 'date difference', 'calendar math', 'days lived', 'time calculation'],
    primaryCalculatorSlug: 'age-calculator',
    relatedCalculatorSlugs: ['days-between-dates', 'date-difference-calculator'],
    sections: [
      {
        heading: 'Why Date Math Is Deceptively Complex',
        level: 2,
        content: [
          'Calculating elapsed time between two calendar dates is mathematically tricky because calendar units are non-uniform: months contain 28, 29, 30, or 31 days, and leap years occur every 4 years (with century exceptions).',
          'Chronological age calculations must account for the borrower month in subtraction algorithms when the target day number is smaller than the birth day number.'
        ],
        callout: {
          title: 'Calculate Exact Age & Milestone Countdown',
          text: 'Get your exact age in years, months, days, hours, and next birthday countdown.',
          calculatorSlug: 'age-calculator',
          calculatorName: 'Age Calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'How does leap year affect total days lived?',
        answer: 'Anyone born prior to February 29 during a leap year accumulates an extra day of life every four years compared to standard non-leap calendar intervals.'
      }
    ]
  },
  {
    slug: 'global-remote-meeting-scheduling',
    title: 'Coordinating Global Teams: How to Schedule Meetings Across Time Zones Without Friction',
    metaTitle: 'Global Remote Meeting Scheduling Across Time Zones: Overlap Matrix Guide',
    metaDescription: 'Master cross-timezone meeting planning. How to find overlapping business hours between North America, Europe, and Asia-Pacific without burnout.',
    h1: 'Coordinating Global Teams: How to Schedule Meetings Across Time Zones',
    summary: 'Eliminate scheduling confusion for international remote teams. Master UTC offsets, daylight saving discrepancies, and overlapping working windows.',
    publishedDate: '2025-01-09',
    updatedDate: '2026-02-22',
    author: {
      name: 'Elena Rostova, CFP',
      role: 'Consumer Finance Analyst'
    },
    readTimeMinutes: 7,
    category: 'Date & Time',
    tags: ['time zone planner', 'remote work', 'meeting scheduler', 'world clock', 'productivity'],
    primaryCalculatorSlug: 'time-zone-planner',
    relatedCalculatorSlugs: ['time-duration-calculator', 'days-between-dates'],
    sections: [
      {
        heading: 'The Challenge of Asynchronous Global Collaboration',
        level: 2,
        content: [
          'With remote teams distributed across continents, coordinating live synchronous meetings can trigger severe calendar strain if team members are forced into late-night or early-morning calls.',
          'Mapping meeting hours to a visual 24-hour overlap matrix reveals the narrow windows where participants in London, New York, and San Francisco are all awake and available during regular business hours.'
        ],
        callout: {
          title: 'Plan Your International Meeting',
          text: 'Compare 2 to 4 world cities simultaneously and find overlapping business hours.',
          calculatorSlug: 'time-zone-planner',
          calculatorName: 'Time Zone Planner'
        }
      }
    ],
    faqs: [
      {
        question: 'What is the best overlap window between California and London?',
        answer: 'San Francisco (PST) and London (GMT) have an 8-hour difference. The sweet spot is 8:00 AM–10:00 AM PST, which corresponds to 4:00 PM–6:00 PM in London.'
      }
    ]
  },
  {
    slug: 'personal-budgeting-percentages',
    title: 'Personal Budgeting With Percentages: Applying the 50/30/20 Rule to Your Salary',
    metaTitle: 'Personal Budgeting with Percentages: The 50/30/20 Rule Explained',
    metaDescription: 'Learn how to budget using percentage allocation formulas. Master the 50/30/20 rule for needs, wants, and savings on net income.',
    h1: 'Personal Budgeting With Percentages: Applying the 50/30/20 Rule',
    summary: 'Transform your paycheck into a clear financial plan. Calculate exact dollar allocations for needs, wants, and investments using mathematical ratios.',
    publishedDate: '2025-01-08',
    updatedDate: '2026-02-25',
    author: {
      name: 'Elena Rostova, CFP',
      role: 'Consumer Finance Analyst'
    },
    readTimeMinutes: 8,
    category: 'Everyday & Money',
    tags: ['budgeting', '50/30/20 rule', 'salary', 'personal finance', 'savings'],
    primaryCalculatorSlug: 'percentage-calculator',
    relatedCalculatorSlugs: ['hourly-to-salary-calculator', 'discount-calculator'],
    sections: [
      {
        heading: 'The 50/30/20 Budgeting Framework',
        level: 2,
        content: [
          'Popularized by bankruptcy expert and U.S. Senator Elizabeth Warren, the 50/30/20 budgeting rule allocates take-home net income into three intuitive categories:',
          '• 50% for Needs: Housing, groceries, utilities, basic transportation, minimum debt payments.',
          '• 30% for Wants: Dining out, hobbies, subscriptions, entertainment, vacations.',
          '• 20% for Savings & Debt Paydown: Emergency fund reserves, retirement contributions, high-interest credit card elimination.'
        ],
        callout: {
          title: 'Calculate Percentages of Your Income',
          text: 'Determine exact dollar amounts for each budget category with our percentage tool.',
          calculatorSlug: 'percentage-calculator',
          calculatorName: 'Percentage Calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'Is the 50/30/20 rule based on gross or net income?',
        answer: 'The rule is strictly applied to net after-tax take-home pay, rather than gross compensation.'
      }
    ]
  },
  {
    slug: 'concrete-mulch-landscaping-materials',
    title: 'Landscaping and Construction Estimating: Cubic Yards for Concrete, Mulch, and Gravel',
    metaTitle: 'How to Calculate Cubic Yards for Concrete, Mulch, Gravel & Soil',
    metaDescription: 'Master volume calculations for bulk landscaping and concrete slabs. Convert square feet and depth in inches to cubic yards and retail bags.',
    h1: 'Landscaping and Construction Estimating: Cubic Yards for Concrete, Mulch, and Gravel',
    summary: 'Never under-order materials again. Learn the cubic yard formula for garden beds, driveways, footings, and patios with practical bagged conversion factors.',
    publishedDate: '2025-01-06',
    updatedDate: '2026-02-28',
    author: {
      name: 'Derek Vance',
      role: 'General Contractor & Construction Estimator'
    },
    readTimeMinutes: 9,
    category: 'Home & Construction',
    tags: ['concrete calculator', 'mulch calculator', 'landscaping', 'construction math', 'cubic yards'],
    primaryCalculatorSlug: 'concrete-calculator',
    relatedCalculatorSlugs: ['mulch-gravel-calculator', 'square-footage-calculator'],
    sections: [
      {
        heading: 'The Universal Cubic Yard Formula',
        level: 2,
        content: [
          'In landscaping and masonry, bulk materials (gravel, crushed stone, mulch, and ready-mix concrete) are sold by the cubic yard (27 cubic feet).',
          'Because job measurements are typically taken in feet (length and width) and inches (depth), you must convert inches to fractional feet before multiplying.',
          'Formula: Cubic Yards = (Length in feet × Width in feet × (Depth in inches / 12)) / 27.'
        ],
        callout: {
          title: 'Calculate Concrete & Bag Requirements',
          text: 'Compute required cubic yards and 60lb/80lb bags for slabs, footings, or post holes.',
          calculatorSlug: 'concrete-calculator',
          calculatorName: 'Concrete Calculator'
        }
      }
    ],
    faqs: [
      {
        question: 'How many bags of concrete make one cubic yard?',
        answer: 'One cubic yard of concrete requires forty-five (45) 80-pound bags or sixty (60) 60-pound bags.'
      },
      {
        question: 'How deep should landscape mulch be installed?',
        answer: 'For new garden beds, a 3-inch depth is recommended for weed suppression and moisture retention. For annual top-ups, 1 to 2 inches is sufficient.'
      }
    ]
  }
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

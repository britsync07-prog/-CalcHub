import { CategoryDefinition } from '../types/calculator';

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'everyday-finance',
    name: 'Everyday & Money',
    slug: 'everyday-finance',
    description: 'Percentages, tips, discounts, sales taxes, markup, profit margins, and everyday personal money calculations.',
    iconName: 'Percent',
    heroText: 'Clear, accurate tools for quick percent calculations, shopping discounts, restaurant tips, split bills, and practical money math.',
    targetKeywords: [
      'percentage calculator',
      'discount calculator',
      'tip calculator',
      'sales tax calculator',
      'split bill calculator',
      'profit margin calculator'
    ]
  },
  {
    id: 'date-time',
    name: 'Date & Time',
    slug: 'date-time',
    description: 'Days between dates, chronological age, business working days, countdowns, time duration, and week numbers.',
    iconName: 'Calendar',
    heroText: 'Calculate exact intervals between dates, count work days, check calendar week numbers, and track milestones with zero confusion.',
    targetKeywords: [
      'days between dates',
      'date difference calculator',
      'age calculator',
      'business days calculator',
      'hours calculator',
      'countdown calculator'
    ]
  },
  {
    id: 'math-stats',
    name: 'Math & Statistics',
    slug: 'math-stats',
    description: 'Fractions, ratios, exponents, square roots, LCM/GCD, scientific keypad, mean, median, mode, and standard deviation.',
    iconName: 'Calculator',
    heroText: 'Step-by-step mathematical problem solvers, fraction arithmetic, ratio simplifiers, and descriptive statistical analysis.',
    targetKeywords: [
      'fraction calculator',
      'ratio calculator',
      'mean median mode calculator',
      'square root calculator',
      'scientific calculator online'
    ]
  },
  {
    id: 'converters',
    name: 'Unit Converters',
    slug: 'converters',
    description: 'Instant conversion between Imperial, US Customary, and Metric units for length, weight, temperature, area, volume, and speed.',
    iconName: 'ArrowRightLeft',
    heroText: 'Accurate instant conversions between feet, meters, pounds, kilograms, Fahrenheit, Celsius, gallons, liters, and more.',
    targetKeywords: [
      'unit converter',
      'length converter',
      'weight converter',
      'temperature converter',
      'volume converter',
      'speed converter'
    ]
  },
  {
    id: 'home-improvement',
    name: 'Home & Construction',
    slug: 'home-improvement',
    description: 'Square footage, paint gallons, flooring boxes, tile counts, concrete slabs, mulch, and gravel estimators for DIY projects.',
    iconName: 'Hammer',
    heroText: 'Estimate material requirements and surface areas accurately before buying supplies for your flooring, painting, or landscaping project.',
    targetKeywords: [
      'square footage calculator',
      'paint calculator',
      'flooring calculator',
      'tile calculator',
      'concrete calculator',
      'mulch calculator'
    ]
  },
  {
    id: 'health-fitness',
    name: 'Everyday Health & Pace',
    slug: 'health-fitness',
    description: 'Running pace, walking steps to distance & calories, daily water intake, and reference body mass index (BMI).',
    iconName: 'Activity',
    heroText: 'Practical, low-risk fitness math and everyday pacing utilities for runners, walkers, and daily wellness planning.',
    targetKeywords: [
      'running pace calculator',
      'steps to calories calculator',
      'water intake calculator',
      'pace calculator'
    ]
  }
];

export function getCategoryById(id: string): CategoryDefinition | undefined {
  return CATEGORIES.find(c => c.id === id || c.slug === id);
}

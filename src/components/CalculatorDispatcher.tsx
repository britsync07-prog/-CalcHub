import React from 'react';
import { CalculatorDefinition, RegionalLocale } from '../types/calculator';
import {
  PercentageCalculatorView,
  DiscountCalculatorView,
  TipCalculatorView,
  SalesTaxCalculatorView,
  ProfitMarginCalculatorView,
  HourlySalaryCalculatorView,
  InterestCalculatorView
} from './calculators/EverydayViews';
import {
  DaysBetweenDatesView,
  AgeCalculatorView,
  BusinessDaysCalculatorView,
  DaysFromTodayView,
  TimeDurationCalculatorView,
  CountdownCalculatorView
} from './calculators/DateTimeViews';
import {
  ScientificCalculatorView,
  FractionCalculatorView,
  RatioCalculatorView,
  StatisticsCalculatorView
} from './calculators/MathViews';
import {
  LengthConverterView,
  WeightConverterView,
  TemperatureConverterView,
  SpeedConverterView
} from './calculators/ConverterViews';
import {
  SquareFootageCalculatorView,
  PaintCalculatorView,
  ConcreteCalculatorView
} from './calculators/HomeImprovementViews';
import {
  RunningPaceCalculatorView,
  BmiCalculatorView
} from './calculators/HealthFitnessViews';

interface CalculatorDispatcherProps {
  calculator: CalculatorDefinition;
  locale: RegionalLocale;
  initialInputs?: Record<string, string | number>;
}

export const CalculatorDispatcher: React.FC<CalculatorDispatcherProps> = ({
  calculator,
  locale,
  initialInputs
}) => {
  const slug = calculator.slug;

  // Everyday & Money
  if (['percentage-calculator', 'percent-change-calculator', 'percentage-difference-calculator'].includes(slug)) {
    return <PercentageCalculatorView id={calculator.id} name={calculator.name} locale={locale} initialInputs={initialInputs} />;
  }
  if (slug === 'discount-calculator') {
    return <DiscountCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['tip-calculator', 'split-bill-calculator'].includes(slug)) {
    return <TipCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'sales-tax-calculator') {
    return <SalesTaxCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['profit-margin-calculator', 'markup-calculator', 'commission-calculator'].includes(slug)) {
    return <ProfitMarginCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['hourly-to-salary-calculator', 'salary-to-hourly-calculator'].includes(slug)) {
    return <HourlySalaryCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['simple-interest-calculator', 'compound-interest-calculator'].includes(slug)) {
    return <InterestCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }

  // Date & Time
  if (['days-between-dates', 'date-difference-calculator', 'week-number-calculator'].includes(slug)) {
    return <DaysBetweenDatesView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'age-calculator') {
    return <AgeCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'business-days-calculator') {
    return <BusinessDaysCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'days-from-today') {
    return <DaysFromTodayView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['time-duration-calculator', 'hours-and-minutes-calculator'].includes(slug)) {
    return <TimeDurationCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'countdown-calculator') {
    return <CountdownCalculatorView id={calculator.id} name={calculator.name} locale={locale} initialInputs={initialInputs} />;
  }

  // Math & Statistics
  if (['scientific-calculator', 'exponent-calculator', 'square-root-calculator'].includes(slug)) {
    return <ScientificCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['fraction-calculator', 'decimal-to-fraction-calculator'].includes(slug)) {
    return <FractionCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['ratio-calculator', 'proportion-calculator'].includes(slug)) {
    return <RatioCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['mean-median-mode-calculator', 'standard-deviation-calculator', 'lcm-gcd-calculator', 'prime-number-calculator', 'probability-calculator'].includes(slug)) {
    return <StatisticsCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }

  // Unit Converters
  if (['length-converter', 'distance-converter'].includes(slug)) {
    return <LengthConverterView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['weight-mass-converter', 'mass-converter'].includes(slug)) {
    return <WeightConverterView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'temperature-converter') {
    return <TemperatureConverterView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['speed-converter', 'fuel-economy-converter'].includes(slug)) {
    return <SpeedConverterView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['area-converter', 'volume-converter', 'data-storage-converter', 'pressure-converter'].includes(slug)) {
    return <LengthConverterView id={calculator.id} name={calculator.name} locale={locale} />;
  }

  // Home & Construction
  if (['square-footage-calculator', 'flooring-calculator', 'tile-calculator'].includes(slug)) {
    return <SquareFootageCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'paint-calculator') {
    return <PaintCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (['concrete-calculator', 'mulch-gravel-calculator'].includes(slug)) {
    return <ConcreteCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }

  // Health & Fitness
  if (['running-pace-calculator', 'walking-steps-to-distance-calories', 'daily-water-intake-calculator'].includes(slug)) {
    return <RunningPaceCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }
  if (slug === 'body-mass-index-calculator') {
    return <BmiCalculatorView id={calculator.id} name={calculator.name} locale={locale} />;
  }

  // Default Fallback
  return <PercentageCalculatorView id={calculator.id} name={calculator.name} locale={locale} initialInputs={initialInputs} />;
};

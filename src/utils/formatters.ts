import { RegionalLocale } from '../types/calculator';

export function formatNumber(
  value: number,
  options?: {
    decimals?: number;
    locale?: RegionalLocale;
    trimTrailingZeros?: boolean;
  }
): string {
  if (isNaN(value) || !isFinite(value)) return '0';

  const { decimals = 2, locale = 'US', trimTrailingZeros = false } = options || {};

  const localeMap: Record<RegionalLocale, string> = {
    US: 'en-US',
    UK: 'en-GB',
    CA: 'en-CA',
    AU: 'en-AU'
  };

  const formatted = new Intl.NumberFormat(localeMap[locale] || 'en-US', {
    minimumFractionDigits: trimTrailingZeros ? 0 : decimals,
    maximumFractionDigits: decimals
  }).format(value);

  return formatted;
}

export function formatCurrency(
  value: number,
  locale: RegionalLocale = 'US'
): string {
  if (isNaN(value) || !isFinite(value)) return '$0.00';

  const currencyMap: Record<RegionalLocale, { code: string; symbol: string }> = {
    US: { code: 'USD', symbol: '$' },
    UK: { code: 'GBP', symbol: '£' },
    CA: { code: 'CAD', symbol: 'CA$' },
    AU: { code: 'AUD', symbol: 'A$' }
  };

  const curr = currencyMap[locale] || currencyMap.US;

  try {
    return new Intl.NumberFormat(locale === 'UK' ? 'en-GB' : 'en-US', {
      style: 'currency',
      currency: curr.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    return `${curr.symbol}${value.toFixed(2)}`;
  }
}

export function formatDate(
  date: Date,
  locale: RegionalLocale = 'US'
): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';

  if (locale === 'US') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } else {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
}

export function safeParseFloat(val: string | number, fallback = 0): number {
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (!val || typeof val !== 'string') return fallback;
  const cleaned = val.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
}

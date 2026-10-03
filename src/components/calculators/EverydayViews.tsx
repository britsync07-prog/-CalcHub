import React, { useState, useEffect } from 'react';
import { RegionalLocale } from '../../types/calculator';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/formatters';
import { saveCalculationHistory } from '../../utils/history';
import { CalculatorField } from '../calculator-ui/CalculatorField';
import { CalculatorKeypad } from '../calculator-ui/CalculatorKeypad';
import { CalculatorResultCard } from '../calculator-ui/CalculatorResultCard';
import { useCalculatorInput } from '../../hooks/useCalculatorInput';

interface BaseCalculatorProps {
  id: string;
  name: string;
  locale: RegionalLocale;
  initialInputs?: Record<string, string | number>;
}

// 1. Percentage Calculator (Inputs -> Output -> Keypad)
export const PercentageCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale, initialInputs }) => {
  const [mode, setMode] = useState<'what-is' | 'is-what-percent' | 'change'>('what-is');

  // Mode 1: What is X% of Y? (Defaults to 0)
  const calc1 = useCalculatorInput(
    {
      rate: initialInputs?.rate ? String(initialInputs.rate) : '',
      base: initialInputs?.base ? String(initialInputs.base) : ''
    },
    ['rate', 'base']
  );

  // Mode 2: X is what % of Y?
  const calc2 = useCalculatorInput(
    {
      part: '',
      total: ''
    },
    ['part', 'total']
  );

  // Mode 3: Percent Change
  const calc3 = useCalculatorInput(
    {
      from: '',
      to: ''
    },
    ['from', 'to']
  );

  // Calculations
  const r1 = safeParseFloat(calc1.values.rate);
  const b1 = safeParseFloat(calc1.values.base);
  const result1 = (r1 / 100) * b1;

  const p2 = safeParseFloat(calc2.values.part);
  const t2 = safeParseFloat(calc2.values.total);
  const result2 = t2 !== 0 ? (p2 / t2) * 100 : 0;

  const vF = safeParseFloat(calc3.values.from);
  const vT = safeParseFloat(calc3.values.to);
  const diff3 = vT - vF;
  const result3 = vF !== 0 ? (diff3 / Math.abs(vF)) * 100 : 0;

  useEffect(() => {
    if (mode === 'what-is' && (calc1.values.rate || calc1.values.base)) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `${calc1.values.rate || '0'}% of ${calc1.values.base || '0'}`,
        resultSummary: formatNumber(result1, { decimals: 4, trimTrailingZeros: true })
      });
    }
  }, [calc1.values.rate, calc1.values.base, mode]);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* Mode Switcher Tabs */}
      <div className="flex p-0.5 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setMode('what-is')}
          className={`flex-1 py-1 px-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
            mode === 'what-is' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => setMode('is-what-percent')}
          className={`flex-1 py-1 px-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
            mode === 'is-what-percent' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => setMode('change')}
          className={`flex-1 py-1 px-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
            mode === 'change' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          % Change
        </button>
      </div>

      {/* Mode 1: What is X% of Y? */}
      {mode === 'what-is' && (
        <div className="space-y-2.5">
          {/* 1. INPUTS ON TOP */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <CalculatorField
              label="Percentage"
              value={calc1.values.rate}
              isActive={calc1.activeField === 'rate'}
              onSelect={() => calc1.setActiveField('rate')}
              onClear={calc1.handleClear}
              suffix="%"
              placeholder="0"
            />
            <CalculatorField
              label="Total"
              value={calc1.values.base}
              isActive={calc1.activeField === 'base'}
              onSelect={() => calc1.setActiveField('base')}
              onClear={calc1.handleClear}
              placeholder="0"
            />
          </div>

          {/* 2. OUTPUT (RESULT) UNDER INPUTS */}
          <CalculatorResultCard
            label="ANSWER"
            result={formatNumber(result1, { decimals: 4, trimTrailingZeros: true })}
            subtext={`${calc1.values.rate || '0'}% of ${calc1.values.base || '0'} = ${formatNumber(result1, { decimals: 4, trimTrailingZeros: true })}`}
            onReset={calc1.handleClearAll}
            variant="blue"
          />

          {/* 3. KEYPAD UNDER RESULT */}
          <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
            <CalculatorKeypad
              onDigit={calc1.handleDigit}
              onDecimal={calc1.handleDecimal}
              onBackspace={calc1.handleBackspace}
              onClear={calc1.handleClearAll}
              onClearActive={calc1.handleClear}
              onNextField={calc1.handleNextField}
              showNextButton={true}
            />
          </div>
        </div>
      )}

      {/* Mode 2: X is what % of Y? */}
      {mode === 'is-what-percent' && (
        <div className="space-y-2">
          {/* 1. INPUTS ON TOP */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <CalculatorField
              label="Part"
              value={calc2.values.part}
              isActive={calc2.activeField === 'part'}
              onSelect={() => calc2.setActiveField('part')}
              onClear={calc2.handleClear}
              placeholder="0"
            />
            <CalculatorField
              label="Total"
              value={calc2.values.total}
              isActive={calc2.activeField === 'total'}
              onSelect={() => calc2.setActiveField('total')}
              onClear={calc2.handleClear}
              placeholder="0"
            />
          </div>

          {/* 2. OUTPUT UNDER INPUTS */}
          <CalculatorResultCard
            label="PERCENTAGE"
            result={`${formatNumber(result2, { decimals: 2 })}%`}
            subtext={`${calc2.values.part || '0'} is ${formatNumber(result2, { decimals: 2 })}% of ${calc2.values.total || '0'}`}
            onReset={calc2.handleClearAll}
            variant="blue"
          />

          {/* 3. KEYPAD UNDER RESULT */}
          <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
            <CalculatorKeypad
              onDigit={calc2.handleDigit}
              onDecimal={calc2.handleDecimal}
              onBackspace={calc2.handleBackspace}
              onClear={calc2.handleClearAll}
              onClearActive={calc2.handleClear}
              onNextField={calc2.handleNextField}
              showNextButton={true}
            />
          </div>
        </div>
      )}

      {/* Mode 3: Percent Change */}
      {mode === 'change' && (
        <div className="space-y-2">
          {/* 1. INPUTS ON TOP */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <CalculatorField
              label="Original"
              value={calc3.values.from}
              isActive={calc3.activeField === 'from'}
              onSelect={() => calc3.setActiveField('from')}
              onClear={calc3.handleClear}
              placeholder="0"
            />
            <CalculatorField
              label="Final"
              value={calc3.values.to}
              isActive={calc3.activeField === 'to'}
              onSelect={() => calc3.setActiveField('to')}
              onClear={calc3.handleClear}
              placeholder="0"
            />
          </div>

          {/* 2. OUTPUT UNDER INPUTS */}
          <CalculatorResultCard
            label="PERCENT CHANGE"
            result={`${result3 >= 0 ? '+' : ''}${formatNumber(result3, { decimals: 2 })}%`}
            subtext={`${result3 >= 0 ? 'Increase' : 'Decrease'} of ${formatNumber(Math.abs(diff3), { decimals: 2 })}`}
            variant={result3 >= 0 ? 'emerald' : 'purple'}
            onReset={calc3.handleClearAll}
          />

          {/* 3. KEYPAD UNDER RESULT */}
          <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
            <CalculatorKeypad
              onDigit={calc3.handleDigit}
              onDecimal={calc3.handleDecimal}
              onBackspace={calc3.handleBackspace}
              onClear={calc3.handleClearAll}
              onClearActive={calc3.handleClear}
              onNextField={calc3.handleNextField}
              showNextButton={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// 2. Discount Calculator (Inputs -> Output -> Keypad)
export const DiscountCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      price: '',
      discount: '',
      coupon: ''
    },
    ['price', 'discount', 'coupon']
  );

  const p = safeParseFloat(calc.values.price);
  const d1 = safeParseFloat(calc.values.discount);
  const d2 = safeParseFloat(calc.values.coupon);

  const firstSavings = p * (d1 / 100);
  const afterFirst = p - firstSavings;
  const secondSavings = afterFirst * (d2 / 100);
  const finalPrice = Math.max(0, afterFirst - secondSavings);
  const totalSaved = p - finalPrice;

  const currencySymbol = locale === 'UK' ? '£' : '$';

  useEffect(() => {
    if (calc.values.price || calc.values.discount) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `${formatCurrency(p, locale)} with ${calc.values.discount || '0'}% off`,
        resultSummary: `Final: ${formatCurrency(finalPrice, locale)} (Saved: ${formatCurrency(totalSaved, locale)})`
      });
    }
  }, [calc.values.price, calc.values.discount, calc.values.coupon, locale]);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Price"
          value={calc.values.price}
          isActive={calc.activeField === 'price'}
          onSelect={() => calc.setActiveField('price')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Discount"
          value={calc.values.discount}
          isActive={calc.activeField === 'discount'}
          onSelect={() => calc.setActiveField('discount')}
          onClear={calc.handleClear}
          suffix="%"
          placeholder="0"
        />
        <CalculatorField
          label="Coupon"
          value={calc.values.coupon}
          isActive={calc.activeField === 'coupon'}
          onSelect={() => calc.setActiveField('coupon')}
          onClear={calc.handleClear}
          suffix="%"
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="FINAL SALE PRICE"
        result={formatCurrency(finalPrice, locale)}
        subtext={`You save ${formatCurrency(totalSaved, locale)} (${p > 0 ? formatNumber((totalSaved / p) * 100, { decimals: 0 }) : 0}% off)`}
        variant="emerald"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

// 3. Tip & Split Bill Calculator (Inputs -> Output -> Keypad)
export const TipCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      bill: '',
      tipRate: '',
      people: ''
    },
    ['bill', 'tipRate', 'people']
  );

  const [roundUp, setRoundUp] = useState(false);
  const currencySymbol = locale === 'UK' ? '£' : '$';

  const b = safeParseFloat(calc.values.bill);
  const tRate = safeParseFloat(calc.values.tipRate);
  const numGuests = Math.max(1, parseInt(calc.values.people, 10) || 1);

  let tipAmount = b * (tRate / 100);
  let totalWithTip = b + tipAmount;

  if (roundUp) {
    const rounded = Math.ceil(totalWithTip);
    tipAmount = rounded - b;
    totalWithTip = rounded;
  }

  const perPersonTotal = totalWithTip / numGuests;
  const perPersonTip = tipAmount / numGuests;

  useEffect(() => {
    if (calc.values.bill) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `${formatCurrency(b, locale)}, ${calc.values.tipRate || '0'}% tip, ${numGuests} guests`,
        resultSummary: `${formatCurrency(perPersonTotal, locale)} / person`
      });
    }
  }, [calc.values.bill, calc.values.tipRate, calc.values.people, roundUp, locale]);

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Bill"
          value={calc.values.bill}
          isActive={calc.activeField === 'bill'}
          onSelect={() => calc.setActiveField('bill')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Tip"
          value={calc.values.tipRate}
          isActive={calc.activeField === 'tipRate'}
          onSelect={() => calc.setActiveField('tipRate')}
          onClear={calc.handleClear}
          suffix="%"
          placeholder="0"
        />
        <CalculatorField
          label="People"
          value={calc.values.people}
          isActive={calc.activeField === 'people'}
          onSelect={() => calc.setActiveField('people')}
          onClear={calc.handleClear}
          placeholder="1"
        />
      </div>

      {/* Round up checkbox (compact) */}
      <div className="flex justify-end px-1">
        <label className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium cursor-pointer select-none">
          <input
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300"
          />
          <span>Round up total</span>
        </label>
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label={`SHARE PER PERSON (${numGuests} ${numGuests === 1 ? 'GUEST' : 'GUESTS'})`}
        result={formatCurrency(perPersonTotal, locale)}
        subtext={`Total Bill: ${formatCurrency(totalWithTip, locale)} (Tip: ${formatCurrency(tipAmount, locale)})`}
        variant="emerald"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

// 4. Sales Tax Calculator (Inputs -> Output -> Keypad)
export const SalesTaxCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const [reverseMode, setReverseMode] = useState(false);

  const calc = useCalculatorInput(
    {
      price: '',
      rate: ''
    },
    ['price', 'rate']
  );

  const currencySymbol = locale === 'UK' ? '£' : '$';
  const inputVal = safeParseFloat(calc.values.price);
  const rateVal = safeParseFloat(calc.values.rate);

  let preTaxPrice = 0;
  let taxAmount = 0;
  let grossTotal = 0;

  if (reverseMode) {
    grossTotal = inputVal;
    preTaxPrice = rateVal > 0 ? grossTotal / (1 + rateVal / 100) : grossTotal;
    taxAmount = grossTotal - preTaxPrice;
  } else {
    preTaxPrice = inputVal;
    taxAmount = preTaxPrice * (rateVal / 100);
    grossTotal = preTaxPrice + taxAmount;
  }

  useEffect(() => {
    if (calc.values.price) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `${formatCurrency(inputVal, locale)} with ${calc.values.rate || '0'}% tax`,
        resultSummary: `Gross: ${formatCurrency(grossTotal, locale)}`
      });
    }
  }, [calc.values.price, calc.values.rate, reverseMode, locale]);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* Mode Selector */}
      <div className="flex p-0.5 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setReverseMode(false)}
          className={`flex-1 py-1 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            !reverseMode ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Add Tax
        </button>
        <button
          type="button"
          onClick={() => setReverseMode(true)}
          className={`flex-1 py-1 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            reverseMode ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Reverse Tax
        </button>
      </div>

      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-2 gap-2">
        <CalculatorField
          label={reverseMode ? 'Receipt Total' : 'Net Price'}
          value={calc.values.price}
          isActive={calc.activeField === 'price'}
          onSelect={() => calc.setActiveField('price')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Tax Rate"
          value={calc.values.rate}
          isActive={calc.activeField === 'rate'}
          onSelect={() => calc.setActiveField('rate')}
          onClear={calc.handleClear}
          suffix="%"
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label={reverseMode ? 'PRE-TAX PRICE' : 'GROSS TOTAL (INC. TAX)'}
        result={formatCurrency(reverseMode ? preTaxPrice : grossTotal, locale)}
        subtext={`Tax Amount: ${formatCurrency(taxAmount, locale)} (${calc.values.rate || '0'}%)`}
        variant="blue"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

// 5. Profit Margin & Markup Calculator (Inputs -> Output -> Keypad)
export const ProfitMarginCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      cost: '',
      revenue: ''
    },
    ['cost', 'revenue']
  );

  const currencySymbol = locale === 'UK' ? '£' : '$';
  const c = safeParseFloat(calc.values.cost);
  const r = safeParseFloat(calc.values.revenue);

  const profit = r - c;
  const margin = r > 0 ? (profit / r) * 100 : 0;
  const markup = c > 0 ? (profit / c) * 100 : 0;

  useEffect(() => {
    if (calc.values.cost || calc.values.revenue) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `Cost: ${formatCurrency(c, locale)}, Sell: ${formatCurrency(r, locale)}`,
        resultSummary: `Margin: ${formatNumber(margin, { decimals: 1 })}%, Markup: ${formatNumber(markup, { decimals: 1 })}%`
      });
    }
  }, [calc.values.cost, calc.values.revenue, locale]);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-2 gap-2">
        <CalculatorField
          label="Cost of Goods"
          value={calc.values.cost}
          isActive={calc.activeField === 'cost'}
          onSelect={() => calc.setActiveField('cost')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Selling Price"
          value={calc.values.revenue}
          isActive={calc.activeField === 'revenue'}
          onSelect={() => calc.setActiveField('revenue')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="GROSS PROFIT MARGIN"
        result={`${formatNumber(margin, { decimals: 1 })}%`}
        subtext={`Profit: ${formatCurrency(profit, locale)} (Markup: ${formatNumber(markup, { decimals: 1 })}%)`}
        variant="emerald"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

// 6. Hourly to Salary Calculator (Inputs -> Output -> Keypad)
export const HourlySalaryCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      hourly: '',
      hoursPerWeek: '',
      weeksPerYear: ''
    },
    ['hourly', 'hoursPerWeek', 'weeksPerYear']
  );

  const currencySymbol = locale === 'UK' ? '£' : '$';
  const wage = safeParseFloat(calc.values.hourly);
  const hpw = safeParseFloat(calc.values.hoursPerWeek) || 40;
  const wpy = safeParseFloat(calc.values.weeksPerYear) || 52;

  const weekly = wage * hpw;
  const biweekly = weekly * 2;
  const annual = weekly * wpy;

  useEffect(() => {
    if (calc.values.hourly) {
      saveCalculationHistory({
        calculatorId: id,
        calculatorName: name,
        inputSummary: `${formatCurrency(wage, locale)}/hr @ ${hpw}h/wk`,
        resultSummary: `${formatCurrency(annual, locale)} / year`
      });
    }
  }, [calc.values.hourly, calc.values.hoursPerWeek, calc.values.weeksPerYear, locale]);

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Hourly Wage"
          value={calc.values.hourly}
          isActive={calc.activeField === 'hourly'}
          onSelect={() => calc.setActiveField('hourly')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Hours / Wk"
          value={calc.values.hoursPerWeek}
          isActive={calc.activeField === 'hoursPerWeek'}
          onSelect={() => calc.setActiveField('hoursPerWeek')}
          onClear={calc.handleClear}
          placeholder="0"
        />
        <CalculatorField
          label="Weeks / Yr"
          value={calc.values.weeksPerYear}
          isActive={calc.activeField === 'weeksPerYear'}
          onSelect={() => calc.setActiveField('weeksPerYear')}
          onClear={calc.handleClear}
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="EQUIVALENT ANNUAL SALARY"
        result={formatCurrency(annual, locale)}
        subtext={`Weekly: ${formatCurrency(weekly, locale)} | Bi-Weekly: ${formatCurrency(biweekly, locale)}`}
        variant="blue"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

// 7. Compound & Simple Interest Calculator (Inputs -> Output -> Keypad)
export const InterestCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      principal: '',
      rate: '',
      years: ''
    },
    ['principal', 'rate', 'years']
  );

  const [frequency, setFrequency] = useState<'12' | '1' | '4' | '365'>('12');
  const currencySymbol = locale === 'UK' ? '£' : '$';

  const p = safeParseFloat(calc.values.principal);
  const r = safeParseFloat(calc.values.rate) / 100;
  const t = safeParseFloat(calc.values.years);
  const n = parseInt(frequency, 10);

  const compoundTotal = p > 0 && r > 0 && t > 0 ? p * Math.pow(1 + r / n, n * t) : p;
  const compoundInterest = Math.max(0, compoundTotal - p);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Principal"
          value={calc.values.principal}
          isActive={calc.activeField === 'principal'}
          onSelect={() => calc.setActiveField('principal')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
        <CalculatorField
          label="Rate"
          value={calc.values.rate}
          isActive={calc.activeField === 'rate'}
          onSelect={() => calc.setActiveField('rate')}
          onClear={calc.handleClear}
          suffix="%"
          placeholder="0"
        />
        <CalculatorField
          label="Years"
          value={calc.values.years}
          isActive={calc.activeField === 'years'}
          onSelect={() => calc.setActiveField('years')}
          onClear={calc.handleClear}
          suffix="yr"
          placeholder="0"
        />
      </div>

      {/* Compounding frequency selector */}
      <div className="flex items-center justify-between gap-1 px-1 text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase">Compound:</span>
        <div className="flex gap-1">
          {[
            { id: '12', label: 'Monthly' },
            { id: '4', label: 'Quarterly' },
            { id: '1', label: 'Annual' }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFrequency(f.id as any)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                frequency === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="FUTURE MATURITY VALUE"
        result={formatCurrency(compoundTotal, locale)}
        subtext={`Interest earned: ${formatCurrency(compoundInterest, locale)}`}
        variant="blue"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onNextField={calc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

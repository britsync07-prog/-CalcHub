import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { RegionalLocale } from '../../types/calculator';
import { formatNumber, safeParseFloat } from '../../utils/formatters';
import { CalculatorField } from '../calculator-ui/CalculatorField';
import { CalculatorKeypad } from '../calculator-ui/CalculatorKeypad';
import { CalculatorResultCard } from '../calculator-ui/CalculatorResultCard';
import { useCalculatorInput } from '../../hooks/useCalculatorInput';

interface BaseCalculatorProps {
  id: string;
  name: string;
  locale: RegionalLocale;
}

// 1. Length Converter (Inputs -> Output -> Keypad)
export const LengthConverterView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput({ val: '' }, ['val']);
  const [unit, setUnit] = useState<'ft' | 'm' | 'in' | 'cm' | 'yd' | 'mi' | 'km'>('ft');

  const toMeters: Record<string, number> = {
    m: 1,
    cm: 0.01,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
    km: 1000
  };

  const inputNumber = safeParseFloat(calc.values.val);
  const meters = inputNumber * (toMeters[unit] || 1);

  const cm = meters / toMeters.cm;
  const inches = meters / toMeters.in;
  const ft = meters / toMeters.ft;
  const m = meters;
  const yards = meters / toMeters.yd;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-1.5 bg-slate-100 rounded-xl text-xs">
        <span className="font-bold text-slate-600 uppercase text-[10px] pl-1">From:</span>
        <div className="flex flex-wrap gap-1">
          {(['ft', 'm', 'in', 'cm', 'yd', 'mi', 'km'] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === u
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <CalculatorField
        label={`Length in ${unit.toUpperCase()}`}
        value={calc.values.val}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix={unit}
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {unit !== 'ft' && (
          <CalculatorResultCard
            label="FEET"
            result={`${formatNumber(ft, { decimals: 4, trimTrailingZeros: true })} ft`}
            variant="blue"
          />
        )}
        {unit !== 'm' && (
          <CalculatorResultCard
            label="METERS"
            result={`${formatNumber(m, { decimals: 4, trimTrailingZeros: true })} m`}
            variant="emerald"
          />
        )}
        {unit !== 'in' && (
          <CalculatorResultCard
            label="INCHES"
            result={`${formatNumber(inches, { decimals: 4, trimTrailingZeros: true })} in`}
            variant="blue"
          />
        )}
        {unit !== 'cm' && (
          <CalculatorResultCard
            label="CENTIMETERS"
            result={`${formatNumber(cm, { decimals: 2, trimTrailingZeros: true })} cm`}
            variant="purple"
          />
        )}
        {unit === 'm' && (
          <CalculatorResultCard
            label="YARDS"
            result={`${formatNumber(yards, { decimals: 4, trimTrailingZeros: true })} yd`}
            variant="purple"
          />
        )}
      </div>

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>
    </div>
  );
};

// 2. Weight & Mass Converter (Inputs -> Output -> Keypad)
export const WeightConverterView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput({ val: '' }, ['val']);
  const [unit, setUnit] = useState<'lb' | 'kg' | 'oz' | 'g' | 'st' | 'ton'>('lb');

  const toKg: Record<string, number> = {
    kg: 1,
    g: 0.001,
    lb: 0.45359237,
    oz: 0.028349523,
    st: 6.35029318,
    ton: 907.18474
  };

  const inputNumber = safeParseFloat(calc.values.val);
  const kg = inputNumber * (toKg[unit] || 1);

  const lb = kg / toKg.lb;
  const oz = kg / toKg.oz;
  const g = kg / toKg.g;
  const actualKg = kg;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-1.5 bg-slate-100 rounded-xl text-xs">
        <span className="font-bold text-slate-600 uppercase text-[10px] pl-1">From:</span>
        <div className="flex flex-wrap gap-1">
          {(['lb', 'kg', 'oz', 'g', 'st', 'ton'] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === u
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <CalculatorField
        label={`Weight in ${unit.toUpperCase()}`}
        value={calc.values.val}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix={unit}
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {unit !== 'lb' && (
          <CalculatorResultCard
            label="POUNDS (LBS)"
            result={`${formatNumber(lb, { decimals: 3, trimTrailingZeros: true })} lb`}
            variant="blue"
          />
        )}
        {unit !== 'kg' && (
          <CalculatorResultCard
            label="KILOGRAMS (KG)"
            result={`${formatNumber(actualKg, { decimals: 3, trimTrailingZeros: true })} kg`}
            variant="emerald"
          />
        )}
        {unit !== 'oz' && (
          <CalculatorResultCard
            label="OUNCES (OZ)"
            result={`${formatNumber(oz, { decimals: 2, trimTrailingZeros: true })} oz`}
            variant="purple"
          />
        )}
        {unit !== 'g' && (
          <CalculatorResultCard
            label="GRAMS (G)"
            result={`${formatNumber(g, { decimals: 1, trimTrailingZeros: true })} g`}
            variant="emerald"
          />
        )}
      </div>

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>
    </div>
  );
};

// 3. Temperature Converter (Inputs -> Output -> Keypad)
export const TemperatureConverterView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput({ val: '' }, ['val']);
  const [scale, setScale] = useState<'C' | 'F' | 'K'>('C');

  const inputVal = safeParseFloat(calc.values.val);

  let c = 0;
  let f = 0;
  let k = 0;

  if (scale === 'C') {
    c = inputVal;
    f = inputVal * 1.8 + 32;
    k = inputVal + 273.15;
  } else if (scale === 'F') {
    c = (inputVal - 32) / 1.8;
    f = inputVal;
    k = c + 273.15;
  } else if (scale === 'K') {
    c = inputVal - 273.15;
    f = c * 1.8 + 32;
    k = inputVal;
  }

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex items-center justify-between gap-1 p-1.5 bg-slate-100 rounded-xl text-xs">
        <span className="font-bold text-slate-600 uppercase text-[10px] pl-1">From Scale:</span>
        <div className="flex gap-1">
          {(['C', 'F', 'K'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              className={`px-3 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                scale === s
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              °{s}
            </button>
          ))}
        </div>
      </div>

      <CalculatorField
        label={`Temperature in °${scale}`}
        value={calc.values.val}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix={`°${scale}`}
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {scale !== 'F' && (
          <CalculatorResultCard
            label="FAHRENHEIT"
            result={`${formatNumber(f, { decimals: 2, trimTrailingZeros: true })}°F`}
            variant="blue"
          />
        )}
        {scale !== 'C' && (
          <CalculatorResultCard
            label="CELSIUS"
            result={`${formatNumber(c, { decimals: 2, trimTrailingZeros: true })}°C`}
            variant="emerald"
          />
        )}
        {scale !== 'K' && (
          <CalculatorResultCard
            label="KELVIN"
            result={`${formatNumber(k, { decimals: 2, trimTrailingZeros: true })} K`}
            variant="purple"
          />
        )}
      </div>

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
          onToggleSign={calc.handleToggleSign}
          allowNegative={true}
        />
      </div>
    </div>
  );
};

// 4. Speed Converter (Inputs -> Output -> Keypad)
export const SpeedConverterView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput({ val: '' }, ['val']);
  const [unit, setUnit] = useState<'mph' | 'kmh' | 'knot' | 'ms'>('mph');

  const toMps: Record<string, number> = {
    ms: 1,
    kmh: 1 / 3.6,
    mph: 0.44704,
    knot: 0.514444
  };

  const inputNumber = safeParseFloat(calc.values.val);
  const mps = inputNumber * (toMps[unit] || 1);

  const mph = mps / toMps.mph;
  const kmh = mps / toMps.kmh;
  const knot = mps / toMps.knot;
  const ms = mps;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex items-center justify-between gap-1 p-1.5 bg-slate-100 rounded-xl text-xs">
        <span className="font-bold text-slate-600 uppercase text-[10px] pl-1">From Unit:</span>
        <div className="flex gap-1">
          {[
            { id: 'mph', label: 'mph' },
            { id: 'kmh', label: 'km/h' },
            { id: 'knot', label: 'kn' },
            { id: 'ms', label: 'm/s' }
          ].map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUnit(u.id as any)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === u.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <CalculatorField
        label={`Speed in ${unit}`}
        value={calc.values.val}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix={unit}
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {unit !== 'mph' && (
          <CalculatorResultCard
            label="MILES / HR"
            result={`${formatNumber(mph, { decimals: 2, trimTrailingZeros: true })} mph`}
            variant="blue"
          />
        )}
        {unit !== 'kmh' && (
          <CalculatorResultCard
            label="KM / HR"
            result={`${formatNumber(kmh, { decimals: 2, trimTrailingZeros: true })} km/h`}
            variant="emerald"
          />
        )}
        {unit !== 'knot' && (
          <CalculatorResultCard
            label="KNOTS"
            result={`${formatNumber(knot, { decimals: 2, trimTrailingZeros: true })} kn`}
            variant="purple"
          />
        )}
        {unit !== 'ms' && (
          <CalculatorResultCard
            label="METERS / SEC"
            result={`${formatNumber(ms, { decimals: 2, trimTrailingZeros: true })} m/s`}
            variant="emerald"
          />
        )}
      </div>

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>
    </div>
  );
};

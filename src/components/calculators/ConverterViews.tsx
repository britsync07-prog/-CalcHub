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

// 5. Oven Temperature Converter (Fahrenheit, Celsius, Gas Mark, Fan Convection)
export const OvenTemperatureConverterView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput({ temp: '350' }, ['temp']);
  const [sourceUnit, setSourceUnit] = useState<'F' | 'C' | 'Gas' | 'FanC'>('F');

  const inputNumber = safeParseFloat(calc.values.temp) || 0;

  // Gas Mark mapping
  const gasToF: Record<string, number> = {
    '0.25': 225,
    '0.5': 250,
    '1': 275,
    '2': 300,
    '3': 325,
    '4': 350,
    '5': 375,
    '6': 400,
    '7': 425,
    '8': 450,
    '9': 475,
    '10': 500
  };

  let fahrenheit = 350;
  let celsius = 177;

  if (sourceUnit === 'F') {
    fahrenheit = inputNumber;
    celsius = (fahrenheit - 32) * (5 / 9);
  } else if (sourceUnit === 'C') {
    celsius = inputNumber;
    fahrenheit = (celsius * (9 / 5)) + 32;
  } else if (sourceUnit === 'FanC') {
    // Fan is 20C lower than conventional
    celsius = inputNumber + 20;
    fahrenheit = (celsius * (9 / 5)) + 32;
  } else if (sourceUnit === 'Gas') {
    const key = String(inputNumber);
    fahrenheit = gasToF[key] || (inputNumber > 0 ? 250 + inputNumber * 25 : 350);
    celsius = (fahrenheit - 32) * (5 / 9);
  }

  const fanCelsius = Math.max(0, celsius - 20);
  const fanFahrenheit = Math.max(0, fahrenheit - 25);

  // Determine closest Gas Mark
  let gasMark = 'N/A';
  if (fahrenheit < 235) gasMark = '1/4';
  else if (fahrenheit < 260) gasMark = '1/2';
  else if (fahrenheit < 285) gasMark = '1';
  else if (fahrenheit < 310) gasMark = '2';
  else if (fahrenheit < 335) gasMark = '3';
  else if (fahrenheit < 360) gasMark = '4';
  else if (fahrenheit < 385) gasMark = '5';
  else if (fahrenheit < 410) gasMark = '6';
  else if (fahrenheit < 435) gasMark = '7';
  else if (fahrenheit < 460) gasMark = '8';
  else if (fahrenheit < 485) gasMark = '9';
  else if (fahrenheit <= 525) gasMark = '10';

  // Heat description band
  let heatBand = 'Moderate (Cakes, Cookies, Casseroles)';
  if (fahrenheit < 275) heatBand = 'Very Slow / Cool (Meringues, Slow Stews)';
  else if (fahrenheit < 325) heatBand = 'Slow / Warm (Cheesecakes, Custards)';
  else if (fahrenheit < 375) heatBand = 'Moderate (Standard Baking, Cakes, Cookies)';
  else if (fahrenheit < 425) heatBand = 'Moderately Hot (Pastry, Roasts, Biscuits)';
  else if (fahrenheit < 475) heatBand = 'Hot / Very Hot (Puff Pastry, Artisan Bread)';
  else heatBand = 'Extremely Hot / Broil (Pizza, High-Temp Roasting)';

  const setPreset = (f: number) => {
    setSourceUnit('F');
    calc.setFieldValue('temp', String(f));
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Unit Selector */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-1.5 bg-slate-100 rounded-xl text-xs">
        <span className="font-bold text-slate-600 uppercase text-[10px] pl-1">Input Unit:</span>
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'F', label: '°F Conventional' },
            { id: 'C', label: '°C Conventional' },
            { id: 'FanC', label: '°C Fan-Forced' },
            { id: 'Gas', label: 'Gas Mark' }
          ].map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => {
                setSourceUnit(u.id as any);
                if (u.id === 'Gas' && !['1','2','3','4','5','6','7','8','9','10'].includes(calc.values.temp)) {
                  calc.setFieldValue('temp', '4');
                }
              }}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sourceUnit === u.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="text-slate-400 font-medium self-center text-[11px] mr-1">Baking Presets:</span>
        <button type="button" onClick={() => setPreset(300)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">300°F (Slow)</button>
        <button type="button" onClick={() => setPreset(350)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium text-blue-600">350°F (Standard)</button>
        <button type="button" onClick={() => setPreset(375)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">375°F (Roast)</button>
        <button type="button" onClick={() => setPreset(400)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">400°F (Pastry)</button>
        <button type="button" onClick={() => setPreset(450)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">450°F (Pizza)</button>
      </div>

      {/* Input Field */}
      <CalculatorField
        label={
          sourceUnit === 'Gas'
            ? 'Gas Mark (1 to 10 or 0.25 / 0.5)'
            : `Temperature (${sourceUnit === 'F' ? '°F' : sourceUnit === 'C' ? '°C' : '°C Fan'})`
        }
        value={calc.values.temp}
        isActive={calc.activeField === 'temp'}
        onSelect={() => calc.setActiveField('temp')}
        suffix={sourceUnit === 'Gas' ? 'Gas Mark' : '°'}
        placeholder="350"
      />

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-2">
        <CalculatorResultCard
          label="CONVENTIONAL FAHRENHEIT"
          result={`${Math.round(fahrenheit)}°F`}
          variant="blue"
        />
        <CalculatorResultCard
          label="CONVENTIONAL CELSIUS"
          result={`${Math.round(celsius)}°C`}
          variant="emerald"
        />
        <CalculatorResultCard
          label="FAN-FORCED (CONVECTION)"
          result={`${Math.round(fanCelsius)}°C / ${Math.round(fanFahrenheit)}°F`}
          variant="purple"
        />
        <CalculatorResultCard
          label="BRITISH GAS MARK"
          result={gasMark.startsWith('Gas') ? gasMark : `Gas Mark ${gasMark}`}
          variant="slate"
        />
      </div>

      {/* Heat Band Badge */}
      <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-0.5">Oven Temperature Level</span>
        <span className="text-sm font-bold text-slate-800">{heatBand}</span>
      </div>

      {/* Keypad */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>

      {/* Quick Conversion Cheat Sheet Table */}
      <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden text-xs bg-white">
        <div className="bg-slate-100 font-bold px-3 py-2 text-slate-700 border-b border-slate-200">
          Quick Baking Conversion Reference
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold bg-slate-50/50">
                <th className="py-1.5 px-3">Fahrenheit</th>
                <th className="py-1.5 px-3">Celsius</th>
                <th className="py-1.5 px-3">Fan Oven</th>
                <th className="py-1.5 px-3">Gas Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="py-1 px-3">300°F</td><td className="py-1 px-3">150°C</td><td className="py-1 px-3">130°C</td><td className="py-1 px-3 font-medium">Gas 2</td></tr>
              <tr className="bg-blue-50/40"><td className="py-1 px-3 font-bold text-blue-700">350°F</td><td className="py-1 px-3 font-bold text-blue-700">177°C</td><td className="py-1 px-3 font-bold text-blue-700">160°C</td><td className="py-1 px-3 font-bold text-blue-700">Gas 4</td></tr>
              <tr><td className="py-1 px-3">375°F</td><td className="py-1 px-3">190°C</td><td className="py-1 px-3">170°C</td><td className="py-1 px-3 font-medium">Gas 5</td></tr>
              <tr><td className="py-1 px-3">400°F</td><td className="py-1 px-3">200°C</td><td className="py-1 px-3">180°C</td><td className="py-1 px-3 font-medium">Gas 6</td></tr>
              <tr><td className="py-1 px-3">425°F</td><td className="py-1 px-3">220°C</td><td className="py-1 px-3">200°C</td><td className="py-1 px-3 font-medium">Gas 7</td></tr>
              <tr><td className="py-1 px-3">450°F</td><td className="py-1 px-3">230°C</td><td className="py-1 px-3">210°C</td><td className="py-1 px-3 font-medium">Gas 8</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { RegionalLocale } from '../../types/calculator';
import { formatCurrency, formatNumber, safeParseFloat } from '../../utils/formatters';
import { CalculatorField } from '../calculator-ui/CalculatorField';
import { CalculatorKeypad } from '../calculator-ui/CalculatorKeypad';
import { CalculatorResultCard } from '../calculator-ui/CalculatorResultCard';
import { useCalculatorInput } from '../../hooks/useCalculatorInput';

interface BaseCalculatorProps {
  id: string;
  name: string;
  locale: RegionalLocale;
}

// 1. Square Footage Calculator (Inputs -> Output -> Keypad)
export const SquareFootageCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput(
    {
      length: '',
      width: '',
      costPerSqFt: ''
    },
    ['length', 'width', 'costPerSqFt']
  );

  const l = safeParseFloat(calc.values.length);
  const w = safeParseFloat(calc.values.width);
  const cost = safeParseFloat(calc.values.costPerSqFt);

  const totalSqFt = l * w;
  const totalSqYards = totalSqFt / 9;
  const totalCost = totalSqFt * cost;

  const currencySymbol = locale === 'UK' ? '£' : '$';

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Length (ft)"
          value={calc.values.length}
          isActive={calc.activeField === 'length'}
          onSelect={() => calc.setActiveField('length')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Width (ft)"
          value={calc.values.width}
          isActive={calc.activeField === 'width'}
          onSelect={() => calc.setActiveField('width')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Cost / sq ft"
          value={calc.values.costPerSqFt}
          isActive={calc.activeField === 'costPerSqFt'}
          onSelect={() => calc.setActiveField('costPerSqFt')}
          onClear={calc.handleClear}
          prefix={currencySymbol}
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="TOTAL AREA"
        result={`${formatNumber(totalSqFt, { decimals: 1, trimTrailingZeros: true })} sq ft`}
        subtext={`${formatNumber(totalSqYards, { decimals: 1 })} sq yd ${cost > 0 ? `| Est: ${formatCurrency(totalCost, locale)}` : ''}`}
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

// 2. Paint Calculator (Inputs -> Output -> Keypad)
export const PaintCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput(
    {
      length: '',
      width: '',
      height: ''
    },
    ['length', 'width', 'height']
  );

  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);

  const l = safeParseFloat(calc.values.length);
  const w = safeParseFloat(calc.values.width);
  const h = safeParseFloat(calc.values.height);

  const grossWallArea = 2 * (l + w) * h;
  const openingsArea = doors * 20 + windows * 15;
  const netWallArea = Math.max(0, grossWallArea - openingsArea);
  const totalPaintedArea = netWallArea * coats;

  const exactGallons = totalPaintedArea / 350;
  const recommendedGallons = Math.ceil(exactGallons);

  return (
    <div className="space-y-2.5 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Length (ft)"
          value={calc.values.length}
          isActive={calc.activeField === 'length'}
          onSelect={() => calc.setActiveField('length')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Width (ft)"
          value={calc.values.width}
          isActive={calc.activeField === 'width'}
          onSelect={() => calc.setActiveField('width')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Height (ft)"
          value={calc.values.height}
          isActive={calc.activeField === 'height'}
          onSelect={() => calc.setActiveField('height')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
      </div>

      {/* Compact Quick Options */}
      <div className="flex items-center justify-between gap-1 px-1 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Doors:</span>
          <button
            type="button"
            onClick={() => setDoors(Math.max(0, doors - 1))}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            -
          </button>
          <span className="font-mono font-bold text-xs">{doors}</span>
          <button
            type="button"
            onClick={() => setDoors(doors + 1)}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Windows:</span>
          <button
            type="button"
            onClick={() => setWindows(Math.max(0, windows - 1))}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            -
          </button>
          <span className="font-mono font-bold text-xs">{windows}</span>
          <button
            type="button"
            onClick={() => setWindows(windows + 1)}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Coats:</span>
          <button
            type="button"
            onClick={() => setCoats(Math.max(1, coats - 1))}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            -
          </button>
          <span className="font-mono font-bold text-xs">{coats}</span>
          <button
            type="button"
            onClick={() => setCoats(coats + 1)}
            className="w-5 h-5 bg-slate-100 rounded font-bold flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="PAINT REQUIRED"
        result={`${recommendedGallons} Gallons`}
        subtext={`Wall Area: ${formatNumber(netWallArea, { decimals: 0 })} sq ft (${coats} coats)`}
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

// 3. Concrete Calculator (Inputs -> Output -> Keypad)
export const ConcreteCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput(
    {
      length: '',
      width: '',
      thickness: ''
    },
    ['length', 'width', 'thickness']
  );

  const l = safeParseFloat(calc.values.length);
  const w = safeParseFloat(calc.values.width);
  const thick = safeParseFloat(calc.values.thickness);

  const cubicFeet = l * w * (thick / 12);
  const cubicYards = cubicFeet / 27;
  const bags80 = Math.ceil(cubicFeet / 0.60);

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Length (ft)"
          value={calc.values.length}
          isActive={calc.activeField === 'length'}
          onSelect={() => calc.setActiveField('length')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Width (ft)"
          value={calc.values.width}
          isActive={calc.activeField === 'width'}
          onSelect={() => calc.setActiveField('width')}
          onClear={calc.handleClear}
          suffix="ft"
          placeholder="0"
        />
        <CalculatorField
          label="Thick (in)"
          value={calc.values.thickness}
          isActive={calc.activeField === 'thickness'}
          onSelect={() => calc.setActiveField('thickness')}
          onClear={calc.handleClear}
          suffix="in"
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="CONCRETE VOLUME"
        result={`${formatNumber(cubicYards, { decimals: 2 })} yd³`}
        subtext={`Total: ${formatNumber(cubicFeet, { decimals: 1 })} cu ft | Approx. ${bags80} bags (80 lb)`}
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

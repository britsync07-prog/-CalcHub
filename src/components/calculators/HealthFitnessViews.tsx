import React, { useState } from 'react';
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

// 1. Running Pace Calculator (Inputs -> Output -> Keypad)
export const RunningPaceCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput(
    {
      distance: '',
      hours: '',
      minutes: '',
      seconds: ''
    },
    ['distance', 'hours', 'minutes', 'seconds']
  );

  const [distUnit, setDistUnit] = useState<'miles' | 'km'>('miles');

  const distVal = safeParseFloat(calc.values.distance);
  const h = parseInt(calc.values.hours, 10) || 0;
  const m = parseInt(calc.values.minutes, 10) || 0;
  const s = parseInt(calc.values.seconds, 10) || 0;

  const totalSeconds = h * 3600 + m * 60 + s;
  const distMiles = distUnit === 'miles' ? distVal : distVal * 0.621371;
  const distKm = distUnit === 'km' ? distVal : distVal * 1.60934;

  const secPerMile = distMiles > 0 ? totalSeconds / distMiles : 0;
  const secPerKm = distKm > 0 ? totalSeconds / distKm : 0;

  const formatPace = (totalSec: number) => {
    if (totalSec <= 0 || !isFinite(totalSec)) return '0:00';
    const min = Math.floor(totalSec / 60);
    const sec = Math.round(totalSec % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const setPreset = (d: string, u: 'miles' | 'km') => {
    calc.setFieldValue('distance', d);
    setDistUnit(u);
  };

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex justify-end px-1">
        <button
          type="button"
          onClick={() => setDistUnit(distUnit === 'miles' ? 'km' : 'miles')}
          className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
        >
          Unit: {distUnit === 'miles' ? 'Miles' : 'Kilometers'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Dist"
          value={calc.values.distance}
          isActive={calc.activeField === 'distance'}
          onSelect={() => calc.setActiveField('distance')}
          onClear={calc.handleClear}
          suffix={distUnit === 'miles' ? 'mi' : 'km'}
          placeholder="0"
        />
        <CalculatorField
          label="Hours"
          value={calc.values.hours}
          isActive={calc.activeField === 'hours'}
          onSelect={() => calc.setActiveField('hours')}
          onClear={calc.handleClear}
          suffix="h"
          placeholder="0"
        />
        <CalculatorField
          label="Mins"
          value={calc.values.minutes}
          isActive={calc.activeField === 'minutes'}
          onSelect={() => calc.setActiveField('minutes')}
          onClear={calc.handleClear}
          suffix="m"
          placeholder="0"
        />
        <CalculatorField
          label="Secs"
          value={calc.values.seconds}
          isActive={calc.activeField === 'seconds'}
          onSelect={() => calc.setActiveField('seconds')}
          onClear={calc.handleClear}
          suffix="s"
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="REQUIRED PACE"
        result={`${formatPace(secPerMile)} / mi`}
        subtext={`Pace: ${formatPace(secPerKm)} / km | Duration: ${h}h ${m}m ${s}s`}
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

// 2. BMI Calculator (Inputs -> Output -> Keypad)
export const BmiCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  const calcImp = useCalculatorInput(
    {
      feet: '',
      inches: '',
      weight: ''
    },
    ['feet', 'inches', 'weight']
  );

  const calcMet = useCalculatorInput(
    {
      cm: '',
      kg: ''
    },
    ['cm', 'kg']
  );

  let bmi = 0;
  if (unitSystem === 'imperial') {
    const totalInches = (safeParseFloat(calcImp.values.feet) * 12) + safeParseFloat(calcImp.values.inches);
    const lbs = safeParseFloat(calcImp.values.weight);
    if (totalInches > 0) {
      bmi = (lbs * 703) / (totalInches * totalInches);
    }
  } else {
    const m = safeParseFloat(calcMet.values.cm) / 100;
    const kg = safeParseFloat(calcMet.values.kg);
    if (m > 0) {
      bmi = kg / (m * m);
    }
  }

  let category = 'Normal weight';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';

  const activeCalc = unitSystem === 'imperial' ? calcImp : calcMet;

  return (
    <div className="space-y-2 max-w-md mx-auto">
      {/* Unit System Tabs */}
      <div className="flex p-0.5 bg-slate-100 rounded-xl">
        <button
          type="button"
          onClick={() => setUnitSystem('imperial')}
          className={`flex-1 py-1 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Imperial (ft / in / lbs)
        </button>
        <button
          type="button"
          onClick={() => setUnitSystem('metric')}
          className={`flex-1 py-1 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Metric (cm / kg)
        </button>
      </div>

      {/* 1. INPUTS ON TOP */}
      {unitSystem === 'imperial' ? (
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <CalculatorField
            label="Feet"
            value={calcImp.values.feet}
            isActive={calcImp.activeField === 'feet'}
            onSelect={() => calcImp.setActiveField('feet')}
            onClear={calcImp.handleClear}
            suffix="ft"
            placeholder="0"
          />
          <CalculatorField
            label="Inches"
            value={calcImp.values.inches}
            isActive={calcImp.activeField === 'inches'}
            onSelect={() => calcImp.setActiveField('inches')}
            onClear={calcImp.handleClear}
            suffix="in"
            placeholder="0"
          />
          <CalculatorField
            label="Weight"
            value={calcImp.values.weight}
            isActive={calcImp.activeField === 'weight'}
            onSelect={() => calcImp.setActiveField('weight')}
            onClear={calcImp.handleClear}
            suffix="lbs"
            placeholder="0"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <CalculatorField
            label="Height"
            value={calcMet.values.cm}
            isActive={calcMet.activeField === 'cm'}
            onSelect={() => calcMet.setActiveField('cm')}
            onClear={calcMet.handleClear}
            suffix="cm"
            placeholder="0"
          />
          <CalculatorField
            label="Weight"
            value={calcMet.values.kg}
            isActive={calcMet.activeField === 'kg'}
            onSelect={() => calcMet.setActiveField('kg')}
            onClear={calcMet.handleClear}
            suffix="kg"
            placeholder="0"
          />
        </div>
      )}

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="BODY MASS INDEX (BMI)"
        result={bmi > 0 ? formatNumber(bmi, { decimals: 1 }) : '0.0'}
        subtext={`Category: ${bmi > 0 ? category : 'Enter values'} (Healthy band: 18.5 – 24.9)`}
        variant={bmi >= 18.5 && bmi < 25 ? 'emerald' : 'purple'}
        onReset={activeCalc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={activeCalc.handleDigit}
          onDecimal={activeCalc.handleDecimal}
          onBackspace={activeCalc.handleBackspace}
          onClear={activeCalc.handleClearAll}
          onClearActive={activeCalc.handleClear}
          onNextField={activeCalc.handleNextField}
          showNextButton={true}
        />
      </div>
    </div>
  );
};

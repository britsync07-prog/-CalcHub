import React, { useState } from 'react';
import { RegionalLocale } from '../../types/calculator';
import { formatNumber, safeParseFloat } from '../../utils/formatters';
import { saveCalculationHistory } from '../../utils/history';
import { CalculatorButton } from '../calculator-ui/CalculatorButton';
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

function getGcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// 1. Scientific & Basic Keypad Calculator (Phone App Experience)
export const ScientificCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const [display, setDisplay] = useState('0');
  const [historyExpr, setHistoryExpr] = useState('');
  const [isRad, setIsRad] = useState(false);

  const handleDigit = (d: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? d : prev + d));
  };

  const handleOp = (op: string) => {
    setDisplay((prev) => prev + op);
  };

  const handleClear = () => {
    setDisplay('0');
    setHistoryExpr('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  };

  const handleCalculate = () => {
    try {
      setHistoryExpr(display);
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      if (/[^0-9+\-*/(). eMathPIsqrtcosintaogln^]/.test(expr)) {
        setDisplay('Error');
        return;
      }

      expr = expr.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
      expr = expr.replace(/sin\(([^)]+)\)/g, isRad ? 'Math.sin($1)' : 'Math.sin(($1)*Math.PI/180)');
      expr = expr.replace(/cos\(([^)]+)\)/g, isRad ? 'Math.cos($1)' : 'Math.cos(($1)*Math.PI/180)');
      expr = expr.replace(/tan\(([^)]+)\)/g, isRad ? 'Math.tan($1)' : 'Math.tan(($1)*Math.PI/180)');
      expr = expr.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
      expr = expr.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');

      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${expr})`)();
      if (typeof result === 'number' && !isNaN(result)) {
        const formatted = String(parseFloat(result.toFixed(8)));
        setDisplay(formatted);
        saveCalculationHistory({
          calculatorId: id,
          calculatorName: name,
          inputSummary: display,
          resultSummary: formatted
        });
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* Top Digital Display Screen */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white rounded-2xl shadow-inner text-right border border-slate-800 space-y-1">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setIsRad(!isRad)}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono font-medium"
          >
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <span className="font-mono text-[11px] truncate max-w-[200px] text-slate-400">
            {historyExpr || 'Scientific'}
          </span>
        </div>
        <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums overflow-x-auto no-scrollbar select-all py-1">
          {display}
        </div>
      </div>

      {/* Modern Touch-Friendly Keypad Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        <CalculatorButton variant="action" onClick={() => handleOp('(')}>(</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp(')')}>)</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('sqrt(')}>√</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('^')}>xʸ</CalculatorButton>
        <CalculatorButton variant="danger" onClick={handleClear}>AC</CalculatorButton>

        <CalculatorButton variant="action" onClick={() => handleOp('sin(')}>sin</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('cos(')}>cos</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('tan(')}>tan</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('%')}>%</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => handleOp('÷')}>÷</CalculatorButton>

        <CalculatorButton onClick={() => handleDigit('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('9')}>9</CalculatorButton>
        <CalculatorButton variant="action" onClick={handleBackspace}>⌫</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => handleOp('×')}>×</CalculatorButton>

        <CalculatorButton onClick={() => handleDigit('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('6')}>6</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('log(')}>log</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => handleOp('-')}>-</CalculatorButton>

        <CalculatorButton onClick={() => handleDigit('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('3')}>3</CalculatorButton>
        <CalculatorButton variant="action" onClick={() => handleOp('3.14159')}>π</CalculatorButton>
        <CalculatorButton variant="operator" onClick={() => handleOp('+')}>+</CalculatorButton>

        <CalculatorButton colSpan={2} onClick={() => handleDigit('0')}>0</CalculatorButton>
        <CalculatorButton onClick={() => handleDigit('.')}>.</CalculatorButton>
        <CalculatorButton colSpan={2} variant="primary" onClick={handleCalculate}>=</CalculatorButton>
      </div>
    </div>
  );
};

// 2. Fraction Calculator (Phone Calculator Experience)
export const FractionCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput(
    {
      num1: '',
      den1: '',
      num2: '',
      den2: ''
    },
    ['num1', 'den1', 'num2', 'den2']
  );

  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');

  const n1 = parseInt(calc.values.num1, 10) || 0;
  const d1 = parseInt(calc.values.den1, 10) || 1;
  const n2 = parseInt(calc.values.num2, 10) || 0;
  const d2 = parseInt(calc.values.den2, 10) || 1;

  let resNum = 0;
  let resDen = 1;

  if (op === '+') {
    resNum = n1 * d2 + n2 * d1;
    resDen = d1 * d2;
  } else if (op === '-') {
    resNum = n1 * d2 - n2 * d1;
    resDen = d1 * d2;
  } else if (op === '*') {
    resNum = n1 * n2;
    resDen = d1 * d2;
  } else if (op === '/') {
    resNum = n1 * d2;
    resDen = d1 * n2;
  }

  const gcdVal = getGcd(resNum, resDen);
  const simpNum = resNum / gcdVal;
  const simpDen = resDen / gcdVal;

  const whole = Math.floor(Math.abs(simpNum) / Math.abs(simpDen));
  const remNum = Math.abs(simpNum) % Math.abs(simpDen);
  const isNegative = (simpNum < 0 && simpDen > 0) || (simpNum > 0 && simpDen < 0);
  const decimalVal = simpDen !== 0 ? simpNum / simpDen : 0;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl">
        {/* Fraction 1 */}
        <div className="flex flex-col gap-0.5 w-16 sm:w-20">
          <button
            type="button"
            onClick={() => calc.setActiveField('num1')}
            className={`p-1.5 rounded-lg border font-mono font-bold text-center text-xs sm:text-sm cursor-pointer ${
              calc.activeField === 'num1' ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-blue-900' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            {calc.values.num1 || '0'}
          </button>
          <div className="h-0.5 bg-slate-400 my-0.5" />
          <button
            type="button"
            onClick={() => calc.setActiveField('den1')}
            className={`p-1.5 rounded-lg border font-mono font-bold text-center text-xs sm:text-sm cursor-pointer ${
              calc.activeField === 'den1' ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-blue-900' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            {calc.values.den1 || '1'}
          </button>
        </div>

        {/* Operator */}
        <div className="flex flex-col gap-1">
          <select
            value={op}
            onChange={(e) => setOp(e.target.value as any)}
            className="p-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-sm text-slate-900 shadow-2xs"
          >
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
        </div>

        {/* Fraction 2 */}
        <div className="flex flex-col gap-0.5 w-16 sm:w-20">
          <button
            type="button"
            onClick={() => calc.setActiveField('num2')}
            className={`p-1.5 rounded-lg border font-mono font-bold text-center text-xs sm:text-sm cursor-pointer ${
              calc.activeField === 'num2' ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-blue-900' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            {calc.values.num2 || '0'}
          </button>
          <div className="h-0.5 bg-slate-400 my-0.5" />
          <button
            type="button"
            onClick={() => calc.setActiveField('den2')}
            className={`p-1.5 rounded-lg border font-mono font-bold text-center text-xs sm:text-sm cursor-pointer ${
              calc.activeField === 'den2' ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-blue-900' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            {calc.values.den2 || '1'}
          </button>
        </div>

        <span className="text-lg font-bold font-mono text-slate-400">=</span>

        {/* Reduced Solution Fraction */}
        <div className="flex items-center gap-1 min-w-14">
          {whole > 0 && remNum > 0 && (
            <span className="text-base font-bold font-mono text-blue-950">
              {isNegative ? '-' : ''}{whole}
            </span>
          )}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold font-mono text-blue-900">
              {remNum > 0 && whole > 0 ? remNum : simpNum}
            </span>
            <div className="w-6 h-0.5 bg-blue-900 my-0.5" />
            <span className="text-sm font-bold font-mono text-blue-900">
              {Math.abs(simpDen)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="REDUCED FRACTION"
        result={`${simpNum} / ${simpDen}`}
        subtext={`Decimal form is ${formatNumber(decimalVal, { decimals: 4, trimTrailingZeros: true })}.${whole > 0 && remNum > 0 ? ` Mixed: ${isNegative ? '-' : ''}${whole} ${remNum}/${Math.abs(simpDen)}` : ''}`}
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

// 3. Ratio Calculator (Inputs -> Output -> Keypad)
export const RatioCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const calc = useCalculatorInput(
    {
      a: '',
      b: '',
      c: ''
    },
    ['a', 'b', 'c']
  );

  const valA = safeParseFloat(calc.values.a);
  const valB = safeParseFloat(calc.values.b);
  const valC = safeParseFloat(calc.values.c);

  const solvedX = valA !== 0 ? (valB * valC) / valA : 0;
  const gcdAB = getGcd(valA, valB);
  const simpA = gcdAB !== 0 ? Math.round(valA) / gcdAB : valA;
  const simpB = gcdAB !== 0 ? Math.round(valB) / gcdAB : valB;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <CalculatorField
          label="Ratio A"
          value={calc.values.a}
          isActive={calc.activeField === 'a'}
          onSelect={() => calc.setActiveField('a')}
          onClear={calc.handleClear}
          placeholder="0"
        />
        <CalculatorField
          label="Ratio B"
          value={calc.values.b}
          isActive={calc.activeField === 'b'}
          onSelect={() => calc.setActiveField('b')}
          onClear={calc.handleClear}
          placeholder="0"
        />
        <CalculatorField
          label="Ratio C"
          value={calc.values.c}
          isActive={calc.activeField === 'c'}
          onSelect={() => calc.setActiveField('c')}
          onClear={calc.handleClear}
          placeholder="0"
        />
      </div>

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="SOLVED VALUE X"
        result={`X = ${formatNumber(solvedX, { decimals: 4, trimTrailingZeros: true })}`}
        subtext={`Ratio: ${calc.values.c || '0'} : ${formatNumber(solvedX, { decimals: 2, trimTrailingZeros: true })} (Simplified: ${simpA} : ${simpB})`}
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

// 4. Statistics Calculator (Phone Calculator Experience)
export const StatisticsCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const [dataInput, setDataInput] = useState('4, 8, 6, 5, 3, 8, 9, 12, 8, 14');

  const numbers = dataInput
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n));

  const sorted = [...numbers].sort((x, y) => x - y);
  const count = sorted.length;
  const sum = sorted.reduce((acc, curr) => acc + curr, 0);
  const mean = count > 0 ? sum / count : 0;

  let median = 0;
  if (count > 0) {
    const mid = Math.floor(count / 2);
    median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  const counts: Record<number, number> = {};
  sorted.forEach((n) => (counts[n] = (counts[n] || 0) + 1));
  let maxFreq = 0;
  Object.values(counts).forEach((freq) => {
    if (freq > maxFreq) maxFreq = freq;
  });
  const modes = Object.keys(counts)
    .filter((k) => counts[Number(k)] === maxFreq && maxFreq > 1)
    .map(Number);

  const variance = count > 1 ? sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (count - 1) : 0;
  const stdDev = Math.sqrt(variance);

  const min = count > 0 ? sorted[0] : 0;
  const max = count > 0 ? sorted[count - 1] : 0;
  const range = max - min;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Dataset Numbers
        </label>
        <textarea
          rows={3}
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          placeholder="e.g. 10, 15, 20, 25"
          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
          <span>{count} data points entered</span>
          <button
            type="button"
            onClick={() => setDataInput('')}
            className="text-rose-600 hover:underline"
          >
            Clear Data
          </button>
        </div>
      </div>

      {/* Sample Dataset Presets */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-medium text-[11px] mr-1">Load Sample:</span>
        <button
          type="button"
          onClick={() => setDataInput('72, 85, 90, 78, 92, 88, 76, 95')}
          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium cursor-pointer"
        >
          Test Scores
        </button>
        <button
          type="button"
          onClick={() => setDataInput('14, 21, 28, 35, 42, 49, 56, 63')}
          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium cursor-pointer"
        >
          Multiples
        </button>
        <button
          type="button"
          onClick={() => setDataInput('120, 135, 110, 145, 130, 125, 140')}
          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium cursor-pointer"
        >
          Weights
        </button>
      </div>

      {/* Main Results */}
      <CalculatorResultCard
        label="MEAN (AVERAGE)"
        result={formatNumber(mean, { decimals: 2 })}
        subtext={`Median midpoint is ${formatNumber(median, { decimals: 2 })}, Mode frequency is ${modes.length > 0 ? modes.join(', ') : 'None'}.`}
        details={[
          { label: 'Sample Std Dev (s)', value: formatNumber(stdDev, { decimals: 3 }) },
          { label: 'Variance (s²)', value: formatNumber(variance, { decimals: 2 }) },
          { label: 'Range (Max - Min)', value: `${range}` },
          { label: 'Sum (Σx)', value: `${sum}` }
        ]}
        variant="blue"
      />
    </div>
  );
};

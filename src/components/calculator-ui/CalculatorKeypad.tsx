import React, { useEffect } from 'react';
import { Delete, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CalculatorButton } from './CalculatorButton';

export type KeypadLayout = 'numeric' | 'arithmetic' | 'financial';

interface CalculatorKeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onBackspace: () => void;
  onClear: () => void; // Reset all inputs (AC)
  onClearActive?: () => void; // Clear current active field (C)
  onToggleSign?: () => void;
  allowNegative?: boolean; // Default false. Only shown if explicitly enabled!
  onNextField?: () => void;
  onCalculate?: () => void;
  layout?: KeypadLayout;
  showNextButton?: boolean;
  className?: string;
  customActions?: React.ReactNode;
}

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onDigit,
  onDecimal,
  onBackspace,
  onClear,
  onClearActive,
  onToggleSign,
  allowNegative = false,
  onNextField,
  onCalculate,
  layout = 'numeric',
  showNextButton = false,
  className = '',
  customActions
}) => {
  // Listen for physical keyboard strokes on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing inside an actual search input or modal
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        onDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        onDecimal();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClear();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        if (onClearActive) {
          onClearActive();
        } else {
          onClear();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (onCalculate) {
          onCalculate();
        } else if (onNextField) {
          onNextField();
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (onNextField) {
          onNextField();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDigit, onDecimal, onBackspace, onClear, onClearActive, onNextField, onCalculate]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Optional Custom Controls Bar */}
      {customActions && (
        <div className="flex flex-wrap items-center gap-1 pb-0.5">
          {customActions}
        </div>
      )}

      {/* 3-Column Phone Keypad - Authentic Mobile Calculator Layout */}
      {(layout === 'numeric' || layout === 'financial') && (
        <div className="space-y-1 sm:space-y-1.5">
          {/* Top Control Bar: C (Clear current field), AC (Reset all), and Backspace */}
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            <CalculatorButton
              variant="action"
              onClick={onClearActive || onClear}
              className="text-xs sm:text-sm font-bold tracking-wide"
              title="Clear Active Input (C)"
            >
              C
            </CalculatorButton>
            <CalculatorButton
              variant="danger"
              onClick={onClear}
              className="text-xs sm:text-sm font-bold tracking-wide"
              title="Reset All (AC / Esc)"
            >
              AC
            </CalculatorButton>
            <CalculatorButton
              variant="action"
              onClick={onBackspace}
              className="flex items-center justify-center"
              title="Backspace"
            >
              <Delete className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
            </CalculatorButton>
          </div>

          {/* Standard 3-Column Keypad Grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            <CalculatorButton onClick={() => onDigit('7')}>7</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('8')}>8</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('9')}>9</CalculatorButton>

            <CalculatorButton onClick={() => onDigit('4')}>4</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('5')}>5</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('6')}>6</CalculatorButton>

            <CalculatorButton onClick={() => onDigit('1')}>1</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('2')}>2</CalculatorButton>
            <CalculatorButton onClick={() => onDigit('3')}>3</CalculatorButton>

            {allowNegative && onToggleSign ? (
              <>
                <CalculatorButton
                  variant="action"
                  onClick={onToggleSign}
                  className="text-base sm:text-lg font-bold"
                  title="Toggle Positive / Negative"
                >
                  ±
                </CalculatorButton>
                <CalculatorButton onClick={() => onDigit('0')}>0</CalculatorButton>
                <CalculatorButton onClick={onDecimal}>.</CalculatorButton>
              </>
            ) : (
              <>
                <CalculatorButton colSpan={2} onClick={() => onDigit('0')}>0</CalculatorButton>
                <CalculatorButton onClick={onDecimal}>.</CalculatorButton>
              </>
            )}
          </div>

          {/* Action button: Next or Calculate shown as a compact thumb-friendly CTA */}
          {((showNextButton && onNextField) || onCalculate) && (
            <div className="pt-0.5">
              {showNextButton && onNextField ? (
                <button
                  type="button"
                  onClick={onNextField}
                  className="w-full h-8 sm:h-9 rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Next Input Field (Tab)"
                >
                  <span>Next Field</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : onCalculate ? (
                <button
                  type="button"
                  onClick={onCalculate}
                  className="w-full h-8 sm:h-9 rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Calculate (Enter)"
                >
                  <span>Calculate</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* 4-Column Standard Arithmetic Calculator (Google / iOS Style) */}
      {layout === 'arithmetic' && (
        <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
          <CalculatorButton variant="danger" onClick={onClear} title="All Clear">AC</CalculatorButton>
          <CalculatorButton variant="action" onClick={onClearActive || onClear} title="Clear">C</CalculatorButton>
          <CalculatorButton variant="action" onClick={onBackspace} title="Backspace">
            <Delete className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          </CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => onDigit('/')} title="Divide">÷</CalculatorButton>

          <CalculatorButton onClick={() => onDigit('7')}>7</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('8')}>8</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('9')}>9</CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => onDigit('*')} title="Multiply">×</CalculatorButton>

          <CalculatorButton onClick={() => onDigit('4')}>4</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('5')}>5</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('6')}>6</CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => onDigit('-')} title="Subtract">−</CalculatorButton>

          <CalculatorButton onClick={() => onDigit('1')}>1</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('2')}>2</CalculatorButton>
          <CalculatorButton onClick={() => onDigit('3')}>3</CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => onDigit('+')} title="Add">+</CalculatorButton>

          <CalculatorButton colSpan={2} onClick={() => onDigit('0')}>0</CalculatorButton>
          <CalculatorButton onClick={onDecimal}>.</CalculatorButton>
          <CalculatorButton variant="primary" onClick={onCalculate || (() => {})} title="Equals">=</CalculatorButton>
        </div>
      )}
    </div>
  );
};

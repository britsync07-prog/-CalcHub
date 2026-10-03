import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface CalculatorResultCardProps {
  label?: string;
  result: string;
  subtext?: string;
  details?: { label: string; value: string }[];
  onReset?: () => void;
  variant?: 'blue' | 'emerald' | 'purple' | 'slate';
  className?: string;
}

export const CalculatorResultCard: React.FC<CalculatorResultCardProps> = ({
  label = 'RESULT',
  result,
  subtext,
  details = [],
  onReset,
  variant = 'blue',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const variantStyles = {
    blue: {
      card: 'bg-blue-50/90 border-blue-200 text-blue-950',
      label: 'text-blue-700',
      result: 'text-black',
      button: 'bg-white text-blue-900 border-blue-200 hover:bg-blue-100/50'
    },
    emerald: {
      card: 'bg-emerald-50/90 border-emerald-200 text-emerald-950',
      label: 'text-emerald-700',
      result: 'text-black',
      button: 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-100/50'
    },
    purple: {
      card: 'bg-purple-50/90 border-purple-200 text-purple-950',
      label: 'text-purple-700',
      result: 'text-black',
      button: 'bg-white text-purple-900 border-purple-200 hover:bg-purple-100/50'
    },
    slate: {
      card: 'bg-slate-900 border-slate-800 text-white',
      label: 'text-slate-400',
      result: 'text-white',
      button: 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
    }
  }[variant];

  return (
    <div className={`rounded-xl border px-3 py-1.5 sm:px-4 sm:py-2 transition-all space-y-0.5 sm:space-y-1 ${variantStyles.card} ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${variantStyles.label}`}>
          {label}
        </span>

        <div className="flex items-center gap-1">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className={`p-1 rounded-lg border text-xs font-semibold transition-colors ${variantStyles.button}`}
              title="Reset Calculation"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg border text-[10px] sm:text-[11px] font-bold transition-colors ${variantStyles.button}`}
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Main Big Number Display */}
      <div className="overflow-x-auto no-scrollbar">
        <div className={`text-xl sm:text-2xl font-black font-mono tracking-tight tabular-nums select-all leading-tight ${variantStyles.result}`}>
          {result}
        </div>
      </div>

      {/* Optional explanatory subtext */}
      {subtext && (
        <p className="text-[10px] sm:text-xs font-medium opacity-85 leading-snug truncate">
          {subtext}
        </p>
      )}

      {/* Optional Detail Chips */}
      {details.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5 border-t border-black/5 dark:border-white/5 text-[10px] sm:text-[11px]">
          {details.map((d, idx) => (
            <div key={idx} className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 flex items-center gap-1">
              <span className="opacity-70 font-medium">{d.label}:</span>
              <span className={`font-mono font-bold ${variantStyles.result}`}>{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

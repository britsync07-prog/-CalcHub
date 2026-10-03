import React from 'react';
import { X } from 'lucide-react';

interface CalculatorFieldProps {
  label: string;
  value: string;
  isActive: boolean;
  onSelect: () => void;
  onClear?: () => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  className?: string;
}

export const CalculatorField: React.FC<CalculatorFieldProps> = ({
  label,
  value,
  isActive,
  onSelect,
  onClear,
  prefix,
  suffix,
  placeholder = '0',
  className = ''
}) => {
  const displayVal = value || '';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`
        relative rounded-lg sm:rounded-xl border px-2 py-1 sm:px-2.5 sm:py-1.5 transition-all cursor-pointer select-none text-left w-full
        ${isActive 
          ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/25 shadow-2xs' 
          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
        }
        ${className}
      `}
    >
      {/* Header: Label */}
      <div className="flex items-center justify-between mb-0.5">
        <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate ${isActive ? 'text-blue-700' : 'text-slate-500'}`}>
          {label}
        </span>
        {isActive && value && onClear && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            title="Clear field"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline justify-between font-mono text-sm sm:text-base font-bold tracking-tight text-slate-900 tabular-nums overflow-hidden leading-tight">
        <span className="text-slate-400 text-xs sm:text-sm font-semibold mr-0.5 shrink-0 select-none">
          {prefix || ''}
        </span>

        <div className="flex items-baseline justify-end truncate flex-1">
          {displayVal ? (
            <span className={isActive ? 'text-blue-900' : 'text-slate-900'}>{displayVal}</span>
          ) : (
            <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>{placeholder}</span>
          )}

          {suffix && (
            <span className="text-xs sm:text-sm text-slate-400 font-semibold ml-0.5 shrink-0 select-none">
              {suffix}
            </span>
          )}

          {isActive && (
            <span className="inline-block w-0.5 h-3.5 sm:h-4 bg-blue-600 ml-0.5 animate-pulse shrink-0 self-center" />
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';

interface CalculatorDisplayProps {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  placeholder = '0'
}) => {
  const displayVal = value || '';
  
  // Format with prefix/suffix for display
  const displayString = displayVal
    ? `${prefix}${displayVal}${suffix}`
    : `${prefix}${placeholder}${suffix}`;

  // Determine responsive font size based on the character length to prevent horizontal overflow
  const getFontSizeClass = (len: number) => {
    if (len <= 8) return 'text-3xl sm:text-5xl';
    if (len <= 12) return 'text-2xl sm:text-3xl';
    if (len <= 16) return 'text-xl sm:text-2xl';
    return 'text-lg sm:text-xl break-all';
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-inner border border-slate-800 space-y-1 text-right select-all select-none">
      {/* Active input category/label */}
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          • Active Input
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">
          {label}
        </span>
      </div>

      {/* Responsive digital readout */}
      <div 
        className={`font-mono font-bold tracking-tight text-white transition-all duration-75 tabular-nums ${getFontSizeClass(displayString.length)}`}
      >
        {displayString}
      </div>
    </div>
  );
};

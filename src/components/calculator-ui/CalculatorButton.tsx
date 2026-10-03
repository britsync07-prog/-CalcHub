import React from 'react';

export type CalculatorButtonVariant = 'number' | 'operator' | 'action' | 'primary' | 'danger';

interface CalculatorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CalculatorButtonVariant;
  colSpan?: 1 | 2 | 3 | 4;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  children,
  variant = 'number',
  colSpan = 1,
  className = '',
  ...props
}) => {
  const variantStyles: Record<CalculatorButtonVariant, string> = {
    number:
      'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 border border-slate-200 shadow-2xs font-semibold text-lg sm:text-xl font-mono tracking-tight',
    operator:
      'bg-blue-50/90 hover:bg-blue-100 active:bg-blue-200 text-blue-700 border border-blue-200 font-bold text-base sm:text-lg font-mono',
    action:
      'bg-slate-100/90 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm font-mono',
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs border border-blue-700 font-mono',
    danger:
      'bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm font-mono'
  };

  const colSpanStyles: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4'
  };

  return (
    <button
      type="button"
      className={`
        ${colSpanStyles[colSpan]}
        ${variantStyles[variant]}
        h-9 sm:h-11
        rounded-lg sm:rounded-xl
        flex items-center justify-center
        transition-all duration-75
        active:scale-[0.95]
        cursor-pointer
        select-none
        touch-manipulation
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

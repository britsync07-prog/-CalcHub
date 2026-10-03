import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type AdSlotType = 'leaderboard' | 'rectangle' | 'sidebar' | 'in-content';

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
  id?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className = '', id = 'ad-slot' }) => {
  const [showMockAd, setShowMockAd] = useState(true);

  // Strict pre-allocated heights to guarantee Zero Cumulative Layout Shift (CLS = 0)
  const dimensionStyles: Record<AdSlotType, { container: string; inner: string; label: string }> = {
    leaderboard: {
      container: 'min-h-[106px] my-6 flex justify-center',
      inner: 'w-full max-w-[728px] h-[90px] bg-slate-100/80 border border-slate-200/80 rounded-md',
      label: 'Leaderboard (728×90 / 320×50 mobile)'
    },
    rectangle: {
      container: 'min-h-[266px] my-4 flex justify-center',
      inner: 'w-[300px] h-[250px] bg-slate-100/80 border border-slate-200/80 rounded-md',
      label: 'Medium Rectangle (300×250)'
    },
    sidebar: {
      container: 'min-h-[616px] my-4 flex justify-center sticky top-24',
      inner: 'w-[300px] h-[600px] bg-slate-100/80 border border-slate-200/80 rounded-md',
      label: 'Half Page Sidebar (300×600)'
    },
    'in-content': {
      container: 'min-h-[120px] my-8 flex justify-center',
      inner: 'w-full max-w-[728px] h-[100px] bg-slate-100/80 border border-slate-200/80 rounded-md',
      label: 'Native Content Unit (Responsive)'
    }
  };

  const current = dimensionStyles[type];

  return (
    <aside 
      aria-label="Advertisement Container"
      id={id}
      className={`${current.container} ${className} select-none`}
    >
      <div className="flex flex-col items-center">
        {/* Discreet regulatory compliance label */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-medium tracking-wider uppercase mb-1.5 px-1">
          <span>Advertisement</span>
          <button 
            type="button"
            onClick={() => setShowMockAd(!showMockAd)}
            className="hover:text-slate-600 transition-colors flex items-center gap-1 text-[10px] lowercase"
            title="Toggle Ad Container Preview"
          >
            {showMockAd ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span>preview {showMockAd ? 'on' : 'off'}</span>
          </button>
        </div>

        {/* Ad container box with fixed geometry to prevent layout shifts */}
        <div className={`${current.inner} flex flex-col items-center justify-center p-3 text-center transition-all overflow-hidden relative group`}>
          {showMockAd ? (
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-xs font-medium text-slate-500">Reserved Ad Space</span>
              <span className="text-[11px] text-slate-400 font-mono">{current.label}</span>
              <span className="text-[10px] text-slate-400/90 max-w-[240px]">
                Google AdSense & Certified Ad Exchange Compliant (Zero CLS)
              </span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-300 font-mono">
              [Empty Ad Slot Placeholder]
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

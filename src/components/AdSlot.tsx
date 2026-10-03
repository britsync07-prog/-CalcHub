import React from 'react';

export type AdSlotType = 'leaderboard' | 'rectangle' | 'sidebar' | 'in-content';

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
  id?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className = '', id = 'ad-slot' }) => {
  const directLink = 'https://omg10.com/4/11949603';

  // Strict pre-allocated heights to guarantee Zero Cumulative Layout Shift (CLS = 0)
  const dimensionStyles: Record<
    AdSlotType,
    { container: string; inner: string; title: string; subtitle: string; badge: string; cta: string }
  > = {
    leaderboard: {
      container: 'min-h-[106px] my-6 flex justify-center',
      inner:
        'w-full max-w-[728px] h-[90px] bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 border border-blue-500/40 rounded-xl text-white shadow-md hover:border-blue-400 transition-all flex items-center justify-between px-4 sm:px-6',
      title: 'Top Rated Financial & Daily Utilities',
      subtitle: 'Instant Access to Featured Offers',
      badge: 'Sponsored Ad',
      cta: 'Claim Offer →'
    },
    rectangle: {
      container: 'min-h-[266px] my-4 flex justify-center',
      inner:
        'w-[300px] h-[250px] bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 border border-indigo-500/40 rounded-xl text-white shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between p-5 text-left',
      title: 'Exclusive Daily Rewards',
      subtitle: 'Discover trending deals & bonus calculators customized for you.',
      badge: 'Promoted',
      cta: 'Get Started Now →'
    },
    sidebar: {
      container: 'min-h-[616px] my-4 flex justify-center sticky top-24',
      inner:
        'w-[300px] h-[600px] bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 rounded-2xl text-white shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between p-6 text-left',
      title: 'Premium Member Rewards & Utility Deals',
      subtitle: 'Unlock high-yield offers, financial planning bonuses, and exclusive partner apps today.',
      badge: 'Featured Partner',
      cta: 'Explore Special Offers →'
    },
    'in-content': {
      container: 'min-h-[120px] my-8 flex justify-center',
      inner:
        'w-full max-w-[728px] h-[100px] bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border border-emerald-500/40 rounded-xl text-white shadow-md hover:border-emerald-400 transition-all flex items-center justify-between px-4 sm:px-6',
      title: 'Instant Financial Checkup & Tools',
      subtitle: 'Verified special partner tools and bonus programs.',
      badge: 'Sponsored',
      cta: 'View Deal →'
    }
  };

  const current = dimensionStyles[type];

  return (
    <aside aria-label="Advertisement Container" id={id} className={`${current.container} ${className} select-none`}>
      <div className="flex flex-col items-center w-full">
        {/* Discreet regulatory compliance label */}
        <div className="w-full max-w-[728px] flex items-center justify-between text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1 px-1">
          <span>Advertisement</span>
          <span>Sponsored</span>
        </div>

        {/* Ad container box with fixed geometry to prevent layout shifts */}
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${current.inner} cursor-pointer group`}
        >
          {type === 'leaderboard' || type === 'in-content' ? (
            <>
              <div className="space-y-0.5 max-w-[480px]">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-400/30 uppercase">
                    {current.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-200 transition-colors line-clamp-1">
                    {current.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300/80 line-clamp-1">{current.subtitle}</p>
              </div>
              <span className="bg-emerald-500 group-hover:bg-emerald-600 text-slate-950 font-extrabold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs transition shadow shrink-0">
                {current.cta}
              </span>
            </>
          ) : type === 'rectangle' ? (
            <>
              <div className="space-y-2">
                <span className="inline-block bg-indigo-500/20 text-indigo-300 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-400/30 uppercase">
                  {current.badge}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug">
                  {current.title}
                </h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">{current.subtitle}</p>
              </div>
              <span className="w-full text-center bg-blue-600 group-hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition shadow-sm">
                {current.cta}
              </span>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <span className="inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30 uppercase">
                  {current.badge}
                </span>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors leading-snug">
                  {current.title}
                </h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">{current.subtitle}</p>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <span>✓ Verified Offer</span>
                  </div>
                  <p>Click below to claim your exclusive access today.</p>
                </div>
              </div>
              <span className="w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-600 group-hover:to-teal-600 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs transition shadow-md">
                {current.cta}
              </span>
            </>
          )}
        </a>
      </div>
    </aside>
  );
};

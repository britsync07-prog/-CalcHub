import React from 'react';

interface PromoBannerProps {
  variant?: 'top' | 'sidebar' | 'inline';
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ variant = 'inline' }) => {
  const directLink = "https://omg10.com/4/11949603";

  if (variant === 'top') {
    return (
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Featured</span>
            <span>Special Offer: Unlock Premium Daily Tools & Calculators Free!</span>
          </div>
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-3 py-1 rounded text-xs transition shadow-sm"
          >
            Claim Access &rarr;
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-700/50 rounded-xl p-5 text-white shadow-lg space-y-3">
        <span className="bg-indigo-500/30 text-indigo-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-indigo-400/30">
          Sponsored Partner
        </span>
        <h3 className="text-base font-bold text-indigo-100">Top Recommended Deals for Today</h3>
        <p className="text-xs text-indigo-200/80 leading-relaxed">
          Exclusive financial offers, utilities, and daily rewards curated for our community.
        </p>
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition shadow-md"
        >
          Check Deals Now &rarr;
        </a>
      </div>
    );
  }

  return (
    <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-md border border-blue-700/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30 uppercase">
              Trending
            </span>
            <span className="text-xs font-semibold text-blue-200">Exclusive Reward Opportunity</span>
          </div>
          <p className="text-sm font-bold text-white">Get Special Online Offers & Rewards Instantly</p>
        </div>
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-lg text-xs transition shadow-md"
        >
          Explore Now &rarr;
        </a>
      </div>
    </div>
  );
};

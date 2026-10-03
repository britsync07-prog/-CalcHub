import React, { useState } from 'react';
import { X, Copy, Check, Code, ExternalLink } from 'lucide-react';

interface EmbedCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorSlug: string;
  calculatorName: string;
}

export const EmbedCalculatorModal: React.FC<EmbedCalculatorModalProps> = ({
  isOpen,
  onClose,
  calculatorSlug,
  calculatorName
}) => {
  const [copied, setCopied] = useState(false);
  const [embedHeight, setEmbedHeight] = useState('540');

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://everyday-calculator-hub-cw8.pages.dev';
  const embedUrl = `${origin}/calculators/${calculatorSlug}?embed=true`;
  const canonicalUrl = `${origin}/calculators/${calculatorSlug}`;

  const embedSnippet = `<iframe src="${embedUrl}" width="100%" height="${embedHeight}" frameborder="0" style="border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);" title="${calculatorName} - Everyday Calculator Hub"></iframe>
<p style="font-size:12px;color:#64748b;margin-top:6px;text-align:right;">
  Free calculator powered by <a href="${canonicalUrl}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline;font-weight:600;">Everyday Calculator Hub</a>
</p>`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Embed {calculatorName}</h3>
              <p className="text-[11px] text-slate-500">Free, responsive iframe widget for your website or blog</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs text-slate-700">
          <p className="text-slate-600 leading-relaxed">
            Copy and paste this HTML code directly into your WordPress, Squarespace, Webflow, or custom site. The calculator updates automatically and provides instant, client-side math.
          </p>

          {/* Height Option */}
          <div className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl">
            <span className="font-semibold text-slate-700">Widget Height:</span>
            <div className="flex gap-1">
              {['480', '540', '600'].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setEmbedHeight(h)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    embedHeight === h
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {h}px
                </button>
              ))}
            </div>
          </div>

          {/* Snippet Code Box */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
              <span>HTML Embed Code</span>
              {copied && <span className="text-emerald-600 font-bold flex items-center gap-1">✓ Copied to clipboard!</span>}
            </div>
            <div className="relative">
              <textarea
                readOnly
                rows={5}
                value={embedSnippet}
                className="w-full bg-slate-900 text-slate-100 font-mono text-[11px] p-3 rounded-xl border border-slate-800 focus:outline-none resize-none selection:bg-blue-600"
              />
            </div>
          </div>

          {/* Attribution Note */}
          <div className="p-3 bg-blue-50 border border-blue-200/60 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
            <span className="font-bold shrink-0">ℹ️ Note:</span>
            <span>
              The embed snippet includes a non-intrusive attribution link back to the full calculator tool. This keeps the widget 100% free and supports ongoing updates.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1"
          >
            Preview Embed View <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

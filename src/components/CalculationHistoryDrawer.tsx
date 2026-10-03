import React, { useState, useEffect } from 'react';
import { X, Trash2, Clock, Calculator, ArrowRight } from 'lucide-react';
import { CalculationHistoryItem } from '../types/calculator';
import { getCalculationHistory, clearCalculationHistory } from '../utils/history';

interface CalculationHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const CalculationHistoryDrawer: React.FC<CalculationHistoryDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  const loadHistory = () => {
    setHistory(getCalculationHistory());
  };

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
    const handler = () => loadHistory();
    window.addEventListener('calc-history-updated', handler);
    return () => window.removeEventListener('calc-history-updated', handler);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" />
            <h2 className="text-base font-semibold text-slate-900">Recent Calculations</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Calculator className="w-10 h-10 mb-2 stroke-1 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No calculations recorded yet</p>
              <p className="text-xs mt-1">Calculations performed on any tool will automatically appear here for easy reference.</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-200 bg-slate-50/60 hover:bg-blue-50/30 transition-all text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between font-semibold text-slate-900">
                  <span>{item.calculatorName}</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-slate-600">
                  <span className="text-slate-400">Inputs: </span>
                  {item.inputSummary}
                </div>
                <div className="text-blue-900 font-mono font-medium bg-blue-50/80 p-1.5 rounded text-[11px] truncate">
                  {item.resultSummary}
                </div>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate(`/calculators/${item.calculatorId}`);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-[11px]"
                  >
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {history.length > 0 && (
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Stored locally in your browser</span>
            <button
              type="button"
              onClick={clearCalculationHistory}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import { CalculationHistoryItem } from '../types/calculator';

const STORAGE_KEY = 'calc_hub_history_v1';
const MAX_HISTORY = 20;

export function getCalculationHistory(): CalculationHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCalculationHistory(item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) {
  if (typeof window === 'undefined') return;
  try {
    const current = getCalculationHistory();
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now()
    };
    const updated = [newItem, ...current.filter(c => c.calculatorId !== item.calculatorId || c.inputSummary !== item.inputSummary)].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('calc-history-updated'));
  } catch {
    // Fail silently in private/sandboxed storage
  }
}

export function clearCalculationHistory() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('calc-history-updated'));
  } catch {
    //
  }
}

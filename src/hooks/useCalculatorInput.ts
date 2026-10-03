import { useState, useCallback } from 'react';

export function useCalculatorInput<T extends Record<string, string>>(
  initialValues: T,
  fieldOrder?: (keyof T)[]
) {
  const [values, setValues] = useState<T>(initialValues);
  const keys = fieldOrder || (Object.keys(initialValues) as (keyof T)[]);
  const [activeField, setActiveField] = useState<keyof T>(keys[0]);

  const handleDigit = useCallback((digit: string) => {
    setValues((prev) => {
      const current = prev[activeField] || '';
      // If current is '0' and typing a non-zero digit, replace '0'
      if (current === '0' && digit !== '.') {
        return { ...prev, [activeField]: digit };
      }
      // Max length limit to prevent irrational overflow
      if (current.length >= 15) return prev;
      return { ...prev, [activeField]: current + digit };
    });
  }, [activeField]);

  const handleDecimal = useCallback(() => {
    setValues((prev) => {
      const current = prev[activeField] || '';
      if (current.includes('.')) return prev;
      return { ...prev, [activeField]: current ? `${current}.` : '0.' };
    });
  }, [activeField]);

  const handleBackspace = useCallback(() => {
    setValues((prev) => {
      const current = prev[activeField] || '';
      if (!current || current.length <= 1) {
        return { ...prev, [activeField]: '' };
      }
      return { ...prev, [activeField]: current.slice(0, -1) };
    });
  }, [activeField]);

  const handleClear = useCallback(() => {
    setValues((prev) => ({ ...prev, [activeField]: '' }));
  }, [activeField]);

  const handleClearAll = useCallback(() => {
    setValues(initialValues);
    setActiveField(keys[0]);
  }, [initialValues, keys]);

  const handleToggleSign = useCallback(() => {
    setValues((prev) => {
      const current = prev[activeField] || '';
      if (!current || current === '0') return prev;
      if (current.startsWith('-')) {
        return { ...prev, [activeField]: current.substring(1) };
      }
      return { ...prev, [activeField]: `-${current}` };
    });
  }, [activeField]);

  const handleNextField = useCallback(() => {
    const currentIndex = keys.indexOf(activeField);
    const nextIndex = (currentIndex + 1) % keys.length;
    setActiveField(keys[nextIndex]);
  }, [activeField, keys]);

  const setFieldValue = useCallback((field: keyof T, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
  }, []);

  return {
    values,
    activeField,
    setActiveField,
    handleDigit,
    handleDecimal,
    handleBackspace,
    handleClear,
    handleClearAll,
    handleToggleSign,
    handleNextField,
    setFieldValue
  };
}

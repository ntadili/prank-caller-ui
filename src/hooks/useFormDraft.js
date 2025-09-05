// hooks/useFormDraft.js
import { useEffect, useState } from "react";

export function useFormDraft(key, initialValue) {
  const [formData, setFormData] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(formData));
  }, [key, formData]);

  const clearDraft = () => localStorage.removeItem(key);

  return [formData, setFormData, clearDraft];
}

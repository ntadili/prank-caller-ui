import { useEffect, useCallback } from 'react';

const FORM_STORAGE_KEY = 'prankie_form_data';
const FORM_SESSION_KEY = 'prankie_form_session';

export const useFormPersistence = () => {
  // Save form data to localStorage
  const saveFormData = useCallback((formData) => {
    try {
      const dataToSave = {
        ...formData,
        timestamp: Date.now(),
        sessionId: getSessionId()
      };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
      console.log('Form data saved to localStorage:', dataToSave);
    } catch (error) {
      console.warn('Failed to save form data:', error);
    }
  }, []);

  // Load form data from localStorage
  const loadFormData = useCallback(() => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Check if this is the same session
        const currentSessionId = getSessionId();
        if (parsedData.sessionId && parsedData.sessionId !== currentSessionId) {
          // Different session - clear old data
          clearFormData();
          return null;
        }
        
        // Check if data is not too old (24 hours max)
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - parsedData.timestamp > maxAge) {
          clearFormData();
          return null;
        }
        
        // Remove metadata before returning
        const { timestamp, sessionId, ...formData } = parsedData;
        console.log('Form data loaded from localStorage:', formData);
        return formData;
      }
    } catch (error) {
      console.warn('Failed to load form data:', error);
      clearFormData(); // Clear corrupted data
    }
    return null;
  }, []);

  // Clear form data from localStorage
  const clearFormData = useCallback(() => {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY);
      sessionStorage.removeItem(FORM_SESSION_KEY);
      console.log('Form data cleared from storage');
    } catch (error) {
      console.warn('Failed to clear form data:', error);
    }
  }, []);

  // Get or create session ID
  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem(FORM_SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(FORM_SESSION_KEY, sessionId);
    }
    return sessionId;
  }, []);

  // Set up cleanup on tab/window close
  useEffect(() => {
    // Only clear data when the component unmounts (not on page navigation)
    return () => {
      // This cleanup runs when the component is unmounted
      // We don't clear form data here to allow persistence across navigation
    };
  }, []);

  return {
    saveFormData,
    loadFormData,
    clearFormData
  };
};
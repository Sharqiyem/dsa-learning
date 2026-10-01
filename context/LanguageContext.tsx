'use client';

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react';
import { Language, TRANSLATIONS, Translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getClientSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('stacklab-language');
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    // ignore
  }
  return 'en';
}

function getServerSnapshot(): Language {
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = useCallback((newLang: Language) => {
    try {
      localStorage.setItem('stacklab-language', newLang);
    } catch (e) {
      // ignore
    }
    emitChange();
  }, []);

  const toggleLanguage = useCallback(() => {
    const next: Language = language === 'en' ? 'ar' : 'en';
    try {
      localStorage.setItem('stacklab-language', next);
    } catch (e) {
      // ignore
    }
    emitChange();
  }, [language]);

  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

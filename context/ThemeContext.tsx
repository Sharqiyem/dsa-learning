'use client';

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Listeners for theme changes
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  
  let mql: MediaQueryList | null = null;
  const onMqlChange = () => {
    emitChange();
  };

  if (typeof window !== 'undefined' && window.matchMedia) {
    mql = window.matchMedia('(prefers-color-scheme: light)');
    mql.addEventListener('change', onMqlChange);
  }

  return () => {
    listeners.delete(callback);
    if (mql) {
      mql.removeEventListener('change', onMqlChange);
    }
  };
}

function getClientSnapshot(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem('stacklab-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch (e) {
    // ignore security/storage errors
  }
  return 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem('stacklab-theme', newTheme);
    } catch (e) {
      // ignore
    }
    emitChange();
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('stacklab-theme', next);
    } catch (e) {
      // ignore
    }
    emitChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

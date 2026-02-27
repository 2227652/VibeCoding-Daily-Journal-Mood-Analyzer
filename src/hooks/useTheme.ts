import { useState, useEffect, useCallback } from 'react';

function getInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem('journal-theme');
    if (stored !== null) return stored === 'dark';
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  try { localStorage.setItem('journal-theme', isDark ? 'dark' : 'light'); } catch {}
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const initial = getInitialTheme();
    if (typeof document !== 'undefined') applyTheme(initial);
    return initial;
  });

  useEffect(() => { applyTheme(isDark); }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((p) => !p), []);

  return { isDark, toggleTheme };
}

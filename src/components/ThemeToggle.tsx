'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className="flex min-w-36 items-center justify-center gap-3 rounded-sm border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-dark-elements dark:text-white"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      disabled={!mounted}
    >
      {isDark ? (
        <SunIcon aria-hidden="true" className="h-5 w-5" />
      ) : (
        <MoonIcon aria-hidden="true" className="h-5 w-5" />
      )}
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-w-36" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="flex min-w-36 items-center justify-center gap-3 rounded-sm border border-black/5 bg-white px-6 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-text/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:border-white/10 dark:bg-dark-elements dark:text-white dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-dark-bg"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
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

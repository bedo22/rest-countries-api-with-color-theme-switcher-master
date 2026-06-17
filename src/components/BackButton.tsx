'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length <= 1) {
      router.push('/');
      return;
    }

    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to all countries"
      className="mb-8 inline-flex items-center gap-3 rounded-sm border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-text/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:border-white/10 dark:bg-dark-elements dark:text-white dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-dark-bg"
    >
      <ArrowLeftIcon aria-hidden="true" className="h-5 w-5" />
      Back
    </button>
  );
}

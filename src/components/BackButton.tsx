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
      className="mb-8 inline-flex items-center gap-3 rounded-sm border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-dark-elements dark:text-white"
    >
      <ArrowLeftIcon aria-hidden="true" className="h-5 w-5" />
      Back
    </button>
  );
}

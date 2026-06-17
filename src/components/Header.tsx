import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-black/5 bg-light-bg shadow-sm dark:border-white/10 dark:bg-dark-bg">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-8 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-[0.05em] text-light-text dark:text-white sm:text-2xl"
        >
          Where in the world?
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

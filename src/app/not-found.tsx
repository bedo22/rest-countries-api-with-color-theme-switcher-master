import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-screen-xl flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-12">
      <h1 className="mb-4 text-3xl font-extrabold text-light-text dark:text-white md:text-4xl">Country not found</h1>
      <p className="mb-8 text-base font-semibold text-light-input dark:text-white/70">
        The country you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-sm border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-dark-elements dark:text-white"
      >
        Back home
      </Link>
    </main>
  );
}

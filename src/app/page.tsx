import { Suspense } from 'react';
import data from '@/data/data.json';
import { CountryGrid } from '@/components/CountryGrid';
import type { Country } from '@/lib/types';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-screen-xl px-6 py-12 sm:px-8 lg:px-12">
      <h1 className="sr-only">Explore countries around the world</h1>
      <Suspense fallback={null}>
        <CountryGrid countries={data as Country[]} />
      </Suspense>
    </main>
  );
}

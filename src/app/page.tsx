import { Suspense } from 'react';
import data from '@/data/data.json';
import { CountryGrid } from '@/components/CountryGrid';
import type { Country } from '@/lib/types';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <CountryGrid countries={data as Country[]} />
    </Suspense>
  );
}

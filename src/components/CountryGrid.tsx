'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Country } from '@/lib/types';
import { filterCountries, isRegionFilter } from '@/lib/countries';
import { type RegionFilter } from '@/lib/regions';
import { CountryCard } from '@/components/CountryCard';
import { FilterBar } from '@/components/FilterBar';

const PAGE_SIZE = 24;

interface CountryGridProps {
  countries: Country[];
}

export function CountryGrid({ countries }: CountryGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const [region, setRegion] = useState<RegionFilter>(() => {
    const param = searchParams.get('region');
    if (param && isRegionFilter(param)) {
      return param;
    }
    return 'All';
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '');
    const param = searchParams.get('region');
    if (param && isRegionFilter(param)) {
      setRegion(param);
    } else {
      setRegion('All');
    }
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, region]);

  const filteredCountries = useMemo(
    () => filterCountries(countries, { query, region }),
    [countries, query, region],
  );

  const visibleCountries = useMemo(
    () => filteredCountries.slice(0, visibleCount),
    [filteredCountries, visibleCount],
  );

  const hasMore = visibleCount < filteredCountries.length;

  const updateQuery = (value: string) => {
    const nextQuery = value.trim();
    setQuery(nextQuery);

    const params = new URLSearchParams(searchParams.toString());
    if (nextQuery) {
      params.set('query', nextQuery);
    } else {
      params.delete('query');
    }

    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  const updateRegion = (value: string) => {
    const nextRegion = isRegionFilter(value) ? value : 'All';
    setRegion(nextRegion);

    const params = new URLSearchParams(searchParams.toString());
    if (nextRegion !== 'All') {
      params.set('region', nextRegion);
    } else {
      params.delete('region');
    }

    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <FilterBar query={query} region={region} onQueryChange={updateQuery} onRegionChange={updateRegion} />

      {filteredCountries.length > 0 ? (
        <>
          <div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {visibleCountries.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </div>

          {hasMore ? (
            <div className="mt-12 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-sm border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-text/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:border-white/10 dark:bg-dark-elements dark:text-white dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-dark-bg"
              >
                Load more
              </button>
              <p className="text-xs text-light-text/60 dark:text-white/60">
                Showing {visibleCountries.length} of {filteredCountries.length}
              </p>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-sm border border-black/10 bg-white p-8 text-center text-sm font-semibold text-light-text shadow-card dark:border-white/10 dark:bg-dark-elements dark:text-white">
          Sorry, no countries match your search.
        </div>
      )}
    </>
  );
}

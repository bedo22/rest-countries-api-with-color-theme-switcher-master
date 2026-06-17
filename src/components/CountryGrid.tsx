'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Country } from '@/lib/types';
import { filterCountries, isRegionFilter } from '@/lib/countries';
import { REGIONS, type RegionFilter } from '@/lib/regions';
import { CountryCard } from '@/components/CountryCard';
import { FilterBar } from '@/components/FilterBar';

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

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '');
    const param = searchParams.get('region');
    if (param && isRegionFilter(param)) {
      setRegion(param);
    } else {
      setRegion('All');
    }
  }, [searchParams]);

  const filteredCountries = useMemo(
    () => filterCountries(countries, { query, region }),
    [countries, query, region],
  );

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
    <main className="mx-auto max-w-screen-xl px-6 py-12 sm:px-8 lg:px-12">
      <FilterBar query={query} region={region} onQueryChange={updateQuery} onRegionChange={updateRegion} />

      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCountries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-black/10 bg-white p-8 text-center text-sm font-semibold text-light-text shadow-card dark:border-white/10 dark:bg-dark-elements dark:text-white">
          Sorry, no countries match your search.
        </div>
      )}
    </main>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Country } from '@/lib/types';
import { formatPopulation } from '@/lib/countries';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/country/${country.alpha3Code}`}
      className="block overflow-hidden rounded-sm bg-white shadow-card transition hover:-translate-y-1 hover:shadow-2xl dark:bg-dark-elements"
    >
      <div className="aspect-[3/2] overflow-hidden bg-light-input">
        <Image
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
          width={320}
          height={200}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="px-6 py-5">
        <h2 className="mb-4 text-xl font-extrabold text-light-text dark:text-white">{country.name}</h2>

        <dl className="space-y-2 text-sm text-light-text dark:text-white">
          <div>
            <dt className="inline font-semibold">Population:</dt>
            <dd className="inline ml-2">{formatPopulation(country.population)}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Region:</dt>
            <dd className="inline ml-2">{country.region}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Capital:</dt>
            <dd className="inline ml-2">{country.capital ?? 'N/A'}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

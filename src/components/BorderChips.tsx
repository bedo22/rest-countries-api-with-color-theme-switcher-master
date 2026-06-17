import Link from 'next/link';
import type { Country } from '@/lib/types';

interface BorderChipsProps {
  borderCountries: Country[];
}

export function BorderChips({ borderCountries }: BorderChipsProps) {
  return (
    <div>
      <h3 className="mb-4 text-base font-extrabold text-light-text dark:text-white">Border Countries:</h3>

      {borderCountries.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {borderCountries.map((country) => (
            <Link
              key={country.alpha3Code}
              href={`/country/${country.alpha3Code}`}
              className="rounded-sm border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-light-text shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-dark-elements dark:text-white"
            >
              {country.name}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold text-light-input dark:text-white/70">No border countries.</p>
      )}
    </div>
  );
}

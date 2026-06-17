import Image from 'next/image';
import type { Country } from '@/lib/types';
import { BorderChips } from '@/components/BorderChips';
import { formatList, formatPopulation, getCurrencies, getLanguages } from '@/lib/countries';

interface CountryDetailProps {
  country: Country;
  borderCountries: Country[];
}

export function CountryDetail({ country, borderCountries }: CountryDetailProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <div className="overflow-hidden rounded-sm bg-light-input shadow-card dark:bg-dark-elements">
        <Image
          src={country.flags.png}
          alt={`Flag of ${country.name}`}
          width={640}
          height={400}
          className="h-auto w-full object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div>
        <div className="mb-4">
          <h1 className="mb-2 text-3xl font-extrabold text-light-text dark:text-white md:text-4xl">{country.name}</h1>
          <p className="text-base font-semibold text-light-text dark:text-white">
            <span className="font-semibold">Native Name:</span> {country.nativeName}
          </p>
        </div>

        <dl className="grid gap-5 md:grid-cols-2">
          <DetailItem label="Population" value={formatPopulation(country.population)} />
          <DetailItem label="Region" value={country.region} />
          <DetailItem label="Sub Region" value={country.subregion ?? 'N/A'} />
          <DetailItem label="Capital" value={country.capital ?? 'N/A'} />
          <DetailItem label="Top Level Domain" value={formatList(country.topLevelDomain)} />
          <DetailItem label="Currencies" value={formatList(getCurrencies(country))} />
          <DetailItem label="Languages Spoken" value={formatList(getLanguages(country))} />
        </dl>

        <div className="mt-6">
          <BorderChips borderCountries={borderCountries} />
        </div>
      </div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-light-text dark:text-white">{label}:</dt>
      <dd className="mt-1 text-base text-light-text dark:text-white">{value}</dd>
    </div>
  );
}

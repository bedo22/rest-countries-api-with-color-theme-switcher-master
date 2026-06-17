import { notFound } from 'next/navigation';
import data from '@/data/data.json';
import { BackButton } from '@/components/BackButton';
import { CountryDetail } from '@/components/CountryDetail';
import { getBorderCountries, getCountryByAlpha3Code } from '@/lib/countries';
import type { Country } from '@/lib/types';

interface CountryPageProps {
  params: Promise<{
    alpha3Code: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { alpha3Code } = await params;
  const countries = data as Country[];
  const country = getCountryByAlpha3Code(countries, alpha3Code);

  if (!country) {
    notFound();
  }

  const borderCountries = getBorderCountries(countries, country.borders ?? []);

  return (
    <main className="mx-auto max-w-screen-xl px-6 py-10 sm:px-8 lg:px-12">
      <BackButton />
      <CountryDetail country={country} borderCountries={borderCountries} />
    </main>
  );
}

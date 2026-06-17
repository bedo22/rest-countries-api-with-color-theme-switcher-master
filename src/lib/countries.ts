import type { Country } from './types';
import { REGIONS, type RegionFilter } from './regions';

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function formatPopulation(population: number): string {
  return new Intl.NumberFormat('en-GB').format(population);
}

export function formatList(values: readonly string[]): string {
  return values.filter(Boolean).join(', ');
}

export function getCountryByAlpha3Code(
  countries: readonly Country[],
  alpha3Code: string,
): Country | undefined {
  return countries.find((country) => country.alpha3Code === alpha3Code);
}

export function getBorderCountries(
  countries: readonly Country[],
  borderCodes: readonly string[] = [],
): Country[] {
  return borderCodes
    .map((code) => getCountryByAlpha3Code(countries, code))
    .filter((country): country is Country => Boolean(country));
}

export function getCurrencies(country: Pick<Country, 'currencies'>): string[] {
  return country.currencies.map((currency) => currency.name);
}

export function getLanguages(country: Pick<Country, 'languages'>): string[] {
  return country.languages.map((language) => language.name);
}

export function isRegionFilter(value: string): value is RegionFilter {
  return (REGIONS as readonly string[]).includes(value);
}

export function filterCountries(
  countries: readonly Country[],
  options: { query: string; region: RegionFilter },
): Country[] {
  const normalizedQuery = normalizeText(options.query.trim());

  return countries
    .filter((country) => {
      const matchesRegion = options.region === 'All' || country.region === options.region;

      if (!matchesRegion) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        country.name,
        country.nativeName,
        ...(country.altSpellings ?? []),
      ]
        .map(normalizeText)
        .join(' ');

      return searchableText.includes(normalizedQuery);
    })
    .toSorted((a, b) => a.name.localeCompare(b.name));
}

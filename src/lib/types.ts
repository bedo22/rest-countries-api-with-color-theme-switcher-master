export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string | null;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Flags {
  svg: string;
  png: string;
}

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string | null;
  altSpellings?: string[];
  subregion: string | null;
  region: string;
  population: number;
  latlng?: number[];
  demonym: string | null;
  area: number | null;
  timezones: string[];
  borders?: string[];
  nativeName: string;
  numericCode: string;
  flags: Flags;
  currencies: Currency[];
  languages: Language[];
  translations?: Record<string, string>;
  flag?: string;
  regionalBlocs?: Array<{
    acronym: string;
    name: string;
  }>;
  cioc?: string;
  independent?: boolean;
}

'use client';

import { REGIONS } from '@/lib/regions';

interface FilterBarProps {
  query: string;
  region: string;
  onQueryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function FilterBar({ query, region, onQueryChange, onRegionChange }: FilterBarProps) {
  return (
    <div     className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative flex-1">
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for a country..."
          className="w-full rounded-sm border border-black/10 bg-white px-6 py-4 pr-12 text-sm font-semibold text-light-text shadow-card outline-none placeholder:text-light-input focus:border-light-text/30 dark:border-white/10 dark:bg-dark-elements dark:text-white dark:placeholder:text-light-input dark:focus:border-white/30"
        />
      </div>

      <select
        value={region}
        onChange={(event) => onRegionChange(event.target.value)}
        className="rounded-sm border border-black/10 bg-white px-6 py-4 text-sm font-semibold text-light-text shadow-card outline-none focus:border-light-text/30 dark:border-white/10 dark:bg-dark-elements dark:text-white dark:focus:border-white/30"
      >
        {REGIONS.map((regionOption) => (
          <option key={regionOption} value={regionOption}>
            {regionOption === 'All' ? 'Filter by Region' : regionOption}
          </option>
        ))}
      </select>
    </div>
  );
}

export const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

export type RegionFilter = (typeof REGIONS)[number];

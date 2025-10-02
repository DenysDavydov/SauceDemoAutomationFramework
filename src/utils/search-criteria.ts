export type SearchBy = Record<string, string | boolean | number>;
export type SearchCriteria = { selector?: string } & SearchBy;
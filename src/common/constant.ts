export const VALID_STATUSES = ['active', 'pending', 'spam', 'deleted'] as const;
export type PhraseStatus = typeof VALID_STATUSES[number];
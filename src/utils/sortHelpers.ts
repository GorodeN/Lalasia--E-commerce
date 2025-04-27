export type SortOrder = 'asc' | 'desc' | null;

export const getNextSortOrder = (current: SortOrder): SortOrder => {
  if (current === 'asc') return 'desc';
  if (current === 'desc') return null;
  return 'asc';
};

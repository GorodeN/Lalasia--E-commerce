export type ParsedSearchParams = {
  searchQuery: string;
  filters: string[];
  page: number;
  sortOrder: 'asc' | 'desc' | null;
};

export const parseSearchParams = (params: URLSearchParams): ParsedSearchParams => {
  const searchQuery = params.get('search') || '';
  const filters = params.get('filters')?.split(',').filter(Boolean) || [];
  const page = params.get('page') ? parseInt(params.get('page')!, 10) : 1;
  const sortParam = params.get('sort');
  const sortOrder = sortParam === '-price' ? 'asc' : sortParam === 'price' ? 'desc' : null;

  return { searchQuery, filters, page, sortOrder };
};

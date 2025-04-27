import { useEffect } from 'react';
import { reaction, runInAction } from 'mobx';
import { useSearchParams } from 'react-router-dom';
import type { ProductListStore } from 'store/ProductListStore';
import { parseSearchParams } from 'utils/parseSearchParams';

export const useSyncSearchParams = (productListStore: ProductListStore) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const { searchQuery, filters, page, sortOrder } = parseSearchParams(searchParams);

    runInAction(() => {
      productListStore.setSearchQuery(searchQuery);
      productListStore.setSelectedFilters(filters);
      productListStore.setCurrentPage(page);
      if (productListStore.sortOrder !== sortOrder) {
        productListStore.setSortOrder(sortOrder, false);
      }
    });

    productListStore.loadProducts();
  }, [searchParams, productListStore]);

  useEffect(() => {
    const dispose = reaction(
      () => ({
        search: productListStore.searchQuery,
        filters: productListStore.selectedFilters,
        page: productListStore.currentPage,
        sort: productListStore.sortOrder,
      }),
      ({ search, filters, page, sort }) => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (filters.length) params.set('filters', filters.join(','));
        if (page !== 1) params.set('page', page.toString());
        if (sort === 'asc') params.set('sort', '-price');
        if (sort === 'desc') params.set('sort', 'price');

        if (params.toString() !== searchParams.toString()) {
          setSearchParams(params);
        }
      },
      { fireImmediately: false }
    );

    return dispose;
  }, [productListStore, searchParams, setSearchParams]);
};

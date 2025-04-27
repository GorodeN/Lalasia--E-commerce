import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { useSyncSearchParams } from 'hooks/useSyncSearchParams';
import { useLocalStore } from 'hooks/useLocalStore';
import Pagination from 'components/Pagination';
import ErrorPlaceholder from 'components/ErrorPlaceholder';
import styles from './Home.module.scss';

import { ProductListStore } from 'store/ProductListStore';
import { categoryStore } from 'store/CategoryStore';
import { getNextSortOrder } from 'utils/sortHelpers';

import HomeHead from './components/HomeHead';
import HomeToolbar from './components/HomeToolbar';
import HomeGrid from './components/HomeGrid';

import HomeGridSkeleton from './components/HomeGridSkeleton';

const Home: React.FC = observer(() => {
  const productListStore = useLocalStore(() => new ProductListStore());

  useSyncSearchParams(productListStore);

  useEffect(() => {
    categoryStore.loadCategoriesBasic();
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      productListStore.setSearchQuery(query);
    },
    [productListStore],
  );

  const handleToggleSort = useCallback(() => {
    runInAction(() => {
      const currentSortOrder = productListStore.sortOrder;
      const newOrder = getNextSortOrder(currentSortOrder);
      productListStore.setSortOrder(newOrder, true);
    });
  }, [productListStore]);

  const handleFilterChange = useCallback(
    (filters: string[]) => {
      productListStore.setSelectedFilters(filters);
    },
    [productListStore],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      productListStore.setCurrentPage(page);
    },
    [productListStore],
  );

  const { loading, error, statusCode, products, totalPages, totalProducts } = productListStore;

  if (error) {
    return (
      <ErrorPlaceholder code={statusCode || 500} message={error} onRetry={() => productListStore.loadProducts()} />
    );
  }

  return (
    <div className={styles.home}>
      <div className={styles.home__head}>
        <HomeHead />

        <HomeToolbar
          defaultSearchValue={productListStore.searchQuery}
          onSearch={handleSearch}
          filters={productListStore.selectedFilters}
          onFilterChange={handleFilterChange}
          total={totalProducts}
          categories={categoryStore.categories}
          sortOrder={productListStore.sortOrder}
          onToggleSort={handleToggleSort}
        />
      </div>

      {loading ? <HomeGridSkeleton /> : <HomeGrid products={products} />}

      <Pagination currentPage={productListStore.currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
});

export default Home;

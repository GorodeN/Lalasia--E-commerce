import React from 'react';
import HomeSearch from './HomeSearch';
import HomeTotal from './HomeTotal';
import HomeFilter from './HomeFilter';
import HomeSort from './HomeSort';
import type { Category } from 'types/Category';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  defaultSearchValue: string;
  onSearch: (searchValue: string) => void;
  total: number;
  filters: string[];
  onFilterChange: (filters: string[]) => void;
  categories: Category[];
  sortOrder: 'asc' | 'desc' | null;
  onToggleSort: () => void;
}

const HomeToolbar: React.FC<Props> = ({
  defaultSearchValue,
  onSearch,
  total,
  filters,
  onFilterChange,
  categories,
  sortOrder,
  onToggleSort,
}) => (
  <div className={styles.home__toolbar}>
    <HomeSearch defaultValue={defaultSearchValue} onSearch={onSearch} />
    <div className={styles['home__toolbar-left']}>
      <HomeTotal count={total} />
    </div>
    <div className={`${styles['home__toolbar-right']}`}>
      <HomeSort sortOrder={sortOrder} onToggleSort={onToggleSort} />
      <HomeFilter categories={categories} selectedFilters={filters} onFilterChange={onFilterChange} />
    </div>
  </div>
);

export default React.memo(HomeToolbar);

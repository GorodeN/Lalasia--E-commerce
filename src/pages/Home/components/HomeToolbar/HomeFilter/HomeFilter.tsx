import React from 'react';
import { observer } from 'mobx-react-lite';
import MultiDropdown from 'components/MultiDropdown';
import type { Category } from 'types/Category';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  categories: Category[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const HomeFilter: React.FC<Props> = observer(({ categories, selectedFilters, onFilterChange }) => {
  return (
    <div className={styles.home__filter}>
      <MultiDropdown
        options={categories.map((c) => ({ key: c.documentId, value: c.title }))}
        value={selectedFilters.map((f) => {
          const category = categories.find((c) => c.title === f);
          return category ? { key: category.documentId, value: category.title } : { key: f, value: f };
        })}
        onChange={(options) => onFilterChange(options.map((o) => o.value))}
        getTitle={(values) =>
          values.length > 0 ? values.map((v) => v.value).join(', ') : 'Filter by Categories'
        }
      />
    </div>
  );
});

export default React.memo(HomeFilter);

import React from 'react';
import { observer } from 'mobx-react-lite';
import Card from 'components/Card';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';
import type { Category } from 'types/Category';
import styles from 'pages/Categories/Categories.module.scss';

export type CategoriesGridProps = {
  categories: Category[];
};

const CategoriesGrid: React.FC<CategoriesGridProps> = observer(({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.categories__grid}>
      {categories.map((category) => {
        const categoryId = category.id;
        const categoryTitle = category.title;
        const categoryIimage = category.image?.url || undefined;

        return (
        <Card
          key={categoryId}
          image={categoryIimage}
          title={categoryTitle}
          subtitle=""
          contentSlot=""
          actionSlot={null}
          onClick={() => {
            navigate(routes.main.create() + `?filters=${categoryTitle}`);
          }}
        />
      )})}
    </div>
  );
});

export default React.memo(CategoriesGrid);

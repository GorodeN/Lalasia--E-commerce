import React from 'react';
import SortIcon from 'components/icons/SortIcon/SortIcon';
import Text from 'components/Text';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  sortOrder: 'asc' | 'desc' | null;
  onToggleSort: () => void;
}

const HomeSort: React.FC<Props> = ({ sortOrder, onToggleSort }) => {
  return (
    <div className={styles.home__sort} onClick={onToggleSort}>
      <SortIcon
        sortOrder={sortOrder}
        style={{
          marginRight: '5px',
          transform: sortOrder === 'asc' ? 'scaleY(-1)' : 'none',
        }}
      />
      <Text className={styles['home__sort-price']}>Sort&nbsp;by&nbsp;Price</Text>
    </div>
  );
};

export default React.memo(HomeSort);

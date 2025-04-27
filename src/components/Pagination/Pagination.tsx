import React from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__arrow}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <ArrowRightIcon
          className={styles.pagination__arrowIcon}
          style={{ transform: 'scaleX(-1)' }}
          width={35}
          height={35}
          color='secondary'
        />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          className={classNames(styles.pagination__button, {
            [styles['pagination__button--active']]: page === currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        className={styles.pagination__arrow}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <ArrowRightIcon
          className={styles.pagination__arrowIcon}
          width={35}
          height={35}
          color='secondary'
        />
      </Button>
    </div>
  );
};

export default React.memo(Pagination);

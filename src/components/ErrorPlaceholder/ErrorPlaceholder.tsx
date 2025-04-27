import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './ErrorPlaceholder.module.scss';

export type ErrorPlaceholderProps = {
  code?: number;
  message?: string;
  onRetry?: () => void;
};

const ErrorPlaceholder: React.FC<ErrorPlaceholderProps> = ({ code = 500, message = 'Something went wrong', onRetry }) => {
  return (
    <div className={styles.placeholder}>
      <Text view="title" tag="h1" weight="bold">
        {code === 404 ? '#404 Not Found' : `Error #${code}`}
      </Text>
      <Text view="p-20" color="secondary" style={{ margin: '16px 0' }}>
        {message}
      </Text>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
};

export default React.memo(ErrorPlaceholder);

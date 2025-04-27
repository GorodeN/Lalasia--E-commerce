import React, { useState, useEffect } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Home/Home.module.scss';

interface Props {
  defaultValue?: string;
  onSearch: (val: string) => void;
}

const HomeSearch: React.FC<Props> = ({ defaultValue = '', onSearch }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== defaultValue) {
      onSearch(trimmedValue);
    }
  };

  return (
    <div className={styles.home__search}>
      <Input
        className={styles['home__search-input']}
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Search product"
      />
      <Button className={styles['home__search-button']} onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};

export default React.memo(HomeSearch);

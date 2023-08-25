import { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import reportWebVitals from 'reportWebVitals';

import { Button } from 'components/parts/Button';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Home.module.scss';

export const Home: FC = () => {
  const navigate = useNavigate();

  // ページを表示したとき
  useEffect(() => {
    reportWebVitals(console.log);
  }, []);

  // ページタイトル
  usePageTitle(`button mashing`);

  return (
    <div className={`l-page ${styles.home}`}>
      <h1 className={styles.title}>button mashing</h1>
      <div className={styles.menu}>
        <Button
          handleClick={() => {
            navigate('/play');
          }}
        >
          start
        </Button>
      </div>
    </div>
  );
};

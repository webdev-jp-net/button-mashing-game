import { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import reportWebVitals from 'reportWebVitals';

import { Button } from 'components/parts/Button';
import { updateScore } from 'store/user';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Home.module.scss';

export const Home: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ページを表示したとき
  useEffect(() => {
    dispatch(updateScore(0));
    reportWebVitals(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/* eslint @typescript-eslint/ban-ts-comment: 0 */
import { FC, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'components/parts/Button';
import { RootState } from 'store';
import { updateScore } from 'store/user';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Play.module.scss';

export const Play: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { score } = useSelector((state: RootState) => state.user);

  // 残り時間
  const [timeLeft, setTimeLeft] = useState<number>(60);

  // カウントダウンの処理
  useEffect(() => {
    let timerID: NodeJS.Timeout | undefined;
    if (timeLeft > 0) {
      timerID = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timerID!);
      // リザルト画面への遷移等の処理
    }
    return () => {
      clearInterval(timerID!);
    };
  }, [timeLeft]);

  // スコアを加算
  const handleMashing = () => {
    dispatch(updateScore(score + 1));
  };

  // ページタイトル
  usePageTitle(`button mashing ... playing`);

  return (
    <div className={`l-page ${styles.play}`}>
      {timeLeft > 0 ? (
        <div className={styles.header}>
          <p className={styles.time}>⏱️ {timeLeft}</p>
          <p className={styles.score}>💥 {score}</p>
          <button type="button" onClick={handleMashing} className={styles.tap}>
            Tap Here!!
          </button>
        </div>
      ) : (
        <>
          <p className={styles.result}>{score}</p>
          <div className={styles.menu}>
            <Button
              handleClick={() => {
                navigate('/');
              }}
            >
              exit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

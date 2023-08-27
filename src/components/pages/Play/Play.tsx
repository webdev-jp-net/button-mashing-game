/* eslint @typescript-eslint/ban-ts-comment: 0 */
import { FC, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'components/parts/Button';
import { GaugeUi } from 'components/parts/GaugeUi';
import { TimeLeftUi } from 'components/parts/TimeLeftUi';
import { RootState } from 'store';
import { updateScore } from 'store/user';

import { usePageTitle } from 'hooks/usePageTitle';

import styles from './Play.module.scss';

export const Play: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { score } = useSelector((state: RootState) => state.user);

  // 残り時間
  const [currentTime, setCurrentTime] = useState<number>(0);
  const limit = 60;

  // カウントダウンの処理
  useEffect(() => {
    let timerID: NodeJS.Timeout | undefined;
    if (currentTime < limit) {
      timerID = setInterval(() => {
        setCurrentTime(currentTime => currentTime + 1);
      }, 1000);
    } else {
      clearInterval(timerID!);
    }
    return () => {
      clearInterval(timerID!);
    };
  }, [currentTime]);

  // スコアを加算
  const handleMashing = () => {
    dispatch(updateScore(score + 1));
  };

  // ページタイトル
  usePageTitle(`button mashing ... playing`);

  return (
    <div className={`l-page ${styles.play}`}>
      <div className={styles.visualizer}>
        <div className={styles.stock}>
          {Array(Math.floor(score / 100))
            .fill(0)
            .map((_, index) => (
              <span key={index} className={styles.stockItem}>
                🍺
              </span>
            ))}
          <GaugeUi
            addClass={[styles.gauge, currentTime >= limit ? styles['--invisible'] : '']}
            currentValue={score % 100}
          />
        </div>
      </div>
      {currentTime < limit ? (
        <div className={styles.header}>
          <TimeLeftUi currentTime={currentTime} />
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

/* eslint @typescript-eslint/ban-ts-comment: 0 */
import { FC, useState } from 'react';

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

  const [tmpValue, setTmpValue] = useState<string>('');

  // テキスト更新
  const updateValue = () => {
    dispatch(updateScore((score || 0) + 1));
  };

  // ページタイトル
  usePageTitle(`subページ`);

  return (
    <div className={`l-page ${styles.sub}`}>
      <div className={styles.menu}>
        <Button
          handleClick={() => {
            navigate('/');
          }}
        >
          HOMEへ移動
        </Button>
      </div>
      <hr />
      <div className={styles.field}>
        <p>文字をinputで書き換えられます</p>
        <p className={styles.preview}>{score}</p>
        <input
          placeholder="更新ボタンで入力した文字が表示されます"
          type="text"
          onInput={e => {
            setTmpValue(e.currentTarget.value);
          }}
        />
        <Button handleClick={updateValue}>更新</Button>
      </div>
    </div>
  );
};

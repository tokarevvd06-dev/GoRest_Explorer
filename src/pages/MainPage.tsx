import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../store/authSlice';
import TokenInput from '../components/TokenInput';
import styles from './MainPage.module.css'

type Mode = 'users' | 'posts';

const modes: Mode[] = ['users', 'posts'];
const modeLabel = (mode: Mode) => (mode === 'users' ? 'Пользователи' : 'Посты');

const MainPage = () => {
  const [tokenValue, setTokenValue] = useState('');
  const [mode, setMode] = useState<Mode>('users');
  const [showError, setShowError] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (tokenValue.trim().length === 0) {
      setShowError(true);
      return;
    }
    
    dispatch(setToken(tokenValue.trim()));
    navigate(`/${mode}`);
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SPA для получения данных от GoRest API</h1>
      
      <TokenInput
        value={tokenValue}
        onChange={(v) => {
          setTokenValue(v);
          if (showError) setShowError(false);
        }}
        hasError={showError}
      />
      
      <div className={styles.modeSwitcher}>
        <ChoiceGroup
          value={mode}
          onChange={(value) => setMode(value)}
          items={modes}
          getItemLabel={modeLabel}
          name="mode"
          multiple={false}
        />
      </div>
      
      <Button
        label="Войти"
        onClick={handleSubmit}
        className={styles.submitButton}
      />
    </div>
  );
};

export default MainPage;
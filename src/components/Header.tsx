// src/components/Header.tsx
import { useAppSelector, useAppDispatch } from '../store/hooks';
import type { RootState } from '../store/store';
import styles from './Header.module.css';

export const Header = () => {
  // Достаем нужные данные из глобального стейта!
  const { energy, maxEnergy, league } = useAppSelector((state: RootState) => state.user);

  return (
    <header className={styles.header}>
      <button className={`${styles.headerItem} ${styles.settingsBtn}`}>⚙️</button>

      <div className={`${styles.headerItem} ${styles.leagueBadge}`}>
        <span className={styles.leagueIcon}>💎</span>
        {/* Подставляем лигу из стора */}
        <span className={styles.leagueText}>{league}</span>
      </div>

      <div className={`${styles.headerItem} ${styles.energyBadge}`}>
        <span className={styles.energyIcon}>⚡</span>
        {/* Подставляем энергию из стора */}
        <span className={styles.energyText}>{energy}/{maxEnergy}</span>
      </div>
    </header>
  );
};

// src/components/Header.tsx
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      
      {/* Кнопка настроек */}
      <button className={`${styles.headerItem} ${styles.settingsBtn}`}>
        ⚙️
      </button>

      {/* Центральная плашка: Лига */}
      <div className={`${styles.headerItem} ${styles.leagueBadge}`}>
        <span className={styles.leagueIcon}>💎</span>
        <span className={styles.leagueText}>Алмазная</span>
      </div>

      {/* Правая плашка: Энергия */}
      <div className={`${styles.headerItem} ${styles.energyBadge}`}>
        <span className={styles.energyIcon}>⚡</span>
        <span className={styles.energyText}>48/50</span>
      </div>

    </header>
  );
};

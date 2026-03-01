// src/components/BottomNav.tsx
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

export const BottomNav = () => {
  const location = useLocation();

  // Функция теперь просто возвращает нужный класс из модуля
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        
        <Link to="/leaderboard" className={getLinkClass('/leaderboard')}>
          <span className={styles.icon}>📊</span>
          <span className={styles.label}>Топ</span>
        </Link>
        
        <Link to="/" className={getLinkClass('/')}>
          <span className={styles.icon}>⚔️</span>
          <span className={styles.label}>Дуэль</span>
        </Link>
        
        <Link to="/profile" className={getLinkClass('/profile')}>
          <span className={styles.icon}>👤</span>
          <span className={styles.label}>Профиль</span>
        </Link>

      </div>
    </nav>
  );
};

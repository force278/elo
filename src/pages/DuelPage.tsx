import { useState } from 'react';
import { Header } from '../components/Header';
import styles from './DuelPage.module.css';


// Моковые данные для дуэли
const MOCK_DUEL = {
  player1: {
    id: 1,
    name: 'Алексей',
    city: 'Москва',
    // Случайное фото мужчины
    photoUrl: 'https://i.pinimg.com/736x/f2/f1/d0/f2f1d0bb87e85fa94a0230583aea9267.jpg',
  },
  player2: {
    id: 2,
    name: 'Дмитрий',
    city: 'Казань',
    // Случайное фото другого мужчины
    photoUrl: 'https://i.pinimg.com/736x/86/51/1c/86511c9c3f10006aac03d69f114a7e5f.jpg',
  },
};

export const DuelPage = () => {
  const [duelData] = useState(MOCK_DUEL);

  return (
    // Используем классы через styles.имяКласса
    <div className={styles.pageContainer}>
      <Header />

      {/* --- Карточка 1 (Верхняя) --- */}
      <div className={styles.card}>
        <img src={duelData.player1.photoUrl} alt="Игрок 1" className={styles.photo} />
        <div className={styles.gradientBottom} />
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player1.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player1.city}</p>
        </div>
      </div>

      {/* --- Слайдер (по центру) --- */}
      <div className={styles.vibeSliderStub}>
        <div className={styles.vibeSliderBody}>
            <span className={`${styles.vibeText} ${styles.vibeBlue}`}>Vibe</span>
            <span className={styles.vsText}>VS</span>
            <span className={`${styles.vibeText} ${styles.vibePurple}`}>Vibe</span>
        </div>
      </div>

      {/* --- Карточка 2 (Нижняя) --- */}
      <div className={styles.card}>
        <img src={duelData.player2.photoUrl} alt="Игрок 2" className={styles.photo} />
        <div className={styles.gradientBottom} />
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player2.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player2.city}</p>
        </div>
      </div>

    </div>
  );
};
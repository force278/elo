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
  const [duelData, setDuelData] = useState(MOCK_DUEL);
  // Состояние: null (еще не голосовали), 1 (выбрали первого), 2 (выбрали второго)
  const [votedFor, setVotedFor] = useState<1 | 2 | null>(null);

  // Функция обработки клика по фото
  const handleVote = (playerNum: 1 | 2) => {
    // Если уже проголосовали - игнорируем клики, ждем смены фото
    if (votedFor !== null) return;

    // Устанавливаем победителя (запускаются CSS анимации)
    setVotedFor(playerNum);

    // Эмулируем задержку сети и загрузку следующей пары
    setTimeout(() => {
      // Здесь в будущем будет запрос к вашему API на Golang
      console.log(`Голос засчитан за игрока ${playerNum}`);
      
      // Сбрасываем состояние (убираем анимации)
      setVotedFor(null);
      
      // Пока просто меняем местами фото для наглядности (чтобы видеть изменения)
      setDuelData(prev => ({
        player1: prev.player2,
        player2: prev.player1
      }));
    }, 1500); // Ждем 1.2 секунды, чтобы пользователь увидел анимацию
  };

  
  return (
    <div className={styles.pageContainer}>
      <Header />

      {/* --- Карточка 1 (Верхняя) --- */}
      <div 
        className={`${styles.card} ${votedFor === 1 ? styles.winner : ''} ${votedFor === 2 ? styles.loser : ''}`}
        onClick={() => handleVote(1)}
      >
        <img src={duelData.player1.photoUrl} alt="Игрок 1" className={styles.photo} />
        <div className={styles.gradientBottom} />
        
        {/* Надпись VIBE (появляется только при победе) */}
        <div className={`${styles.vibeOverlay} ${votedFor === 1 ? styles.showVibe : ''}`}>
          Vibe!
        </div>

        {/* НОВОЕ: Надпись MOGGED (появляется только при поражении) */}
        <div className={`${styles.moggedOverlay} ${votedFor === 2 ? styles.showMogged : ''}`}>
          Mogged
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player1.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player1.city}</p>
        </div>
      </div>

      {/* --- Статический кружок VS --- */}
      <div className={`${styles.vsBadge} ${votedFor !== null ? styles.hidden : ''}`}>
        VS
      </div>

      {/* --- Карточка 2 (Нижняя) --- */}
      <div 
        className={`${styles.card} ${votedFor === 2 ? styles.winner : ''} ${votedFor === 1 ? styles.loser : ''}`}
        onClick={() => handleVote(2)}
      >
        <img src={duelData.player2.photoUrl} alt="Игрок 2" className={styles.photo} />
        <div className={styles.gradientBottom} />
        
        {/* Надпись VIBE */}
        <div className={`${styles.vibeOverlay} ${votedFor === 2 ? styles.showVibe : ''}`}>
          Vibe!
        </div>

        {/* НОВОЕ: Надпись MOGGED (появляется только при поражении) */}
        <div className={`${styles.moggedOverlay} ${votedFor === 1 ? styles.showMogged : ''}`}>
          Mogged
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player2.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player2.city}</p>
        </div>
      </div>

    </div>
  );
};
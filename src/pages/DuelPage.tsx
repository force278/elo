import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import styles from './DuelPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { spendEnergy, voteForPlayer } from '../store/slices/userSlice';
import { ApiService, type DuelResponse } from '../api/mockApi';

export const DuelPage = () => {
  // 1. СТЕЙТ ДЛЯ ДАННЫХ ДУЭЛИ И ЗАГРУЗКИ
  // Изначально null, так как данные еще не пришли с сервера
  const [duelData, setDuelData] = useState<DuelResponse | null>(null);
  const [isLoadingDuel, setIsLoadingDuel] = useState(true);
  const [votedFor, setVotedFor] = useState<1 | 2 | null>(null);

  // 2. ДАННЫЕ ИЗ REDUX (чтобы читать статус отправки голоса)
  const dispatch = useAppDispatch();
  const { energy, status, error } = useAppSelector((state) => state.user);

  // 3. ФУНКЦИЯ ЗАГРУЗКИ НОВОЙ ПАРЫ
  const loadNextDuel = async () => {
    setIsLoadingDuel(true);
    try {
      const data = await ApiService.fetchNextDuel();
      setDuelData(data);
    } catch (err) {
      console.error("Не удалось загрузить фото", err);
    } finally {
      setIsLoadingDuel(false);
      setVotedFor(null); // Сбрасываем анимации
    }
  };

  // 4. ЭФФЕКТ ПРИ ПЕРВОМ РЕНДЕРЕ (Загружаем первую пару при входе)
  useEffect(() => {
    loadNextDuel();
  }, []);

  // 5. ЛОГИКА ГОЛОСОВАНИЯ
  const handleVote = async (playerNum: 1 | 2) => {
    // Защита от двойного клика или клика без энергии
    if (votedFor !== null || !duelData || status === 'loading') return;
    if (energy <= 0) {
      alert('Энергия закончилась!');
      return;
    }

    // Запускаем UI-анимации сразу, не дожидаясь ответа сервера (Оптимистичный UI)
    dispatch(spendEnergy());
    setVotedFor(playerNum);

    // Определяем, кто победил, а кто проиграл
    const winnerId = playerNum === 1 ? duelData.player1.id : duelData.player2.id;
    const loserId = playerNum === 1 ? duelData.player2.id : duelData.player1.id;

    // Ждем, пока отыграют анимации (минимум 1.2 сек), параллельно отправляя запрос
    const animationPromise = new Promise(resolve => setTimeout(resolve, 1200));
    // Отправляем асинхронный экшен (Thunk) в Redux
    const serverPromise = dispatch(voteForPlayer({ winnerId, loserId })).unwrap();

    try {
      // Ждем завершения ОБОИХ процессов (и анимации, и ответа сервера)
      await Promise.all([animationPromise, serverPromise]);
      // Если всё ок, грузим новую пару
      await loadNextDuel();
    } catch (err) {
      // Если сервер выдал ошибку (наши 10%)
      console.error("Ошибка голосования:", err);
      // Сбрасываем анимации и даем возможность проголосовать еще раз
      setVotedFor(null); 
    }
  };

  // 1. ЕСЛИ ЭТО САМАЯ ПЕРВАЯ ЗАГРУЗКА (данных вообще нет)
  if (!duelData) {
    return (
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.loaderContainer} style={{ backgroundColor: '#000' }}>
          <div className={styles.spinner}></div>
          <div className={styles.loaderText}>Ищем соперников...</div>
        </div>
      </div>
    );
  }

  // 2. ОСНОВНОЙ РЕНДЕР (Данные есть)
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      {/* Ошибка сервера */}
      {error && <div className={styles.errorToast}>{error}</div>}

      {/* 
        НОВОЕ: Слой загрузки ПОВЕРХ карточек. 
        Показывается только когда идет смена пары (isLoadingDuel === true) 
      */}
      {isLoadingDuel && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.loaderText}>Загрузка...</div>
        </div>
      )}

      {/* --- Карточка 1 (Верхняя) --- */}
      <div 
        className={`${styles.card} ${votedFor === 1 ? styles.winner : ''} ${votedFor === 2 ? styles.loser : ''}`}
        onClick={() => handleVote(1)}
      >
        <img src={duelData.player1.photoUrl} alt={duelData.player1.name} className={styles.photo} />
        <div className={styles.gradientBottom} />
        <div className={`${styles.vibeOverlay} ${votedFor === 1 ? styles.showVibe : ''}`}>Vibe!</div>
        <div className={`${styles.moggedOverlay} ${votedFor === 2 ? styles.showMogged : ''}`}>Mogged</div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player1.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player1.city}</p>
        </div>
      </div>

      <div className={`${styles.vsBadge} ${votedFor !== null ? styles.hidden : ''}`}>VS</div>

      {/* --- Карточка 2 (Нижняя) --- */}
      <div 
        className={`${styles.card} ${votedFor === 2 ? styles.winner : ''} ${votedFor === 1 ? styles.loser : ''}`}
        onClick={() => handleVote(2)}
      >
        <img src={duelData.player2.photoUrl} alt={duelData.player2.name} className={styles.photo} />
        <div className={styles.gradientBottom} />
        <div className={`${styles.vibeOverlay} ${votedFor === 2 ? styles.showVibe : ''}`}>Vibe!</div>
        <div className={`${styles.moggedOverlay} ${votedFor === 1 ? styles.showMogged : ''}`}>Mogged</div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{duelData.player2.name}</h2>
          <p className={styles.userCity}>📍 {duelData.player2.city}</p>
        </div>
      </div>

    </div>
  );
};
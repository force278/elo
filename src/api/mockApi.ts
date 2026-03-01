// src/api/mockApi.ts

// Опишем структуру ответа от сервера для дуэли
export interface Player {
  id: number;
  name: string;
  city: string;
  photoUrl: string;
}

export interface DuelResponse {
  player1: Player;
  player2: Player;
}

// База данных наших "игроков" на "сервере"
const mockPlayers: Player[] = [
  { id: 1, name: 'Алексей', city: 'Москва', photoUrl: 'https://i.pinimg.com/736x/86/51/1c/86511c9c3f10006aac03d69f114a7e5f.jpg' },
  { id: 2, name: 'Дмитрий', city: 'Казань', photoUrl: 'https://i.pinimg.com/736x/f2/f1/d0/f2f1d0bb87e85fa94a0230583aea9267.jpg' },
  { id: 3, name: 'Егор', city: 'Питер', photoUrl: 'https://i.pinimg.com/1200x/8b/36/4f/8b364f198b6826eba068d63d49b4e804.jpg' },
  { id: 4, name: 'Максим', city: 'Сочи', photoUrl: 'https://i.pinimg.com/736x/fc/45/0f/fc450f56f7eee7c0596923f9e889c79a.jpg' },
];

export const ApiService = {
  // Функция для получения следующей пары (асинхронная!)
  fetchNextDuel: async (): Promise<DuelResponse> => {
    return new Promise((resolve) => {
      // Имитируем задержку сети (800 миллисекунд)
      setTimeout(() => {
        // Берем случайных игроков
        const p1 = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
        let p2 = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
        // Убедимся, что они не одинаковые
        while (p2.id === p1.id) {
          p2 = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
        }
        resolve({ player1: p1, player2: p2 });
      }, 800);
    });
  },

  // Функция для отправки голоса на сервер
  submitVote: async (winnerId: number, loserId: number): Promise<{ success: boolean; eloChange: number }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Имитируем, что сервер иногда "падает" (10% шанс ошибки)
        const isNetworkError = Math.random() < 0.1;
        
        if (isNetworkError) {
          reject(new Error("Ошибка соединения с сервером"));
        } else {
          // Если всё ок, возвращаем успех и сколько ELO заработали
          resolve({ success: true, eloChange: 12 });
        }
      }, 500); // Запрос идет полсекунды
    });
  }
};

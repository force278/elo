// src/store/slices/userSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
// Импортируем наш фейковый API
import { ApiService } from '../../api/mockApi';

interface UserState {
  energy: number;
  maxEnergy: number;
  league: string;
  elo: number;
  // Добавляем новые поля для отслеживания загрузки
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  energy: 50,
  maxEnergy: 50,
  league: 'Алмазная',
  elo: 1850,
  status: 'idle',
  error: null,
};

// СОЗДАЕМ АСИНХРОННЫЙ ЭКШЕН (THUNK)
// Он принимает объект с ID победителя и проигравшего
export const voteForPlayer = createAsyncThunk(
  'user/voteForPlayer', // Имя экшена
  async (voteData: { winnerId: number; loserId: number }, { rejectWithValue }) => {
    try {
      // 1. Отправляем запрос на сервер
      const response = await ApiService.submitVote(voteData.winnerId, voteData.loserId);
      // 2. Если успешно, возвращаем ответ
      return response;
    } catch (err: any) {
      // 3. Если ошибка (наши 10%), возвращаем текст ошибки
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Этот обычный синхронный экшен мы оставляем для UI
    spendEnergy: (state) => {
      if (state.energy > 0) state.energy -= 1;
    },
  },
  // extraReducers слушают асинхронные Thunk'и!
  extraReducers: (builder) => {
    builder
      // Когда запрос только НАЧАЛСЯ
      .addCase(voteForPlayer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Когда запрос завершился УСПЕШНО
      .addCase(voteForPlayer.fulfilled, (state, action) => {
        state.status = 'idle';
        // Увеличиваем ELO пользователя на ту цифру, что вернул сервер (в нашем моке это 12)
        state.elo += action.payload.eloChange; 
      })
      // Когда сервер вернул ОШИБКУ
      .addCase(voteForPlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Сохраняем текст ошибки
      });
  },
});

export const { spendEnergy } = userSlice.actions;
export default userSlice.reducer;

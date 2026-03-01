// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // Подключаем наш слайс
  },
});

// Выводим типы для TypeScript, чтобы он подсказывал нам переменные
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

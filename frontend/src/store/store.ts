// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import candidatesReducer from './features/candidates/candidatesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

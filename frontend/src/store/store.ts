import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import candidatesReducer from './features/candidates/candidatesSlice';
import statisticsReducer from './features/statistics/statisticsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
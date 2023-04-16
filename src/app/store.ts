import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '@/features/layout/layout-slice';
import userReducer from '@/features/user/user-slice';
import topReducer from '@/features/top/top-slice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    user: userReducer,
    top: topReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

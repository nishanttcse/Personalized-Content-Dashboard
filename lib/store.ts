import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import preferencesReducer from './slices/preferencesSlice';
import authReducer from './auth';
import realtimeReducer from './realtime';
import i18nReducer from './i18n';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    preferences: preferencesReducer,
    auth: authReducer,
    realtime: realtimeReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
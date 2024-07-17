import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from '../features/invoices/invoicesSlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from '../features/invoices/invoicesSlice';
import customerReducer from '../features/customers/customerSlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    customers: customerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



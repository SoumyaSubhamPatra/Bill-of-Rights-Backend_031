// src/slices/customerSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../customers/customerAPI';

interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface CustomerState {
  customers: Customer[];
  error: string | null;
  loading: boolean;
}

const initialState: CustomerState = {
  customers: [],
  error: null,
  loading: false,
};

export const loadCustomers = createAsyncThunk('customers/load', async () => {
  const response = await fetchCustomers();
  return response.data;
});

export const addCustomer = createAsyncThunk('customers/add', async (customer: Customer) => {
  const response = await createCustomer(customer);
  return response.data;
});

export const editCustomer = createAsyncThunk('customers/edit', async (customer: Customer) => {
  const response = await updateCustomer(customer);
  return response.data;
});

export const removeCustomer = createAsyncThunk('customers/remove', async (customerId: number) => {
  await deleteCustomer(customerId);
  return customerId;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(loadCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load customers';
      })
      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.customers.push(action.payload);
      })
      .addCase(editCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        const index = state.customers.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(removeCustomer.fulfilled, (state, action: PayloadAction<number>) => {
        state.customers = state.customers.filter(customer => customer.id !== action.payload);
      });
  },
});

export default customerSlice.reducer;

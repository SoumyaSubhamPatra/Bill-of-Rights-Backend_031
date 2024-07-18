import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from './invoicesAPI';

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  customer: string;
  items: { description: string; quantity: number; price: number }[];
  tax: number;
  total: number;
}


interface InvoicesState {
  invoices: Invoice[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  status: 'idle',
  error: null,
};

export const fetchInvoicesAsync = createAsyncThunk('invoices/fetchInvoices', async () => {
  const response = await fetchInvoices();
  return response.data;
});

export const createInvoiceAsync = createAsyncThunk('invoices/createInvoice', async (invoice: Invoice) => {
  const response = await createInvoice(invoice);
  return response.data;
});

export const updateInvoiceAsync = createAsyncThunk('invoices/updateInvoice', async (invoice: Invoice) => {
  const response = await updateInvoice(invoice);
  return response.data;
});

export const deleteInvoiceAsync = createAsyncThunk('invoices/deleteInvoice', async (invoiceId: string) => {
  await deleteInvoice(invoiceId);
  return invoiceId;
});

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoicesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoicesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch invoices';
      })
      .addCase(createInvoiceAsync.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(updateInvoiceAsync.fulfilled, (state, action) => {
        const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      });
  },
});

export default invoicesSlice.reducer;

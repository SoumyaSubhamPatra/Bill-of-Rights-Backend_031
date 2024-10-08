// src/api/invoicesAPI.ts

import axios from 'axios';

const API_URL = 'https://api-payment-e5gt.onrender.com';

export const fetchInvoices = () => {
  return axios.get(`${API_URL}/invoices`);
};

export const createInvoice = (invoice: any) => {
  return axios.post(`${API_URL}/invoices`, invoice);
};

export const updateInvoice = (invoice: any) => {
  if (!invoice.id) {
    throw new Error('Invoice ID is required for updating an invoice.');
  }
  return axios.put(`${API_URL}/invoices/${invoice.id}`, invoice);
};

export const deleteInvoice = (invoiceId: string) => {
  return axios.delete(`${API_URL}/invoices/${invoiceId}`);
};

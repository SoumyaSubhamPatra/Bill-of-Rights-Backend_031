// src/api/customerAPI.ts

import axios from 'axios';

const API_URL = 'https://api-payment-e5gt.onrender.com';

export const fetchCustomers = () => {
  return axios.get(`${API_URL}/customers`);
};

export const createCustomer = (customer: any) => {
  return axios.post(`${API_URL}/customers`, customer);
};

export const updateCustomer = (customer: any) => {
  if (!customer.id) {
    throw new Error('Customer ID is required for updating a customer.');
  }
  return axios.put(`${API_URL}/customers/${customer.id}`, customer);
};

export const deleteCustomer = (customerId: number) => {
  return axios.delete(`${API_URL}/customers/${customerId}`);
};

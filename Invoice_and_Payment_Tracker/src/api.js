// src/api.js
import axios from "axios";

const API_URL = "https://api-payment-e5gt.onrender.com";

export const signUpUser = async (username, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error signing up");
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Invalid username or password"
    );
  }
};

import axios from 'axios';
import { API_URL } from '@env';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};
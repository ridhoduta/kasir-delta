// authService.js
import axios from 'axios';
import { urlLogin } from './url';

const api = axios.create({
  baseURL: urlLogin
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login({ name, password, device_name }) {
  const response = await api.post('/login', { name, password, device_name });
  return response.data;
}

export async function logout() {
  await api.get('/logout');
  localStorage.removeItem('token');
}

export async function getUser() {
  const response = await api.get('/user');
  return response.data; // data user
}

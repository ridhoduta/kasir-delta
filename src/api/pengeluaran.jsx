import axios from "axios";
import { url } from "./url";
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const getPengeluarans = async() =>{
    const response = await api.get('/pengeluaran')
    return response
}
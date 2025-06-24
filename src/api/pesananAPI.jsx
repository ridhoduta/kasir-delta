import axios from "axios";
import { url } from "./url";
const api = axios.create({
  baseURL: url
});

// 2. Tambahkan interceptor untuk attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getpesanans = async() =>{
    const response = await api.get('/pesanan')
    return response
}
export const postpesanan = async(pesanan) =>{
    const response = await api.post('/pesanan', pesanan)
    return response
}
export const deletepesanan = async (id) => {
    const response = await api.delete(`/pesanan/${id}`);
    return response;
};

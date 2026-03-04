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
export const getUkurans = async() =>{
    const response = await api.get('/ukuran')
    return response
}
export const postUkurans = async(ukuran) =>{
    const response = await api.post('/ukuran', ukuran)
    return response
}
export const getUkuransById = async (id) => {
  const response = await api.get(`/ukuran/${id}`)
  return response
}

// Update ukuran berdasarkan ID
export const updateUkurans = async (id, ukuranBaru) => {
  const response = await api.put(`/ukuran/${id}`, ukuranBaru)
  return response
}
export const deleteUkuranById = async (id) => {
  const response = await api.delete(`/ukuran/${id}`)
  return response
}


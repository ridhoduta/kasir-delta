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
export const getBahans = async() =>{
    const response = await api.get('/bahan')
    return response
}
export const postBahans = async(id, data) =>{
    const response = await api.post(`/bahan/${id}`, data)
    return response
}
export const updateBahans = async(id, data) =>{
    const response = await api.put(`/bahan/${id}`, data)
    return response
}
export const deleteBahans = async(id) =>{
    const response = await api.delete(`/bahan/${id}`);
    return response
}


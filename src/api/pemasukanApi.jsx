import axios from "axios";
import { url } from "./url";
const api = axios.create({
  baseURL: url
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const getPemasukans = async() =>{
    const response = await api.get('/pemasukan')
    return response
}
export const deletePemasukan = async(id) =>{
    const response = await api.delete(`/pemasukan/${id}`);
    return response
}



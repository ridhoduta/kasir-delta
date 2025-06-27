// barangApi.jsx
import axios from "axios";
import { url } from "./url";

// 1. Buat instance Axios
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

// 2. Tambahkan interceptor untuk attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Semua function pakai api instance
export const getBarangs = async () => {
  const response = await api.get('/barang-ukuran');
  return response;
};
export const getBarangUkuranById = async (id) => {
  const response = await api.get(`/barang-ukuran/${id}`);
  return response;
};

export const getUkuranByBarang = async (barangid) => {
  const response = await api.get(`/barang/${barangid}/ukuran`);
  return response;
};

export const postBarangs = async (formData) => {
  const response = await api.post('/barang-ukuran', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const postEditBarangs = async (formData, barangid) => {
  const response = await api.post(`/barang-ukuran/${barangid}`, formData
);
  return response;
};

export const deletebarang = async (barangid) => {
  const response = await api.delete(`/barang-ukuran/${barangid}`);
  return response;
};

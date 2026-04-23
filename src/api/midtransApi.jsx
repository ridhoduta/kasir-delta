import axios from "axios";
import { url } from "./url";

const api = axios.create({
    baseURL: url,
    withCredentials: true,
});

// Tambahkan interceptor untuk attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Mendapatkan Snap Token dari Backend
 * @param {number} pesananId 
 * @returns {Promise}
 */
export const createMidtransToken = async (pesananId) => {
    try {
        const response = await api.post('/midtrans/transaction', {
            pesanan_id: pesananId
        });
        return response.data;
    } catch (error) {
        console.error('Gagal membuat token Midtrans:', error.response?.data || error.message);
        throw error;
    }
};

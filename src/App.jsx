import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import './Admin.css';
import HomeKasir from './pages/kasir/HomeKasir';
import FormListBarang from './pages/kasir/FormListBarang';
import KonfirmasiPembayaran from './pages/kasir/KonfirmasiPembayaran';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './contexts/ProtectedRoute';
import Pesanan from './pages/admin/Pesanan';
import FormBahan from './pages/admin/FormBahan';
import Bahan from './pages/admin/Bahan';
import Beranda from './pages/owner/Beranda';
import Pemasukan from './pages/owner/Pemasukan';
import Pengeluaran from './pages/owner/Pengeluaran';
import FormEditBarang from './pages/kasir/FormEditBarang';
import FormEditBahan from './pages/admin/FormEditBahan';
import TailWindPages from './pages/TailWindPages';
import KasirLayout from './layout/KasirLayout';
import AdminLayout from './layout/AdminLayout';
import NotaPembayaran from './pages/kasir/NotaPembayaran';
import FormUkuran from './pages/kasir/FormUkuran';
import GuestRoute from './contexts/guestroute';
function App() {
   return (
    <Router>
      <Routes>
        {/* Public Routes */}
         <Route path="/" element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />
        <Route path="/tailwind" element={<TailWindPages />} />

        {/* Kasir Routes (Role 1) */}
        <Route element={<ProtectedRoute allowedRoles={[1]}><KasirLayout /></ProtectedRoute>}>
          <Route path="/home" element={<HomeKasir />} />
          <Route path="/barang" element={<FormListBarang />} />
          <Route path="/pembayaran" element={<KonfirmasiPembayaran />} />
          <Route path="/nota" element={<NotaPembayaran />} />
          <Route path="/edit-barang" element={<FormEditBarang />} />
          <Route path="/ukuran" element={<FormUkuran />} />
        </Route>

        {/* Admin Routes (Role 2) */}
        <Route element={<ProtectedRoute allowedRoles={[2]}><AdminLayout /></ProtectedRoute>}>
          <Route path="/pesanan" element={<Pesanan />} />
          <Route path="/bahan" element={<Bahan />} />
          <Route path="/tambah-bahan" element={<FormBahan />} />
          <Route path="/update-bahan" element={<FormEditBahan />} />
          <Route path="/beranda-owner" element={<Beranda />} />
          <Route path="/pemasukan" element={<Pemasukan />} />
          <Route path="/pengeluaran" element={<Pengeluaran />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
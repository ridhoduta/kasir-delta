import React, { useState } from 'react';
import Sidebar from '../../component/sidebar/Sidebar';
import { useKeranjang } from '../../contexts/KeranjangContext';
import { useNavigate, Link } from 'react-router-dom';
import { postpesanan } from '../../api/pesananAPI';
import LoadingSpinner from '../../component/spinner/LoadingSpinner';



const KonfirmasiPembayaran = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const { keranjang } = useKeranjang();
  const [namaPemesan, setNamaPemesan] = useState('')
  
  
  const [alamat, setAlamat] = useState('')

  // Hitung total pembayaran
  const totalPembayaran = keranjang.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );
  const handleBayar = async () => {
      if (keranjang.length === 0) {
        alert('Keranjang masih kosong.')
        return
      }

      if (!namaPemesan.trim()) {
        alert('Nama pemesan harus diisi.')
        return
      }

       const totalharga = keranjang.reduce(
        (total, item) => total + item.harga * item.jumlah,
        0
      );

      const detail = keranjang.map(item => ({
        barangid: item.barangid,
        ukuran: item.ukuran,
        namapesanan: namaPemesan, // dari input
        alamat: alamat,
        jumlah: item.jumlah,
        hargatotal: item.harga * item.jumlah
      }))

      const pesanan = {
        totalharga,
        detail
      }
      setIsLoading(true);
      try {
        await postpesanan(pesanan)
        navigate('/nota', {state:{pesanan:pesanan}})
        // kosongkanKeranjang()
      } catch (error) {
        console.error('Gagal mengirim pesanan:', error.response?.data || error.message)
        alert('Gagal menyimpan pesanan. Silakan coba lagi.')
      } finally{
        setIsLoading(false);
      }
    }

  return (
    <>
      <Sidebar />
      <div className="flex-1 min-h-screen md:ml-[240px] bg-zinc-900 text-white">
  <header className="bg-zinc-900 shadow sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-center w-full md:w-auto md:text-left">
        Delta Konveksi
      </h1>
    </div>
  </header>

  <div className="max-w-xl w-full mx-auto px-4 py-6 space-y-6">

    {/* Judul halaman */}
    <h2 className="text-xl font-semibold">Konfirmasi Pesanan</h2>

    {/* Alamat */}
    <div className="flex gap-3 items-start text-zinc-200">
      <div className="pt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium">Alamat</p>
        <p className="text-sm">Delta Konveksi | 082335416789</p>
        <p className="text-sm text-gray-300">
          Karangrejo, Kec. Boyolangu, Kabupaten Tulungagung
        </p>
      </div>
    </div>

    {/* Form Nama & Alamat Pemesan */}
    <div className="space-y-4 text-black">
      <div>
        <label htmlFor="namaPemesan" className="block font-medium mb-1 text-white">Nama Pemesan</label>
        <input
          id="namaPemesan"
          value={namaPemesan}
          onChange={(e) => setNamaPemesan(e.target.value)}
          placeholder="Masukkan nama lengkap"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>
      <div>
        <label htmlFor="alamat" className="block font-medium mb-1 text-white">Alamat</label>
        <input
          id="alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          placeholder="Masukkan alamat lengkap"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>
    </div>

    {/* Detail Pesanan */}
    <div className="bg-white text-zinc-800 p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">Detail Pesanan</h3>

      <div className="space-y-2">
        {keranjang.length === 0 ? (
          <p className="text-sm text-gray-500">Keranjang kosong</p>
        ) : (
          keranjang.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.namabarang} {item.ukuran} x {item.jumlah}</span>
              <span className="font-semibold">Rp { (item.harga * item.jumlah).toLocaleString('id-ID') }</span>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between border-t pt-3 font-semibold text-base">
        <span>Total Pembayaran</span>
        <span>Rp {totalPembayaran.toLocaleString('id-ID')}</span>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="flex items-center justify-between gap-4 mt-4">
      <div className="text-right">
        <p className="text-sm">Total Pembayaran</p>
        <p className="text-xl font-bold text-yellow-400">
          Rp {totalPembayaran.toLocaleString('id-ID')}
        </p>
      </div>

      <button
        onClick={handleBayar}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition"
      >
        BAYAR
      </button>
    </div>

    {isLoading && <LoadingSpinner />}
  </div>
</div>

    </>
  );
};

export default KonfirmasiPembayaran;

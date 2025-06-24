import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBarangUkuranById, postEditBarangs } from '../../api/barangApi';

const FormEditBarang = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const barangukuranid = location.state?.barangukuranid;

  const [namaBarang, setNamaBarang] = useState('');
  const [ukuran, setUkuran] = useState('');
  const [harga, setHarga] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBarangUkuranById(barangukuranid);
        const data = response.data;

        setNamaBarang(data.barang.namabarang);
        setUkuran(data.ukuran.ukuran);
        setHarga(data.harga);
      } catch (error) {
        console.error("Gagal mengambil data barang:", error);
        setErrors({ global: "Gagal mengambil data dari server" });
      }
    };

    if (barangukuranid) {
      fetchData();
    }
  }, [barangukuranid]);

  const validate = () => {
    const newErrors = {};
    if (!namaBarang.trim()) newErrors.namabarang = "Nama barang tidak boleh kosong";
    if (!harga || isNaN(harga) || parseFloat(harga) <= 0)
      newErrors.harga = "Harga harus berupa angka lebih dari 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("namabarang", namaBarang);
    formData.append("daftarHarga", harga);
    formData.append('_method', 'PUT');

    try {
      await postEditBarangs(formData, barangukuranid);
      alert("Data berhasil diperbarui!");
      navigate("/barang");
    } catch (error) {
      console.error("Gagal update", error);
      setErrors({ global: "Terjadi kesalahan saat mengupdate data" });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex-1 min-h-screen md:ml-[240px] bg-zinc-900 text-white">
  <header className="bg-zinc-900 sticky top-0 z-40 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold mb-0 text-center md:text-left w-full">
            Delta Konveksi
          </h1>
      </div>
    </header> 

  <div className="max-w-7xl mx-auto px-4 py-6">
    <section className="bg-white text-zinc-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">FORM EDIT BARANG</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global Error */}
        {errors.global && (
          <div className="text-red-600 font-medium">{errors.global}</div>
        )}

        {/* Nama Barang */}
        <div className="space-y-2">
          <label className="block font-medium">Nama Barang</label>
          <input
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.namabarang && (
            <p className="text-red-500 text-sm">{errors.namabarang}</p>
          )}
        </div>

        {/* Ukuran (Disabled) */}
        <div className="space-y-2">
          <label className="block font-medium">Ukuran Barang</label>
          <input
            type="text"
            value={ukuran}
            disabled
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
          />
        </div>

        {/* Harga */}
        <div className="space-y-2">
          <label className="block font-medium">Harga Barang</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.harga && (
            <p className="text-red-500 text-sm">{errors.harga}</p>
          )}
        </div>

        {/* Tombol Submit */}
        <div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </section>
  </div>
</div>

    </>
  );
};

export default FormEditBarang;

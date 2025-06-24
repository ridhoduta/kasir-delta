import React, { useState, useEffect } from 'react';
import PesananList from '../../component/pesanan/PesananList';
import { deletepesanan, getpesanans } from '../../api/pesananAPI';
import SidebarAdmin from '../../component/sidebar/SidebarAdmin';
import { useNavigate } from 'react-router-dom';
// import style from '../../css/Admin.module.css'
const Pesanan = () => {
    const [pesanan, setPesanan] = useState([]);
    const navigate = useNavigate()
    console.log(pesanan)

    const fetchData = async () => {
        try {
        const response = await getpesanans();
        setPesanan(response.data);
        } catch (error) {
        console.error('Gagal mengambil data pesanan:', error);
        }
    };
    const handleTambah = (data) => {
      
        navigate('/tambah-bahan', { state: { pesanan: data } })
        // console.log(data)
    }

    useEffect(() => {
        fetchData();
    }, []);
    const deletePesanan = async (pesananid) => {
      const konfirmasi = window.confirm('Yakin ingin menghapus pesanan ini?');
      if (!konfirmasi) return;
    
      try {
        const response = await deletepesanan(pesananid);
        fetchData()
        console.log("pesanan berhasil dihapus", response.data) 
      } catch (error) {
        console.error('Gagal menghapus pesanan:', error.response?.data || error.message);
      }
    };
    
    
  return (
    <>
    <SidebarAdmin/>
    <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">
      {/* Header */}
      <header className="bg-zinc-900 shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-bold text-center md:text-left w-full">
            Delta Konveksi
          </h1>
        </div>
      </header>

      {/* Konten Utama */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <PesananList
            data={pesanan}
            deletePesanan={deletePesanan}
            handleTambah={handleTambah}
          />
        </div>
      </div>
    </div>

    
    
    </>
  )
}

export default Pesanan
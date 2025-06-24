import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../component/sidebar/SidebarAdmin';
import { deleteBahans, getBahans } from '../../api/bahanApi';
import BahanList from '../../component/bahan/BahanList';
import { useNavigate } from 'react-router-dom';
const Bahan = () => {
  const [bahan, setBahan] = useState([]);
  const navigate = useNavigate()  
  const fetchData = async () => {
      try {
      const response = await getBahans();
      console.log(response.data)
      setBahan(response.data);
      } catch (error) {
      console.error('Gagal mengambil data pesanan:', error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);
  const handleDelete = async (bahanid) => {
    const konfirmasi = window.confirm('Yakin ingin menghapus pesanan ini?');
    if (!konfirmasi) return;
  
    try {
      const response = await deleteBahans(bahanid);
      fetchData()
      console.log("bahan berhasil dihapus", response.data) 
    } catch (error) {
      console.error('Gagal menghapus bahan:', error.response?.data || error.message);
    }

  }
  const handleUpdate = (data) =>{
    navigate('/update-bahan', {state: {bahan: data}})
  }
  return (
    <>
    <SidebarAdmin/>
    <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">

  {/* Header */}
  <header className="bg-zinc-900 sticky top-0 z-40 shadow">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold text-center md:text-left w-full">
        Delta Konveksi
      </h1>
    </div>
  </header>

  {/* Konten */}
  <div className="max-w-7xl mx-auto px-4 py-6">
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">List Bahan</h2>

      <BahanList
        data={bahan}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  </div>
</div>

    
    </>
  )
}

export default Bahan

import React, { useEffect, useState } from 'react'
import SidebarOwner from '../../component/sidebar/SidebarOwner'
import PemasukanList from '../../component/pemasukan/PemasukanList'
import { deletePemasukan, getPemasukans } from '../../api/pemasukanApi';

const Pemasukan = () => {
    const [pemasukan, setPemasukan] = useState([]);


    // const navigate = useNavigate()

    const handleDelete = async (bahanid) => {
      const konfirmasi = window.confirm('Yakin ingin menghapus pesanan ini?');
      if (!konfirmasi) return;
    
      try {
        const response = await deletePemasukan(bahanid);
        fetchData()
        console.log("Pemasukan berhasil dihapus", response.data) 
      } catch (error) {
        console.error('Gagal menghapus Pemasukan:', error.response?.data || error.message);
      }
    }
    const fetchData = async () => {
        try {
        const response = await getPemasukans();
        setPemasukan(response.data);
        } catch (error) {
        console.error('Gagal mengambil data pesanan:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <>
    <SidebarOwner/>
    <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">
      <header className="bg-zinc-900 sticky top-0 z-40 shadow text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center md:text-left">Delta Konveksi</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <PemasukanList data={pemasukan} handleDelete={handleDelete} />
      </main>
    </div>
    </>
  )
}

export default Pemasukan

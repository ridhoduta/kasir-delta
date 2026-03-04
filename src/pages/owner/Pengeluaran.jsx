import React, { useEffect, useState } from 'react'
import { getPengeluarans } from '../../api/pengeluaran';
import PengeluaranList from '../../component/pengeluaran/PengeluaranList';

const Pengeluaran = () => {
    const [pengeluaran, setPengeluaran] = useState([]);
        // const navigate = useNavigate()
    
        const fetchData = async () => {
            try {
            const response = await getPengeluarans();
            setPengeluaran(response.data);
            } catch (error) {
            console.error('Gagal mengambil data pesanan:', error);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, []);
  return (
    <>
    {/* <SidebarAdmin/> */}
    <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">
      <header className="bg-zinc-900 sticky top-0 z-40 shadow text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center md:text-left">Delta Konveksi</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <PengeluaranList data={pengeluaran} />
      </main>
    </div>
        </>
  )
}

export default Pengeluaran

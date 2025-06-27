import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBarangs } from '../../api/barangApi'
import BarangList from '../../component/barangKasir/BarangList'
import KeranjangList from '../../component/keranjangKasir/keranjangList'
import Sidebar from '../../component/sidebar/Sidebar'
import DetailBarangForm from '../../component/DetailBarang/DetailBarangForm'


const HomeKasir = () => {
    const [barang, setBarang] = useState([])
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [selectedBarang, setSelectedBarang] = useState(null)
    
    const handleTambah = (data) => {
        setSelectedBarang(data)
        setShowForm(true)
      }
    
    useEffect(() => {
    const fetchData = async () => {
      const response = await getBarangs()
      const allData = response.data
      const filtered = []
      const seen = new Set()

      for (const item of allData) {
        if (!seen.has(item.barangid)) {
          seen.add(item.barangid)
          filtered.push(item)
        }
      }

      setBarang(filtered)
    }

    fetchData()
  }, [])
  const lanjutPembayaran = () =>{
    navigate('/pembayaran')
  }
  return (
    <>
    <Sidebar/>
    {showForm && selectedBarang && (
  <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
    <div className="bg-white rounded-xl p-4 w-full max-w-2xl relative">
      <DetailBarangForm barang={selectedBarang} onClose={() => setShowForm(false)} />
    </div>
  </div>
)}

    <div className="flex-1 min-h-screen md:ml-[240px] bg-zinc-900 text-white">
  <div id="catalog-page" className="block">
    {/* Header */}
    <header className="bg-zinc-900 sticky top-0 z-40 shadow">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        <h1 className="text-xl font-bold mb-0 text-center md:text-left w-full">
            Delta Konveksi
          </h1>
      </div>
    </header> 

    {/* Main Container */}
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
  {/* Katalog */}
  <section className="bg-white rounded-lg shadow overflow-hidden">
    {/* Sticky Header */}
    <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200">
      <h2 className="text-lg md:text-xl font-semibold text-zinc-800">
        Katalog
      </h2>
    </div>

    {/* Scrollable Content */}
    <div className="max-h-[60vh] overflow-y-auto px-4 py-4">
      <BarangList data={barang} onTambah={handleTambah} />
    </div>
  </section>

  {/* Keranjang */}
  <section>
    <h2 className="text-lg md:text-xl font-semibold bg-white text-zinc-800 px-4 py-3 rounded-t-lg shadow">
      Keranjang Pesanan
    </h2>
    <div className="bg-white text-zinc-800 rounded-b-lg shadow p-4 space-y-4">
      <KeranjangList />
      <div className="flex justify-end">
        <button
          onClick={() => lanjutPembayaran()}
          className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Lanjut Ke Pembayaran
        </button>
      </div>
    </div>
  </section>
</div>

  </div>
</div>


    
    </>
  )
}

export default HomeKasir

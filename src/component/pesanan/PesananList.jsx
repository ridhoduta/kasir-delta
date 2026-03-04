import React, { useEffect, useState } from 'react'
import PesananItem from './PesananItem'

const PesananList = ({ data, deletePesanan, handleTambah }) => {
    const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [filterTahun, setFilterTahun] = useState('')
  const [filterBulan, setFilterBulan] = useState('')
  const [filterHariIni, setFilterHariIni] = useState(false)

  // Ambil tahun unik dari data
  const getUniqueTahun = () => {
    const tahunUnik = [...new Set(data.map(item =>
      new Date(item.created_at).getFullYear().toString()
    ))]
    return tahunUnik.sort((a, b) => b - a)
  }

  // Ambil bulan unik dari data
  const getUniqueBulan = () => {
    const bulanUnik = [...new Set(data.map(item =>
      (new Date(item.created_at).getMonth() + 1).toString().padStart(2, '0')
    ))]
    return bulanUnik.sort()
  }

  // Filter data sesuai pilihan tahun/bulan/hari ini
  const filteredData = data.filter(item => {
    const createdAt = new Date(item.created_at)
    const itemTahun = createdAt.getFullYear().toString()
    const itemBulan = (createdAt.getMonth() + 1).toString().padStart(2, '0')
    const isToday = new Date().toDateString() === createdAt.toDateString()

    if (filterHariIni) return isToday

    const matchTahun = filterTahun ? itemTahun === filterTahun : true
    const matchBulan = filterBulan ? itemBulan === filterBulan : true

    return matchTahun && matchBulan
  })

  // Paginasi
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [filterTahun, filterBulan, filterHariIni])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Tabel Pesanan</h2>

      {/* Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <select
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="">Semua Tahun</option>
            {getUniqueTahun().map((tahun) => (
              <option key={tahun} value={tahun}>{tahun}</option>
            ))}
          </select>

          <select
            value={filterBulan}
            onChange={(e) => setFilterBulan(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="">Semua Bulan</option>
            {getUniqueBulan().map((bulan) => (
              <option key={bulan} value={bulan}>
                {new Date(2000, parseInt(bulan) - 1).toLocaleString('id-ID', { month: 'long' })}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setFilterHariIni(!filterHariIni)
              setFilterTahun('')
              setFilterBulan('')
            }}
            className={`px-3 py-1 rounded text-sm ${filterHariIni ? 'bg-yellow-400' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {filterHariIni ? 'Menampilkan Hari Ini' : 'Filter Hari Ini'}
          </button>
        </div>

        {(filterTahun || filterBulan || filterHariIni) && (
          <button
            onClick={() => {
              setFilterTahun('')
              setFilterBulan('')
              setFilterHariIni(false)
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Pemesan</th>
              <th className="px-4 py-2">Nama Barang</th>
              <th className="px-4 py-2">Status Bahan</th>
              <th className="px-4 py-2">Total Harga</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((item, index) => (
              <PesananItem
                key={item.pesananid}
                data={item}
                nomor={indexOfFirstItem + index + 1}
                deletePesanan={deletePesanan}
                handleTambah={handleTambah}
              />
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">Data tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm mt-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PesananList

import React, { useState } from 'react'
import PengeluaranItem from './PengeluaranItem'

const PengeluaranList = ({data}) => {
  const [filterTahun, setFilterTahun] = useState('');
  const [filterBulan, setFilterBulan] = useState('');
  const tahunList = [...new Set(data.map(item => new Date(item.created_at).getFullYear()))].sort((a, b) => b - a);
  const bulanList = [
    { label: 'Januari', value: '0' }, { label: 'Februari', value: '1' }, { label: 'Maret', value: '2' },
    { label: 'April', value: '3' }, { label: 'Mei', value: '4' }, { label: 'Juni', value: '5' },
    { label: 'Juli', value: '6' }, { label: 'Agustus', value: '7' }, { label: 'September', value: '8' },
    { label: 'Oktober', value: '9' }, { label: 'November', value: '10' }, { label: 'Desember', value: '11' },
  ];
  const filteredData = data.filter(item => {
    const date = new Date(item.created_at);
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();

      const matchTahun = filterTahun ? year === filterTahun : true;
      const matchBulan = filterBulan ? month === filterBulan : true;

      return matchTahun && matchBulan;
  });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Atur jumlah data per halaman
  
    // Hitung index data
    const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const goToPrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  return (
    <>
     <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-zinc-800">Tabel Pengeluaran</h2>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm text-zinc-800 font-medium mb-1">Filter Tahun</label>
          <select
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="">Semua Tahun</option>
            {tahunList.map((tahun) => (
              <option key={tahun} value={tahun}>{tahun}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-800 font-medium mb-1">Filter Bulan</label>
          <select
            value={filterBulan}
            onChange={(e) => setFilterBulan(e.target.value)}
            className="border px-3 py-2 rounded w-full text-sm"
          >
            <option value="">Semua Bulan</option>
            {bulanList.map((bulan) => (
              <option key={bulan.value} value={bulan.value}>{bulan.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Bahan</th>
              <th className="px-4 py-2 border">Total Pengeluaran</th>
              <th className="px-4 py-2 border">Tanggal</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <PengeluaranItem
                key={item.pengeluaranid}
                data={item}
                nomor={indexOfFirstItem + index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-zinc-800 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-zinc-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
    </>
  )
}

export default PengeluaranList

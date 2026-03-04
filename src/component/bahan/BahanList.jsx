import React, { useState } from 'react'
import BahanItem from './BahanItem'

const BahanList = ({data, handleDelete, handleUpdate}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Atur jumlah data per halaman
  
    // Hitung index data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const goToPrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  return (
    <>
    <div className="space-y-6">

      {/* Judul */}
      <h2 className="text-lg font-semibold text-gray-800">Bahan</h2>

      {/* Tabel */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Nomor</th>
              <th className="px-4 py-2">Nama Bahan</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <BahanItem
                key={item.bahanid}
                data={item}
                nomor={indexOfFirstItem + index + 1}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
             />
              
            ))}
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
    </>
  )
}

export default BahanList

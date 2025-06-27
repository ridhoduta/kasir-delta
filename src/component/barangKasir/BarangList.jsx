import React, { useState } from 'react'
import BarangItem from './BarangItem'

const BarangList = ({ data, onTambah }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter(item =>
  item.barang.namabarang?.toLowerCase().includes(searchTerm.toLowerCase())
)

  return (
    <>
      {/* Input Search */}
      <div className="mb-1">
        <input
        type="text"
        placeholder="Cari nama barang..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm text-black bg-white placeholder-gray-400"
      />
      </div>

      {/* List Barang */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <BarangItem key={item.barangid} data={item} onTambah={onTambah} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Barang tidak ditemukan</div>
        )}
      </div>
    </>
  )
}

export default BarangList

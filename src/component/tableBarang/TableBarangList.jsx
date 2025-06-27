import React, { useState } from 'react'
import TableBarangItem from './TableBarangItem'

const TableBarangList = ({ barang, deleteBarang, handleEdit }) => {
  const [searchTerm, setSearchTerm] = useState("")
  console.log(barang)

  const filteredBarang = barang.filter((item) => {
  const nama = item.barang?.namabarang?.toLowerCase() || ""
  const ukuran = item.ukuran?.ukuran?.toLowerCase() || ""
  return nama.includes(searchTerm.toLowerCase()) || ukuran.includes(searchTerm.toLowerCase())
})

  return (
    <div className="table-section">
      <h2 className="table-header text-lg font-semibold text-zinc-800 mb-4">TABEL BARANG</h2>

      {/* Input Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama atau ukuran barang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
        />
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded border border-gray-200 max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm table-auto" id="tabelBarang">
          <thead className="bg-gray-100 text-left text-zinc-800">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama Barang</th>
              <th className="px-4 py-2 border">Ukuran Barang</th>
              <th className="px-4 py-2 border">Harga</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className= "divide-y divide-gray-200">
            {filteredBarang.length > 0 ? (
              filteredBarang.map((item, index) => (
                <TableBarangItem
                  key={item.barangukuranid || index}
                  barang={item}
                  nomor={index + 1}
                  deleteBarang={deleteBarang}
                  handleEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-zinc-500 py-4">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableBarangList

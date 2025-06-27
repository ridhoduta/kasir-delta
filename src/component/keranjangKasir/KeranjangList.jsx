import React, { useState } from 'react'
import { useKeranjang } from '../../contexts/KeranjangContext'
import KeranjangItem from './KeranjangItem'

const KeranjangList = () => {
  const { keranjang, kosongkanKeranjang} = useKeranjang()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredKeranjang = keranjang.filter((item) =>
    item.namabarang?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      {/* Input Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama barang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm text-zinc-800"
        />
      </div>
      <div>
        <button
            onClick={() => kosongkanKeranjang()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-sm font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 7h12M10 11v6M14 11v6M5 7l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14m-9-3h4a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z" />
            </svg>
            Kosongkan Keranjang
          </button>
        </div>
      </div>


      {/* Tabel Keranjang */}
      <div className="overflow-x-auto max-h-80 overflow-y-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-zinc-800 sticky top-0">
            <tr>
              <th className="px-4 py-2 border">Nama Barang (Ukuran)</th>
              <th className="px-4 py-2 border">QTY</th>
              <th className="px-4 py-2 border">Harga Satuan</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredKeranjang.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-zinc-600 italic py-4">
                  Barang tidak ditemukan
                </td>
              </tr>
            ) : (
              filteredKeranjang.map((item, index) => (
                <KeranjangItem item={item} key={index}/>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default KeranjangList

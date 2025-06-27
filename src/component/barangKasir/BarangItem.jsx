import React from 'react'
import { urlImage } from '../../api/url'

const BarangItem = ({data, onTambah}) => {
  return (
    <>
        <div
      className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all duration-200"
      data-product="kaos"
    >
      {/* Gambar */}
      <div className="aspect-square bg-gray-100">
        <img
          src={data.gambar ? urlImage + data.gambar : urlImage + '/gambar-barang/default.png'}
          alt={data.barang.namabarang}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-[120px]">
        <div className="text-base font-semibold text-zinc-800 truncate mb-3">
          {data.barang.namabarang}
        </div>
        <button
          onClick={() => onTambah(data)}
          className="bg-yellow-400 text-sm font-semibold text-zinc-900 px-4 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          Tambah
        </button>
      </div>
    </div>
    </>
  )
}

export default BarangItem

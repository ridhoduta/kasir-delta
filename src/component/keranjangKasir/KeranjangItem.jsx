import React from 'react'
// import { urlImage } from '../../api/url'
import { useKeranjang } from '../../contexts/KeranjangContext'


const KeranjangItem = ({ item }) => {
  const { hapusDariKeranjang } = useKeranjang()
  const totalHarga = item.jumlah * item.harga

  const handleHapus = () => {
    hapusDariKeranjang(item.barangid, item.ukuranid)
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow p-4 gap-4 text-sm text-zinc-800 relative">
      {/* Tombol hapus pojok kanan atas */}
      <button
        onClick={handleHapus}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Hapus item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 7h12M10 11v6M14 11v6M5 7l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14m-9-3h4a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z" />
        </svg>
      </button>

      {/* Detail Item */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-semibold text-base">{item.namabarang}</h3>
        <div className="text-sm">Size: <span className="font-medium">{item.ukuran}</span></div>
        <div className="text-sm">Keterangan: {item.keterangan}</div>
        <div className="text-sm">Jumlah: {item.jumlah}</div>
        <div className="text-sm">Harga satuan: Rp {item.harga.toLocaleString('id-ID')}</div>
        <div className="text-sm font-semibold text-yellow-700">
          Total: Rp {totalHarga.toLocaleString('id-ID')}
        </div>
      </div>
    </div>
  )
}

export default KeranjangItem

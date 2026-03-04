import React from 'react'
// import { urlImage } from '../../api/url'
import { useKeranjang } from '../../contexts/KeranjangContext'


const KeranjangItem = ({ item}) => {
  const { hapusDariKeranjang } = useKeranjang()
  const totalHarga = item.jumlah * item.harga

  const handleHapus = () => {
    hapusDariKeranjang(item.barangid, item.ukuranid)
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 border font-medium">{item.namabarang} ({item.ukuran})</td>
      <td className="px-4 py-2 border">{item.jumlah}</td>
      <td className="px-4 py-2 border">Rp {item.harga.toLocaleString('id-ID')}</td>
      <td className="px-4 py-2 border font-semibold text-yellow-600">
        Rp {(totalHarga).toLocaleString('id-ID')}
      </td>
      <td className="px-4 py-2 border">
        <button
          onClick={() => handleHapus(item.barangid, item.ukuranid)}
          className="text-red-500 hover:text-red-700"
          title="Hapus item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 7h12M10 11v6M14 11v6M5 7l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14m-9-3h4a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default KeranjangItem

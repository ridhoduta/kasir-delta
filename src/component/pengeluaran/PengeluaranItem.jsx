import React from 'react'

const PengeluaranItem = ({ data }) => {
  const {
    pengeluaranid,
    namabahan,
    harga,
    created_at,
  } = data

  // const namaBahan = bahan?.namabahan || '-'
  const tanggal = new Date(created_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
     <tr className="border-t border-gray-200">
      <td className="px-4 py-2 border">{pengeluaranid}</td>
      <td className="px-4 py-2 border">{namabahan}</td>
      <td className="px-4 py-2 border">Rp {harga.toLocaleString('id-ID')}</td>
      <td className="px-4 py-2 border">{tanggal}</td>
      <td className="px-4 py-2 border">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default PengeluaranItem

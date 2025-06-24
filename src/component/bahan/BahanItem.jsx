import React from 'react'

const BahanItem = ({data, handleDelete, handleUpdate, nomor}) => {
  const {
    bahanid,
    namabahan,
    harga,
  } = data

  // const namaBahan = bahan?.namabahan || '-'
  // console.log(data)
  return (
        <tr
        className="border-t border-gray-200 hover:bg-gray-50">
        <td className="px-4 py-2">
          {nomor}
        </td>
        <td className="px-4 py-2">{namabahan}</td>
        <td className="px-4 py-2">
          Rp {harga.toLocaleString("id-ID")}
        </td>
        <td className="px-4 py-2 space-x-2">
          <button
            onClick={() => handleUpdate(data)}
            className="bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 text-xs rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(bahanid)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded"
          >
            Hapus
          </button>
        </td>
      </tr>

  )
}

export default BahanItem

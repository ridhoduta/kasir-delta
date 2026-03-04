import React from 'react'

const UkuranItem = ({data, nomor, deleteUkuran, handleEdit}) => {
    const {ukuranid, ukuran} = data
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-2">{nomor}</td>

      <td className="px-4 py-2">
        {ukuran}
      </td>

      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => handleEdit(ukuranid)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => deleteUkuran(ukuranid)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default UkuranItem

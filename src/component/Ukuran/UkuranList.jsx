import React from 'react'
import UkuranItem from './UkuranItem'

const UkuranList = ({data, handleEdit, deleteUkuran}) => {
  return (
    <>
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-zinc-800">Tabel Ukuran</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Ukuran</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
                <UkuranItem
                key={index}
                data={item}
                nomor={index + 1}
                deleteUkuran={deleteUkuran}
                handleEdit={handleEdit}
                />
            ))}
          </tbody>
        </table>
      </div>
      </section>
    </>
  )
}

export default UkuranList

import React from 'react'
import PesananBarangitem from './pesananBarangitem'


const PesananBarangList = ({data}) => {
  return (
    <>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-dark border border-gray-300 rounded">
        <thead className="bg-gray-200 text-gray-800">
          <tr>
            <th className="px-4 py-2 w-2/5">Item</th>
            <th className="px-4 py-2 w-1/12 text-center">Qty</th>
            <th className="px-4 py-2 w-1/4 text-right">Price</th>
            <th className="px-4 py-2 w-1/4 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <PesananBarangitem key={index} data={item} />
          ))}
        </tbody>
      </table>
    </div>

    </>
  )
}

export default PesananBarangList

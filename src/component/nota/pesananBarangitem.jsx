import React from 'react'

const PesananBarangitem = ({data}) => {
  console.log(data)
  return (
    <>
    <tr className="border-t border-gray-300">
      <td className="px-4 py-2">{data.namabarang}({data.ukuran})</td>
      <td className="px-4 py-2 text-center">{data.jumlah}</td>
      <td className="px-4 py-2 text-right">Rp {data.harga.toLocaleString('id-ID')}</td>
      <td className="px-4 py-2 text-right">Rp {(data.harga * data.jumlah).toLocaleString('id-ID')}</td>
    </tr>
    </>
  )
}

export default PesananBarangitem

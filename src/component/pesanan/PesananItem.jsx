import React from 'react';

const PesananItem = ({ data, nomor,  deletePesanan, handleTambah}) => {
  const handleDelete = () => {
    
    deletePesanan(data.pesananid)
  };
  const {
    totalharga,
    created_at,
  } = data
  console.log(data)

  // const namaBahan = bahan?.namabahan || '-'
  const tanggal = new Date(created_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit'
  })
  console.log(data)
  return (
    <>
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-2">{nomor}</td>

      <td className="px-4 py-2">
        {data.detail_pesanan?.[0]?.namapesanan || '-'}
      </td>

      <td className="px-4 py-2">
        {data.detail_pesanan?.map((item, index) => (
          <div key={index}>
            {item.barang?.namabarang || '-'} ({item.ukuran || '-'})
          </div>
        ))}
      </td>

      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            data.bahan?.length > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {data.bahan?.length > 0 ? 'sudah ada' : 'belum ada'}
        </span>
      </td>

      <td className="px-4 py-2">
        Rp {totalharga.toLocaleString('id-ID')}
      </td>

      <td className="px-4 py-2">{tanggal}</td>

      <td className="px-4 py-2 space-x-2">
        <button
          onClick={() => handleTambah(data)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs"
        >
          Tambah Bahan
        </button>
        <button
          onClick={() => handleDelete()}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
        >
          Delete
        </button>
      </td>
    </tr>

    
    </>
    
  );
};

export default PesananItem;

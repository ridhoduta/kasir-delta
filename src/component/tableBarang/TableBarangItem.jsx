import React from 'react'

const TableBarangItem = ({barang, nomor, deleteBarang, handleEdit}) => {
  const handleDelete = () => {
    deleteBarang(barang.barang.barangid)
  };

  return (
    <>
    <tr>
        <td>{nomor}</td>
        <td>{barang.barang.namabarang}</td> 
        <td>{barang.ukuran.ukuran}</td> 
        <td>Rp.{barang.harga.toLocaleString('id-ID')}</td> 
        <td>
            <div className="action-buttons">
            <button className="btn-edit" onClick={()=>handleEdit(barang.barangukuranid)}>Edit</button>
            <button className="btn-delete" onClick={()=>handleDelete()}>Hapus</button>
            </div>
        </td>
    </tr>
    </>
  )
}

export default TableBarangItem

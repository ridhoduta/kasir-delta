import React from 'react'
import TableBarangItem from './TableBarangItem'

const TableBarangList = ({barang, deleteBarang, handleEdit}) => {
  
  return (
    <>
    <div className="table-section">
        <h2 className="table-header">TABEL BARANG</h2>
        <table className="table" id="tabelBarang">
        <thead>
            <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Ukuran Barang</th>
            <th>Harga</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {barang.map((item, index) => (
            <TableBarangItem key={index} barang={item} nomor={index + 1} deleteBarang={deleteBarang} handleEdit={handleEdit} />
            ))}
        </tbody>
        </table>
    </div>
    </>
  )
}

export default TableBarangList

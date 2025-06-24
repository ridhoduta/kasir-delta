import React, { useState } from 'react'
import SidebarAdmin from '../../component/sidebar/SidebarAdmin'
import { useLocation } from 'react-router-dom'
import { postBahans } from '../../api/bahanApi'
// import { postBahans } from '../../api/bahanApi'

const FormBahan = () => {
  const location = useLocation()
  const pesanan = location.state?.pesanan
  console.log(pesanan)

  const [namaBahan, setNamaBahan] = useState('')
  const [hargaBahan, setHargaBahan] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      namabahan: namaBahan,
      harga: parseInt(hargaBahan),
    }

    try {
      await postBahans(pesanan.pesananid, data)
      // console.log(data)

      setMessage('✅ Bahan berhasil ditambahkan')
      // Reset form
      setNamaBahan('')
      setHargaBahan('')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
      <SidebarAdmin />
      <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">

  {/* Header */}
  <header className="bg-zinc-900 sticky top-0 z-40 shadow">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold text-center md:text-left w-full">
        Delta Konveksi
      </h1>
    </div>
  </header>

  {/* Konten */}
  <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">

    {/* Detail Pesanan */}
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold">Detail Pesanan</h2>
      <p className="text-sm">Nama Pemesan: <strong>{pesanan.detail_pesanan[0]?.namapesanan}</strong></p>
      <p className="text-sm">Tanggal Pesanan: <strong>{pesanan.tanggal}</strong></p>

      <h4 className="text-md font-medium mt-4">Detail Barang:</h4>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        {pesanan.detail_pesanan.map((item, index) => (
          <li key={index}>
            <div>Barang: {item.barang?.namabarang || '-'}</div>
            <div>Ukuran: {item.ukuran}</div>
            <div>Jumlah: {item.jumlah}</div>
            <div>Harga Total: Rp {item.hargatotal.toLocaleString('id-ID')}</div>
          </li>
        ))}
      </ul>
    </div>

    {/* Form Tambah Bahan */}
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-lg font-semibold">Tambah Bahan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="namaBahan" className="block font-medium mb-1">Nama Bahan</label>
          <input
            type="text"
            id="namaBahan"
            name="namaBahan"
            placeholder="Masukkan Nama Bahan"
            value={namaBahan}
            onChange={(e) => setNamaBahan(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="hargaBahan" className="block font-medium mb-1">Harga Bahan</label>
          <input
            type="number"
            id="hargaBahan"
            name="hargaBahan"
            placeholder="Masukkan harga dalam rupiah"
            value={hargaBahan}
            onChange={(e) => setHargaBahan(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition"
        >
          Tambah
        </button>
      </form>

      {message && (
        <p className="text-green-600 text-sm">{message}</p>
      )}
    </div>
  </div>
</div>

    </>
  )
}

export default FormBahan

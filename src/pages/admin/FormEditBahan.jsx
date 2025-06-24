import React, { useState } from 'react'
import SidebarAdmin from '../../component/sidebar/SidebarAdmin'
import { useLocation } from 'react-router-dom'
import { updateBahans } from '../../api/bahanApi'

const FormEditBahan = () => {
  const location = useLocation()
  const bahan = location.state?.bahan
  console.log(bahan)

  const [namaBahanBaru, setNamaBahanBaru] = useState(bahan?.namabahan || '')
  const [hargaBahanBaru, setHargaBahanBaru] = useState(bahan?.harga || '')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        namabahan: namaBahanBaru,
        harga: parseInt(hargaBahanBaru),
      }

      await updateBahans(bahan.bahanid, data)

      setMessage('Data bahan berhasil diperbarui.')
    } catch (error) {
      console.error('Gagal update bahan:', error)
      setMessage('Gagal update data bahan.')
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

  {/* Konten Form */}
  <main className="max-w-3xl mx-auto px-4 py-6">
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-lg font-semibold text-zinc-800">Edit Bahan</h2>

      <form id="formEditBahan" onSubmit={handleSubmit} className="space-y-4">

        {/* Nama Bahan */}
        <div>
          <label htmlFor="namaBahan" className="block font-medium text-sm text-zinc-700 mb-1">
            Nama Bahan
          </label>
          <input
            type="text"
            id="namaBahan"
            name="namaBahan"
            placeholder="Masukkan Nama Bahan"
            value={namaBahanBaru}
            onChange={(e) => setNamaBahanBaru(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Harga Bahan */}
        <div>
          <label htmlFor="hargaBahan" className="block font-medium text-sm text-zinc-700 mb-1">
            Harga Bahan
          </label>
          <input
            type="number"
            id="hargaBahan"
            name="hargaBahan"
            placeholder="Masukkan harga dalam rupiah"
            value={hargaBahanBaru}
            onChange={(e) => setHargaBahanBaru(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full transition"
        >
          Simpan Perubahan
        </button>
      </form>

      {/* Pesan Notifikasi */}
      {message && (
        <p className={`text-sm mt-2 ${message.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  </main>
</div>

    </>
  )
}

export default FormEditBahan

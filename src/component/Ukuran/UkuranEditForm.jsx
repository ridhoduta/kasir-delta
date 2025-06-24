import React, { useEffect, useState } from 'react'
import { getUkuransById, updateUkurans } from '../../api/ukuranApi'

const UkuranEditForm = ({ id, onClose, onUpdated }) => {
    const [ukuran, setUkuran] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUkuransById(id)
        setUkuran(response.data.data.ukuran)
      } catch (err) {
        alert("Data tidak ditemukan.", err)
        onclose()
      }
    }

    if (id) fetchData()
  }, [id])

  const validate = () => {
    const err = {}
    if (!ukuran.trim()) err.ukuran = "Ukuran tidak boleh kosong"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      await updateUkurans(id, { ukuran })
      onUpdated()
      onClose()
    } catch (err) {
      setErrors({ global: "Gagal memperbarui data.", err })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
  <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative text-zinc-800">
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-zinc-600 hover:text-red-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <h2 className="text-lg font-semibold mb-4">Edit Ukuran</h2>

    {errors.global && <p className="text-red-500 mb-2">{errors.global}</p>}

    <form onSubmit={handleSubmit} className="space-y-4 text-zinc-800">
      <div>
        <label className="block text-sm font-medium">Ukuran</label>
        <input
          type="text"
          value={ukuran}
          onChange={(e) => setUkuran(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-400 focus:outline-none"
        />
        {errors.ukuran && <p className="text-red-500 text-sm">{errors.ukuran}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full w-full transition"
      >
        Simpan Perubahan
      </button>
    </form>
  </div>
</div>

  )
}

export default UkuranEditForm

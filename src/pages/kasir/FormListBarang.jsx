import React, { useEffect, useState } from 'react'
import Sidebar from '../../component/sidebar/Sidebar'
import { getBarangs, postBarangs, deletebarang } from '../../api/barangApi'
import { getUkurans, postUkurans, deleteUkuranById } from '../../api/ukuranApi'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../component/spinner/LoadingSpinner'
import TableBarangList from '../../component/tableBarang/TableBarangList'
import UkuranList from '../../component/Ukuran/UkuranList'
import UkuranEditForm from '../../component/Ukuran/UkuranEditForm'

const FormListBarang = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [barang, setBarang] = useState([])
  const [ukuran, setUkuran] = useState([])
  const [namaBarang, setNamaBarang] = useState("")
  const [gambarBarang, setGambarBarang] = useState(null)
  const [hargaUkuran, setHargaUkuran] = useState({})
  const [errors, setErrors] = useState({})
  const [showForm, setShowForm] = useState(false)

  // Ukuran management state
  const [ukuranInput, setUkuranInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [showUkuranSection, setShowUkuranSection] = useState(false)

  const navigate = useNavigate()

  const fetchUkurans = async () => {
    const response = await getUkurans()
    setUkuran(response.data)
  }

  const fetchBarang = async () => {
    const response = await getBarangs()
    setBarang(response.data)
  }

  useEffect(() => {
    fetchUkurans()
    fetchBarang()
  }, [])

  const validateBarang = () => {
    const newErrors = {}
    if (!namaBarang.trim()) {
      newErrors.namabarang = "Nama barang tidak boleh kosong"
    }
    const validUkuran = Object.entries(hargaUkuran)
      .filter(([_, harga]) => harga && parseFloat(harga) > 0)
    if (validUkuran.length === 0) {
      newErrors.barangukuran = "Minimal satu ukuran harus memiliki harga valid"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitBarang = async (e) => {
    e.preventDefault()
    if (!validateBarang()) return
    const barangukuran = Object.entries(hargaUkuran)
      .filter(([_, harga]) => harga && !isNaN(harga) && parseFloat(harga) > 0)
      .map(([ukuranid, harga]) => ({
        ukuranid: parseInt(ukuranid),
        harga: parseFloat(harga)
      }))
    const formData = new FormData()
    formData.append("namabarang", namaBarang.trim())
    formData.append("barangukuran", JSON.stringify(barangukuran))
    if (gambarBarang) {
      formData.append("gambar", gambarBarang)
    }
    setIsLoading(true)
    try {
      await postBarangs(formData)
      setNamaBarang("")
      setHargaUkuran({})
      setGambarBarang(null)
      setErrors({})
      const fileInput = document.getElementById("gambarBarang")
      if (fileInput) fileInput.value = null
      fetchBarang()
      alert("Data barang berhasil ditambahkan")
    } catch (err) {
      console.error("Gagal menyimpan barang:", err)
      const msg = err?.response?.data?.message || "Terjadi kesalahan saat menyimpan data."
      setErrors({ global: msg })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTambahUkuran = async (e) => {
    e.preventDefault()
    if (!ukuranInput.trim()) {
      alert('Ukuran tidak boleh kosong')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('ukuran', ukuranInput)
      await postUkurans(formData)
      setUkuranInput('')
      fetchUkurans()
    } catch (error) {
      console.error('Gagal menambahkan ukuran:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUkuran = async (id) => {
    if (!window.confirm('Yakin ingin menghapus ukuran ini?')) return
    await deleteUkuranById(id)
    fetchUkurans()
  }

  const deleteBarang = async (barangid) => {
    if (!window.confirm("Yakin hapus barang ini?")) return
    await deletebarang(barangid)
    fetchBarang()
  }

  const handleEdit = (barangukuranid) => {
    navigate("/edit-barang", { state: { barangukuranid } })
  }

  const handleEditUkuran = (id) => {
    setEditId(id)
  }

  const handleCloseEditUkuran = () => {
    setEditId(null)
  }

  const handleUkuranUpdated = () => {
    fetchUkurans()
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1 min-h-screen md:ml-[240px] bg-zinc-900 text-white">
        <header className="bg-zinc-900 sticky top-0 z-40 shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Delta Konveksi</h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Form Tambah Barang */}
          <section className="bg-white text-zinc-800 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">FORM TAMBAH BARANG</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                {showForm ? "Tutup Form" : "Buka Form"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmitBarang} className="space-y-6 px-6 py-4">
                {errors.global && <p className="text-red-600">{errors.global}</p>}

                {/* Nama Barang */}
                <div>
                  <label className="block font-medium mb-1">Nama Barang</label>
                  <input
                    type="text"
                    value={namaBarang}
                    onChange={(e) => setNamaBarang(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400"
                    placeholder='Masukkan Nama Barang'
                  />
                  {errors.namabarang && <p className="text-sm text-red-500">{errors.namabarang}</p>}
                </div>

                {/* Harga per Ukuran (tabel input) */}
                <div className="overflow-y-auto pr-1 space-y-4 flex-1">
                  <label className="block font-medium mb-1 text-sm text-zinc-700">Harga per Ukuran</label>

                  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 font-semibold text-sm text-zinc-800 px-4 py-2 border-b">
                      <div className="col-span-1">Ukuran</div>
                      <div className="col-span-1">Harga (Rp)</div>
                    </div>

                    {ukuran.map((u) => (
                      <div
                        key={u.ukuranid}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center px-4 py-2 border-b last:border-b-0"
                      >
                        <div className="text-zinc-700 text-sm">Ukuran - {u.ukuran}</div>
                        <input
                          type="number"
                          min="0"
                          placeholder="Harga"
                          value={hargaUkuran[u.ukuranid] || ""}
                          onChange={(e) =>
                            setHargaUkuran({
                              ...hargaUkuran,
                              [u.ukuranid]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                    ))}
                  </div>

                  {errors.barangukuran && (
                    <p className="text-sm text-red-500 mt-1">{errors.barangukuran}</p>
                  )}
                </div>

                {/* Upload Gambar */}
                <div>
                  <label htmlFor="gambarBarang" className="block font-medium mb-1">
                    Gambar Barang (opsional)
                  </label>
                  <input
                    type="file"
                    id="gambarBarang"
                    accept="image/*"
                    onChange={(e) => setGambarBarang(e.target.files[0])}
                    className="w-full bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-zinc-900 hover:file:bg-yellow-500"
                  />
                </div>

                {/* Tombol Tambah */}
                <div>
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full transition"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Tabel Barang */}
          <section className="bg-white text-zinc-800 p-6 rounded-lg shadow mb-8">
            <TableBarangList
              barang={barang}
              deleteBarang={deleteBarang}
              handleEdit={handleEdit}
            />
          </section>

          {/* Section Ukuran */}
          <section className="bg-white text-zinc-800 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold uppercase">Kelola Ukuran</h2>
              <button
                onClick={() => setShowUkuranSection(!showUkuranSection)}
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                {showUkuranSection ? "Tutup Kelola Ukuran" : "Buka Kelola Ukuran"}
              </button>
            </div>

            {showUkuranSection && (
              <div className="p-6 space-y-8">
                {/* Form Tambah Ukuran */}
                <div>
                  <h3 className="text-lg font-medium mb-4">FORM TAMBAH UKURAN</h3>
                  <form onSubmit={handleTambahUkuran} className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 text-zinc-600">Nama Ukuran</label>
                      <input
                        type="text"
                        placeholder="Masukkan ukuran (contoh: S, M, L)"
                        value={ukuranInput}
                        onChange={(e) => setUkuranInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full transition"
                    >
                      Tambah
                    </button>
                  </form>
                </div>

                {/* Tabel Ukuran */}
                <div>
                  <h3 className="text-lg font-medium mb-4">DAFTAR UKURAN</h3>
                  <UkuranList
                    data={ukuran}
                    deleteUkuran={handleDeleteUkuran}
                    handleEdit={handleEditUkuran}
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {isLoading && <LoadingSpinner />}

        {/* Modal Edit Ukuran */}
        {editId && (
          <UkuranEditForm
            id={editId}
            onClose={handleCloseEditUkuran}
            onUpdated={handleUkuranUpdated}
          />
        )}
      </div>
    </>
  )
}

export default FormListBarang

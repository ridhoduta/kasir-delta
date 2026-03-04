import React, { useState, useEffect } from 'react'
import { deleteUkuranById, getUkurans, postUkurans} from '../../api/ukuranApi'
import LoadingSpinner from '../../component/spinner/LoadingSpinner'
import UkuranList from '../../component/Ukuran/UkuranList'
import Sidebar from '../../component/sidebar/Sidebar'
import UkuranEditForm from '../../component/Ukuran/UkuranEditForm'
const FormUkuran = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [ukuran, setUkuran] = useState('')
  const [dataUkuran, setDataUkuran] = useState([])
  const [errors, setErrors] = useState({})
  const [editId, setEditId] = useState(null) // untuk modal edit

  useEffect(() => {
    fetchData()
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!ukuran.trim()) newErrors.ukuran = 'Ukuran tidak boleh kosong'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const fetchData = async () => {
    try {
      const response = await getUkurans()
      setDataUkuran(response.data)
    } catch (error) {
      console.error('Gagal mengambil data ukuran:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('ukuran', ukuran)

      const response = await postUkurans(formData)
      if (!response) {
        alert('Gagal menambahkan ukuran')
      }

      setUkuran('')
      fetchData()
    } catch (error) {
      console.error('Error:', error)
      setErrors({ global: 'Terjadi kesalahan saat menyimpan ukuran.' })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUkuran = async (id) => {
    if (!window.confirm('Yakin ingin menghapus ukuran ini?')) return

    try {
      await deleteUkuranById(id)
      alert('Ukuran berhasil dihapus.')
      fetchData()
    } catch (error) {
      console.error('Gagal menghapus ukuran:', error)
      alert('Gagal menghapus ukuran.')
    }
  }

  const handleEdit = (id) => {
    setEditId(id)
  }

  const handleCloseEdit = () => {
    setEditId(null)
  }

  const handleUpdated = () => {
    fetchData()
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1 min-h-screen md:ml-[240px] bg-zinc-900 text-white">
        <header className="bg-zinc-900 sticky top-0 z-40 shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold mb-0 text-center md:text-left w-full">
              Delta Konveksi
            </h1>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <section className="bg-white text-zinc-800 p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-6">FORM TAMBAH UKURAN</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.global && (
                <div className="text-red-600 font-medium">{errors.global}</div>
              )}
              <div className="space-y-2">
                <label htmlFor="ukuran" className="block font-medium">
                  Ukuran
                </label>
                <input
                  type="text"
                  id="ukuran"
                  placeholder="Masukkan ukuran (contoh: S, M, L)"
                  value={ukuran}
                  onChange={(e) => setUkuran(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.ukuran && (
                  <p className="text-red-500 text-sm">{errors.ukuran}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full transition"
                >
                  Tambah
                </button>
              </div>
            </form>
          </section>

          <section className="bg-white text-zinc-800 p-6 rounded-lg shadow">
            <UkuranList
              data={dataUkuran}
              deleteUkuran={deleteUkuran}
              handleEdit={handleEdit}
            />
          </section>
        </div>

        {isLoading && <LoadingSpinner />}

        {/* Modal Edit */}
        {editId && (
          <UkuranEditForm
            id={editId}
            onClose={handleCloseEdit}
            onUpdated={handleUpdated}
          />
        )}
      </div>
    </>
  )
}

export default FormUkuran

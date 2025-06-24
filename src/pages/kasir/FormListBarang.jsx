import React, { useEffect, useState } from 'react'
import Sidebar from '../../component/sidebar/Sidebar'
import TableBarangList from '../../component/tableBarang/TableBarangList'
import { deletebarang, getBarangs, postBarangs } from '../../api/barangApi'
import { getUkurans } from '../../api/ukuranApi'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../component/spinner/LoadingSpinner'
const FormListBarang = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [barang, setBarang] = useState([])

  const [ukuran, setUkuran] = useState([])
  const [namaBarang, setNamaBarang] = useState("")
  const [selectedUkuran, setSelectedUkuran] = useState(null)
  const [hargaBarang, setHargaBarang] = useState("")
  const [gambarBarang, setGambarBarang] = useState(null)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  
  // get ukuran
  const getUkuran = async () => {
    const response = await getUkurans()
    setUkuran(response.data)
  }

  // get barang
  const fetchBarang = async () => {
  const response = await getBarangs()
  setBarang(response.data) // tampilkan semua, tanpa filter
  }

  useEffect(() => {
    getUkuran()
    fetchBarang()
  }, [])

  const validate = () => {
    const newErrors = {}

    if (!namaBarang.trim()) {
      newErrors.namabarang = "Nama barang tidak boleh kosong"
    }

    if (!selectedUkuran) {
      newErrors.ukuranid = "Pilih ukuran barang"
    }

    if (!hargaBarang || isNaN(hargaBarang) || parseFloat(hargaBarang) <= 0) {
      newErrors.harga = "Harga harus berupa angka dan lebih dari 0"
    }

    const barangSudahAda = barang.some(b =>
      (b.namabarang || "").trim().toLowerCase() === namaBarang.trim().toLowerCase() &&
      b.ukuranid === selectedUkuran?.ukuranid
    )
    if (barangSudahAda) {
      newErrors.global = "Barang dengan ukuran tersebut sudah tersedia"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    const formData = new FormData()
    formData.append("namabarang", namaBarang)
    formData.append("ukuranid", selectedUkuran.ukuranid)
    formData.append("harga", hargaBarang)
    if (gambarBarang) {
      formData.append("gambar", gambarBarang)
    }
    setIsLoading(true);

    try {
      await postBarangs(formData)

      setNamaBarang("")
      setSelectedUkuran(null)
      setHargaBarang("")
      setGambarBarang(null)
      setErrors({})
      document.getElementById("gambarBarang").value = null
      fetchBarang()
    } catch (error) {
      console.error("Gagal menambah barang:", error)
      setErrors({ global: "Terjadi kesalahan saat menambah barang." })
    } finally {
      setIsLoading(false);
    }
  }
  // delete barang
  const deleteBarang = async (barangid) => {
  const konfirmasi = window.confirm('Yakin ingin menghapus barang ini?');
  if (!konfirmasi) return;

  try {
    const response = await deletebarang(barangid);
    fetchBarang()
    console.log("barang berhasil dihapus", response.data) 
  } catch (error) {
    console.error('Gagal menghapus barang:', error.response?.data || error.message);
  }

  // navigate edit
};
const handleEdit = (barangukuranid) => {
  navigate("/edit-barang", {
    state: { barangukuranid },
  });
};

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
      <h2 className="text-xl font-semibold mb-6">FORM TAMBAH BARANG</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.global && (
          <div className="text-red-600 font-medium">{errors.global}</div>
        )}

        {/* Nama Barang */}
        <div className="space-y-2">
          <label htmlFor="namaBarang" className="block font-medium">
            Nama Barang
          </label>
          <input
            type="text"
            id="namaBarang"
            placeholder="masukkan nama barang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.namabarang && (
            <p className="text-red-500 text-sm">{errors.namabarang}</p>
          )}
        </div>

        {/* Ukuran Barang */}
        <div className="space-y-2">
          <label htmlFor="ukuran" className="block font-medium">
            Ukuran Barang
          </label>
          <select
            id="ukuran"
            value={selectedUkuran?.ukuranid || ""}
            onChange={(e) => {
              const id = parseInt(e.target.value)
              const selected = ukuran.find(item => item.ukuranid === id)
              setSelectedUkuran(selected)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Pilih Ukuran</option>
            {ukuran.map((item) => (
              <option value={item.ukuranid} key={item.ukuranid}>
                {item.ukuran}
              </option>
            ))}
          </select>
          {errors.ukuranid && (
            <p className="text-red-500 text-sm">{errors.ukuranid}</p>
          )}
        </div>

        {/* Harga Barang */}
        <div className="space-y-2">
          <label htmlFor="hargaBarang" className="block font-medium">
            Harga Barang
          </label>
          <input
            type="number"
            id="hargaBarang"
            placeholder="masukkan harga barang"
            value={hargaBarang}
            onChange={(e) => setHargaBarang(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.harga && (
            <p className="text-red-500 text-sm">{errors.harga}</p>
          )}
        </div>

        {/* Gambar Barang */}
        <div className="space-y-2">
          <label htmlFor="gambarBarang" className="block font-medium">
            Gambar Barang
          </label>
          <input
            type="file"
            id="gambarBarang"
            accept="image/*"
            onChange={(e) => setGambarBarang(e.target.files[0])}
            className="w-full bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-zinc-900 hover:file:bg-yellow-500"
          />
        </div>

        {/* Tombol Submit */}
        <div>
          <button
            type="submit"
            id="tambahBtn"
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold px-6 py-2 rounded-full transition"
          >
            Tambah
          </button>
        </div>
      </form>
    </section>

    {/* Tabel List Barang */}
    <section className="bg-white text-zinc-800 p-6 rounded-lg shadow">
      <TableBarangList
        barang={barang}
        deleteBarang={deleteBarang}
        handleEdit={handleEdit}
      />
    </section>
  </div>

  {/* Loading */}
  {isLoading && <LoadingSpinner />}

      </div>

    </>
  )
}

export default FormListBarang

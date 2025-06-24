import { useEffect, useState } from "react" // sesuaikan
import { getUkuranByBarang } from "../../api/barangApi"
import { useKeranjang } from "../../contexts/KeranjangContext"

// import { X } from "lucide-react" // opsional: bisa pakai svg sendiri jika tidak pakai lucide-react

const DetailBarangForm = ({ barang, onClose }) => {
  const [daftarUkuran, setDaftarUkuran] = useState([])
  const [jumlah, setJumlah] = useState(1)
  const [keterangan, setKeterangan] = useState("")
  const [selectedUkuran, setSelectedUkuran] = useState(null)
  const [errors, setErrors] = useState({})
  const { tambahKeKeranjang } = useKeranjang()

  const validate = () => {
    const newErrors = {}
    if (!selectedUkuran) newErrors.ukuran = "Pilih ukuran terlebih dahulu."
    // if (!keterangan.trim()) newErrors.keterangan = "Keterangan tidak boleh kosong."
    if (jumlah <= 0 || isNaN(jumlah)) newErrors.jumlah = "Jumlah harus lebih dari 0."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleTambahPesanan = () => {
    if (!validate()) return

    const data = {
      barangid: barang.barangid,
      namabarang: barang?.namabarang || barang?.barang?.namabarang,
      ukuran: selectedUkuran.ukuran,
      ukuranid: selectedUkuran.ukuranid,
      harga: selectedUkuran.harga,
      gambar: barang.gambar,
      jumlah,
      keterangan
    }

    tambahKeKeranjang(data)
    onClose?.()
  }

  useEffect(() => {
    if (barang?.barangid) {
      getUkuranByBarang(barang.barangid)
        .then(res => setDaftarUkuran(Array.isArray(res.data) ? res.data : []))
        .catch(err => console.error("Gagal mengambil ukuran:", err))
    }
  }, [barang])

  return (
    <div className="relative bg-white text-zinc-800 p-6 rounded-lg shadow space-y-6 w-full max-w-xl mx-auto">

      {/* Tombol silang ❌ */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"
        title="Tutup"
        aria-label="Tutup form"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z" />
        </svg>
        </button>

      {/* Nama Barang */}
      <div className="text-xl font-semibold text-center">
        {barang?.barang?.namabarang || barang?.namabarang || 'Barang tidak ditemukan'}
      </div>

      {/* Ukuran */}
      <div className="space-y-2">
        <label className="block font-medium">Ukuran</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={selectedUkuran?.ukuranid || ""}
          onChange={(e) => {
            const id = parseInt(e.target.value)
            const selected = daftarUkuran.find(u => u.ukuranid === id)
            setSelectedUkuran(selected)
            setErrors(prev => ({ ...prev, ukuran: null }))
          }}
        >
          <option value="">Pilih Ukuran</option>
          {daftarUkuran.map((item) => (
            <option key={item.barangukuranid} value={item.ukuranid}>
              {item.ukuran} - Rp. {item.harga.toLocaleString('id-ID')}
            </option>
          ))}
        </select>
        {errors.ukuran && <p className="text-red-500 text-sm">{errors.ukuran}</p>}
      </div>

      {/* Jumlah (input manual) */}
      <div className="space-y-2">
        <label className="block font-medium">Jumlah</label>
        <input
          type="number"
          min="1"
          value={jumlah}
          onChange={(e) => setJumlah(parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {/* {errors.jumlah && <p className="text-red-500 text-sm">{errors.jumlah}</p>} */}
      </div>

      {/* Keterangan */}
      <div className="space-y-2">
        <label className="block font-medium">Keterangan</label>
        <input
          type="text"
          placeholder="Contoh: warna hitam, logo besar di belakang"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.keterangan && <p className="text-red-500 text-sm">{errors.keterangan}</p>}
      </div>

      {/* Tombol Kirim */}
      <button
        onClick={handleTambahPesanan}
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold rounded-full"
      >
        Tambah ke Keranjang
      </button>
    </div>
  )
}

export default DetailBarangForm

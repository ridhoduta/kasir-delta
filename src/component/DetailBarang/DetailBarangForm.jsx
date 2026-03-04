import { useEffect, useState } from "react"
import { getUkuranByBarang } from "../../api/barangApi"
import { useKeranjang } from "../../contexts/KeranjangContext"

const DetailBarangForm = ({ barang, onClose }) => {
  const [daftarUkuran, setDaftarUkuran] = useState([])
  const { tambahKeKeranjang } = useKeranjang()
  const [errors, setErrors] = useState("")

  useEffect(() => {
    if (barang?.barangid) {
      getUkuranByBarang(barang.barangid)
        .then(res => {
          if (Array.isArray(res.data)) {
            const data = res.data.map(item => ({ ...item, jumlah: '' }))
            setDaftarUkuran(data)
          }
        })
        .catch(err => console.error("Gagal mengambil ukuran:", err))
    }
  }, [barang])

  const handleChangeJumlah = (index, value) => {
  const newList = [...daftarUkuran]
  newList[index].jumlah = value // biarkan sebagai string
  setDaftarUkuran(newList)
}

  const handleTambahPesanan = () => {
    const dataYangDipilih = daftarUkuran
      .filter(item => parseInt(item.jumlah) > 0)
      .map(item => ({
        barangid: barang.barangid,
        namabarang: barang?.namabarang || barang?.barang?.namabarang,
        ukuran: item.ukuran,
        ukuranid: item.ukuranid,
        harga: item.harga,
        jumlah: parseInt(item.jumlah),
        gambar: barang.gambar,
      }))

    if (dataYangDipilih.length === 0) {
      setErrors("Silakan isi jumlah minimal untuk satu ukuran.")
      return
    }

    dataYangDipilih.forEach(item => tambahKeKeranjang(item))
    onClose?.()
  }

  return (
    <div className="relative bg-white text-zinc-800 p-6 rounded-lg shadow w-full max-w-xl mx-auto max-h-[80vh] flex flex-col">
      {/* Tombol Tutup */}
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
      <div className="text-xl font-semibold text-center mb-4 mt-2">
        {barang?.barang?.namabarang || barang?.namabarang || 'Barang tidak ditemukan'}
      </div>

      {/* Error */}
      {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

      {/* Scrollable Ukuran */}
      <div className="overflow-y-auto pr-1 space-y-4 flex-1">

        {/* Header Kolom */}
        <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
          <div>Ukuran</div>
          <div>Harga</div>
          <div>Jumlah</div>
        </div>

        {/* Daftar Ukuran */}
        {daftarUkuran.map((item, index) => (
          <div key={item.barangukuranid} className="grid grid-cols-3 gap-4 items-center">
            <div>Ukuran - {item.ukuran}</div>
            <div>Rp. {item.harga.toLocaleString('id-ID')}</div>
            <input
              type="number"
              min="0"
              value={item.jumlah}
              onChange={(e) => handleChangeJumlah(index, e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Jumlah Pesanan"
            />
          </div>
        ))}
      </div>

      {/* Tombol Tambah */}
      <button
        onClick={handleTambahPesanan}
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold rounded-full mt-6"
      >
        Tambah ke Keranjang
      </button>
    </div>
  )
}

export default DetailBarangForm

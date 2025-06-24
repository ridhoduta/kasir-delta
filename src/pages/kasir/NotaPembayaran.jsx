import React, { useRef } from 'react'
import Sidebar from '../../component/sidebar/Sidebar'
import PesananBarangList from '../../component/nota/PesananBaranglist'
import { useLocation } from 'react-router-dom'
import { useKeranjang } from '../../contexts/KeranjangContext'
import html2pdf from 'html2pdf.js'

const NotaPembayaran = () => {
  const location = useLocation()
  const pesanan = location?.state?.pesanan
  const { keranjang } = useKeranjang()
  const notaRef = useRef()

  const today = new Date()
  const tanggalHariIni = today.toISOString().split('T')[0] // hasil: "2025-06-23"

  const generatePDF = () => {
    const element = notaRef.current
    const options = {
      margin: 0.5,
      filename: `invoice-${tanggalHariIni}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(options).from(element).save()
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center py-6 px-4 bg-zinc-900 min-h-screen">
       <header className="bg-zinc-900 shadow sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-center w-full md:w-auto md:text-left">
        Delta Konveksi
      </h1>
    </div>
  </header>
        <div
          ref={notaRef}
          className="max-w-3xl w-full bg-white text-black p-6 rounded-lg shadow-lg space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-bold">Delta Konveksi</h1>
            <span className="text-sm text-gray-600">{tanggalHariIni}</span>
          </div>

          {/* Client Info */}
          <div className="text-sm">
            <p className="font-semibold">{pesanan.detail[0]?.namapesanan}</p>
            <p>{pesanan.detail[0]?.keterangan}</p>
            <p>{pesanan.detail[0]?.alamat}</p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 md:grid-cols-4 text-sm gap-y-2 mt-2">
            <div className="font-medium">Invoice Date</div>
            <div>{tanggalHariIni}</div>
            <div className="font-medium">Payment Due</div>
            <div>{tanggalHariIni}</div>
          </div>

          {/* Services / List Pesanan */}
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Pesanan</h3>
            <PesananBarangList data={keranjang} />
          </div>

          {/* Total */}
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <div className="text-base font-semibold">Total IDR</div>
              <div className="text-xl font-bold text-yellow-500">
                Rp {pesanan.totalharga.toLocaleString('id-ID')}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 mt-8 grid md:grid-cols-2 gap-6 text-sm">
            {/* Company Info */}
            <div className="flex gap-4">
              <div className="relative w-10 h-10 bg-yellow-400 rounded-lg">
                <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold">DELTA KONVEKSI</div>
                <div>Bintaragen Temanggung / 081234567890</div>
                <div>deltakonveksi@gmail.com</div>
                <div>CWR Lake</div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className="font-semibold mb-1">Additional Notes</div>
              <p className="text-gray-700">Thank you for your business</p>
            </div>
          </div>
        </div>
            <button
    onClick={generatePDF}
    className="fixed bottom-6 right-6 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold rounded-full shadow-md transition-all z-50"
  >
    Download PDF
  </button>
      </div>
    </>
  )
}

export default NotaPembayaran

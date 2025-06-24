import React, {useEffect, useState } from 'react';
import '../../ownerBeranda.css';
import SidebarOwner from '../../component/sidebar/SidebarOwner';
import { getPemasukans } from '../../api/pemasukanApi';
import { getPengeluarans } from '../../api/pengeluaran';
import { getpesanans } from '../../api/pesananAPI';

const Beranda = () => {
  const [pemasukan, setPemasukkan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const [filterTahun, setFilterTahun] = useState();
  // const [filterPeriode, setFilterPeriode] = useState('Period');
  const [tahunList, setTahunList] = useState([]);
  


  // Ambil semua data saat mount
useEffect(() => {
  const fetchAllData = async () => {
    const [resPemasukan, resPengeluaran, resPesanan] = await Promise.all([
      getPemasukans(),
      getPengeluarans(),
      getpesanans()
    ]);

    const dataPemasukan = resPemasukan.data || [];
    const dataPengeluaran = resPengeluaran.data || [];
    const dataPesanan = resPesanan.data || [];

    setPemasukkan(dataPemasukan);
    setPengeluaran(dataPengeluaran);
    setPesanan(dataPesanan);

    // Gabungkan semua tahun dari 3 sumber data
    const semuaTahun = [
      ...dataPemasukan.map(item => new Date(item.created_at).getFullYear().toString()),
      ...dataPengeluaran.map(item => new Date(item.created_at).getFullYear().toString()),
      ...dataPesanan.map(item => new Date(item.created_at).getFullYear().toString())
    ];

    const tahunUnik = [...new Set(semuaTahun)].sort((a, b) => b - a);
    setTahunList(tahunUnik);

    // Default tahun filter: tahun terbaru jika belum dipilih
    if (!filterTahun && tahunUnik.length > 0) {
      setFilterTahun(tahunUnik[0]);
    }
  };

  fetchAllData();
},);

const filterByTahun = (data) => {
  if (!filterTahun) return data;
  return data.filter((item) => {
    const tahun = new Date(item.created_at).getFullYear().toString();
    return tahun === filterTahun;
  });
};

  const filteredPemasukan = filterByTahun(pemasukan);
  const filteredPengeluaran = filterByTahun(pengeluaran);
  const filteredPesanan = filterByTahun(pesanan);

  const totalPemasukan = filteredPemasukan.reduce((total, item) => total + item.harga, 0);
  const totalPengeluaran = filteredPengeluaran.reduce((total, item) => total + item.harga, 0);
  const totalBersih = totalPemasukan - totalPengeluaran;

  const frekuensiBarang = {};
  filteredPesanan.forEach(pesanan => {
    const namaBarangUnik = new Set();
    pesanan.detail_pesanan.forEach(detail => {
      const nama = detail.barang?.namabarang ?? 'Tidak diketahui';
      namaBarangUnik.add(nama);
    });
    namaBarangUnik.forEach(nama => {
      frekuensiBarang[nama] = (frekuensiBarang[nama] || 0) + 1;
    });
  });

  const barangData = Object.entries(frekuensiBarang); 
  const total = barangData.reduce((sum, [, jumlah]) => sum + jumlah, 0);
  const pieSegments = [];
  let offset = 0;

  barangData.forEach(([nama, jumlah], index) => {
    const nilai = (jumlah / total) * 251.2;
    pieSegments.push({
      nama,
      jumlah,
      dasharray: nilai,
      dashoffset: -offset,
      color: ['#d32f2f', '#f57c00', '#fbc02d', '#388e3c', '#1976d2'][index % 5],
    });
    offset += nilai;
  });

  const getMonthlyTotals = () => {
    const bulanMap = {
      0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
      6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    const initBulan = Object.keys(bulanMap).map((key) => ({
      month: bulanMap[key],
      pemasukan: 0,
      pengeluaran: 0,
      bersih: 0,
    }));

    filteredPemasukan.forEach((item) => {
      const bulan = new Date(item.created_at).getMonth();
      initBulan[bulan].pemasukan += item.harga;
    });

    filteredPengeluaran.forEach((item) => {
      const bulan = new Date(item.created_at).getMonth();
      initBulan[bulan].pengeluaran += item.harga;
    });

    initBulan.forEach((data) => {
      data.bersih = data.pemasukan - data.pengeluaran;
    });

    return initBulan;
  };

  const getMonthlyWeeklyTotals = () => {
    const getWeekOfMonth = (date) => {
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      return Math.ceil((date.getDate() + firstDay) / 7);
    };

    const dataMap = {};

    const addToMap = (arr, type) => {
      arr.forEach((item) => {
        const date = new Date(item.created_at);
        const tahun = date.getFullYear().toString();
        if (tahun !== filterTahun) return;

        const bulan = date.toLocaleString('default', { month: 'short' });
        const minggu = `M${getWeekOfMonth(date)}`;

        const key = `${bulan}-${minggu}`;
        if (!dataMap[key]) {
          dataMap[key] = { pemasukan: 0, pengeluaran: 0, bersih: 0 };
        }

        if (type === 'pemasukan') {
          dataMap[key].pemasukan += item.harga;
        } else if (type === 'pengeluaran') {
          dataMap[key].pengeluaran += item.harga;
        }
      });
    };

    addToMap(filteredPemasukan, 'pemasukan');
    addToMap(filteredPengeluaran, 'pengeluaran');

    Object.entries(dataMap).forEach(([ _ , value]) => {
      value.bersih = value.pemasukan - value.pengeluaran;
    });

    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const sorted = Object.entries(dataMap).sort(([a], [b]) => {
      const [bulanA, mingguA] = a.split('-');
      const [bulanB, mingguB] = b.split('-');
      const idxA = monthOrder.indexOf(bulanA);
      const idxB = monthOrder.indexOf(bulanB);
      if (idxA !== idxB) return idxA - idxB;
      return parseInt(mingguA.replace('M', '')) - parseInt(mingguB.replace('M', ''));
    });

    return sorted.map(([label, value]) => ({ label, ...value }));
  };

  const monthlyData = getMonthlyTotals();
  const monthlyWeeklyData = getMonthlyWeeklyTotals();
  const getMaxValue = (data, keys) => {
  let max = 0;
  data.forEach((item) => {
    keys.forEach((key) => {
      if (item[key] > max) max = item[key];
    });
  });
  return max;
};
const monthlyMax = getMaxValue(monthlyData, ['pemasukan', 'pengeluaran', 'bersih']);
const weeklyMax = getMaxValue(monthlyWeeklyData, ['pemasukan', 'pengeluaran', 'bersih']);

  return (
    <>
      <SidebarOwner />
      <div className="flex-1 min-h-screen md:ml-60 bg-gray-100 text-black">

  {/* Header */}
  <header className="bg-zinc-900 sticky top-0 z-40 shadow text-white">
    <div className="max-w-7xl mx-auto px-2 py-2">
      <h1 className="text-xl font-bold text-center md:text-left">Delta Konveksi</h1>
    </div>
  </header>

  {/* Konten */}
  <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

    {/* Filter */}
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <label className="font-medium">Filter Tahun:</label>
      <select
  value={filterTahun}
  onChange={(e) => setFilterTahun(e.target.value)}
  className="mb-4 px-3 py-2 rounded-md border"
>
  {tahunList.map((tahun) => (
    <option key={tahun} value={tahun}>
      {tahun}
    </option>
  ))}
</select>
    </div>

    {/* Data Keuangan */}
    <section>
      <h2 className="text-lg font-semibold mt-4 mb-4">Data Keuangan</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* Kartu Statistik */}
        <div className="bg-white shadow rounded-lg p-4 text-center space-y-2">
          <div className="text-green-600 text-2xl">↗</div>
          <div className="text-lg font-semibold text-zinc-800">Rp.{totalPemasukan.toLocaleString('id-ID')}</div>
          <div className="text-sm text-gray-500">Pemasukan</div>
          <div className="text-xs text-gray-400">Periode {filterTahun}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center space-y-2">
          <div className="text-red-600 text-2xl">↘</div>
          <div className="text-lg font-semibold text-zinc-800">Rp.{totalPengeluaran.toLocaleString('id-ID')}</div>
          <div className="text-sm text-gray-500">Pengeluaran</div>
          <div className="text-xs text-gray-400">Periode {filterTahun}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center space-y-2">
          <div className="text-zinc-600 text-2xl">🛒</div>
          <div className="text-lg font-semibold">{filteredPesanan.length}</div>
          <div className="text-sm text-gray-500">Total Pesanan</div>
          <div className="text-xs text-gray-400">Periode {filterTahun}</div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 text-center space-y-2">
          <div className="text-blue-600 text-2xl">📈</div>
          <div className="text-lg font-semibold">Rp.{totalBersih.toLocaleString('id-ID')}</div>
          <div className="text-sm text-gray-500">Pendapatan Bersih</div>
          <div className="text-xs text-gray-400">Periode {filterTahun}</div>
        </div>
      </div>
    </section>

    {/* Charts */}
    <section className="grid gap-6 md:grid-cols-2">

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold mb-4">Pesanan Barang</h3>
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {pieSegments.map((segment, i) => (
              <circle
                key={i}
                cx="50" cy="50" r="40"
                fill="none"
                stroke={segment.color}
                strokeWidth="20"
                strokeDasharray={`${segment.dasharray} 251.2`}
                strokeDashoffset={segment.dashoffset}
              />
            ))}
          </svg>
        </div>
        <div className="space-y-2">
          {pieSegments.map((segment, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                <span>{segment.nama}</span>
              </div>
              <strong>{segment.jumlah}x</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart Bulanan */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="font-semibold mb-4">Ringkasan Keuangan Bulanan</h3>
        <div className="flex items-end gap-4 h-64">
          {monthlyData.map(({ month, pemasukan, pengeluaran, bersih }) => (
            <div className="text-center" key={month}>
              <div className="flex flex-col gap-1 justify-end h-48">
                <div
                  className="w-4 bg-green-600 rounded"
                  style={{ height: `${(pemasukan / monthlyMax) * 100}%` }}
                  title={`Pemasukan: Rp${pemasukan.toLocaleString('id-ID')}`}
                />
                <div
                  className="w-4 bg-red-600 rounded"
                  style={{ height: `${(pengeluaran / monthlyMax) * 100}%` }}
                  title={`Pengeluaran: Rp${pengeluaran.toLocaleString('id-ID')}`}
                />
                <div
                  className="w-4 bg-blue-600 rounded"
                  style={{ height: `${(bersih / monthlyMax) * 100}%` }}
                  title={`Bersih: Rp${bersih.toLocaleString('id-ID')}`}
                />
              </div>
              <div className="text-xs mt-1">{month}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Pemasukan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span>Pengeluaran</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Bersih</span>
          </div>
        </div>
      </div>
    </section>

    {/* Bar Chart Mingguan */}
    <section className="bg-white shadow rounded-lg p-6">
      <h3 className="font-semibold mb-4">Data Keuangan Mingguan per Bulan</h3>
      <div className="flex items-end gap-4 overflow-x-auto h-64">
        {monthlyWeeklyData.map(({ label, pemasukan, pengeluaran, bersih }) => (
          <div className="text-center" key={label}>
            <div className="flex flex-col gap-1 justify-end h-48">
              <div
                className="w-4 bg-green-600 rounded"
                style={{ height: `${(pemasukan / weeklyMax) * 100}%` }}
                title={`Pemasukan: Rp${pemasukan.toLocaleString('id-ID')}`}
              />
              <div
                className="w-4 bg-red-600 rounded"
                style={{ height: `${(pengeluaran / weeklyMax) * 100}%` }}
                title={`Pengeluaran: Rp${pengeluaran.toLocaleString('id-ID')}`}
              />
              <div
                className="w-4 bg-blue-600 rounded"
                style={{ height: `${(bersih / weeklyMax) * 100}%` }}
                title={`Bersih: Rp${bersih.toLocaleString('id-ID')}`}
              />
            </div>
            <div className="text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <span>Pemasukan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span>Pengeluaran</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Bersih</span>
        </div>
      </div>
    </section>

  </main>
</div>

    </>
  );
};

export default Beranda;

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

const SidebarAdmin = () => {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const {logout} = useAuth()
    const [open, setOpen] = useState(false);

  return (
    <>
    {/* <div className='dashboard'>
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <div className="logo-dot dot-1"></div>
            <div className="logo-dot dot-2"></div>
          </div>
          <div className="logo-text">Delta Konveksi</div>
        </div>
        
        <ul className="menu-items">
         <li className={`menu-item ${isActive('/') || isActive('/pesanan') ? 'active' : ''}`}>
            <Link to="/pesanan" className="menu-link">
              <div className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                </svg>
              </div>
              <div className="menu-text">Pesanan</div>
            </Link>
          </li>
          <li className={`menu-item ${isActive('/bahan') ? 'active' : ''}`}>
            <Link to="/bahan" className="menu-link">
              <div className="menu-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>
                </div>
              <div className="menu-text">Bahan</div>
            </Link>
          </li>
          <li className='menu-item'>
            <div className='menu-link' onClick={logout}>
                <p className='menu-text'>Logout</p>
            </div>
          </li>
        </ul>
      </div>
    </div> */}
    <button
            className="md:hidden fixed top-4 left-4 z-50 bg-yellow-400 p-2 rounded"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
    
          {/* Sidebar overlay untuk mobile */}
          <div
            className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
              open ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={() => setOpen(false)}
          />
    
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-full w-60 bg-zinc-900 text-white z-50 transform transition-transform duration-300 md:translate-x-0 ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Tombol tutup (X) */}
            <div className="flex justify-end md:hidden p-4">
              <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
            </div>
            {/* Konten sidebar */}
            <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-left pl-4 w-full">
                        Delta Konveksi
            </h2>
              
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/beranda-owner"
                    className={`flex items-center px-4 py-2 rounded transition-all ${
                      isActive('/beranda-owner') ? 'bg-zinc-800 text-white border-l-4 border-yellow-400'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
              </svg>
                    </div>
                    <span>beranda</span>
                  </Link>
                 
                </li>
                
                <li>
                  <Link
                  to="/pesanan"
                  className={`flex items-center px-4 py-2 rounded transition-all ${
                    isActive('/pesanan') || isActive('/tambah-bahan') ? 'bg-zinc-800 text-white border-l-4 border-yellow-400'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-5 h-5 mr-3 opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                    </svg>
                  </div>
                  <span>Pesanan</span>
                </Link>
                    
                  </li>
                  <li>
                      <Link
                    to="/pemasukan"
                    className={`flex items-center px-4 py-2 rounded transition-all ${
                      isActive('/pemasukan')
                        ? 'bg-zinc-800 text-white border-l-4 border-yellow-400'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                    </div>
                    <span>Pemasukan</span>
                  </Link>
                  </li>
                  <li>
                      <Link
                    to="/pengeluaran"
                    className={`flex items-center px-4 py-2 rounded transition-all ${
                      isActive('/pengeluaran')
                        ? 'bg-zinc-800 text-white border-l-4 border-yellow-400'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                    </div>
                    <span>Pengeluaran</span>
                  </Link>
                  </li>
                  <li>
                   <Link
                  to="/bahan"
                  className={`flex items-center px-4 py-2 rounded transition-all ${
                    isActive('/bahan') || isActive('/update-bahan')
                      ? 'bg-zinc-800 text-white border-l-4 border-yellow-400'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <div className="w-5 h-5 mr-3 opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg>
                  </div>
                  <span>Bahan</span>
                </Link>
                </li>
                <li>
                  <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 rounded text-zinc-300 hover:bg-red-600 transition-all"
                >
                  <div className="w-5 h-5 mr-3 opacity-70">🔒</div>
                  <span>Logout</span>
                </button>
                </li>
              </ul>
            </div>
          </aside>
    </>
  )
}

export default SidebarAdmin

import React from 'react'
import SidebarAdmin from '../component/sidebar/SidebarAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <SidebarAdmin />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout

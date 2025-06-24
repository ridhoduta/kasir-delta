import React from 'react'
import SidebarOwner from '../component/sidebar/SidebarOwner'
import { Outlet } from 'react-router-dom'

const OwnerLayout = () => {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <SidebarOwner />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default OwnerLayout

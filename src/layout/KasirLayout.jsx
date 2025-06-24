// components/KasirLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/sidebar/Sidebar';

export default function KasirLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

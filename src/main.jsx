import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KeranjangProvider } from './contexts/KeranjangContext'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <KeranjangProvider>
        <App />
      </KeranjangProvider>
    </AuthProvider>

)

import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    if (user.role_id === 1) return <Navigate to="/home" replace />;
    if (user.role_id === 2) return <Navigate to="/beranda-owner" replace />;
    return <Navigate to="/home" replace />; // fallback
  }

  return children
}

export default GuestRoute

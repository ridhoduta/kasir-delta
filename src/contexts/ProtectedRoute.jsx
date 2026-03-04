import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // atau spinner loading
  }

  if (!user) {
    return <Navigate to="/" replace />; // redirect ke login
  }

  if (allowedRoles && !allowedRoles.includes(user.role_id)) {
    alert('tidak memiliki akses')
    return navigate('/');
  }

  return children;
};

export default ProtectedRoute;

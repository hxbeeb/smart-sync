import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  return !user ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;

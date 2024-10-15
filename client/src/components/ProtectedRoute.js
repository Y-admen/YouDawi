import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const user = jwtDecode(token);

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }

    // Check if the user role is allowed
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
    }

    return children;

  } catch (error) {
    // If decoding fails, clear the token and redirect to login
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

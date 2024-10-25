import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token is found
  }

  try {
    const user = jwtDecode(token); // Decode JWT to get user info

    // Check if token is expired
    const currentTime = Date.now() / 1000; // Get current time in seconds
    // if (user.exp < currentTime) {
    //   localStorage.removeItem('token'); // Remove expired token
    //   return <Navigate to="/login" />; // Redirect to login if expired
    // }

    // Check if the user role is allowed
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/public-home" />; // Redirect to unauthorized page
    }

    return children; // Render the child components if all checks pass

  } catch (error) {
    // Clear invalid or corrupt token
    localStorage.removeItem('token');
    return <Navigate to="/login" />; // Redirect to login if token is invalid
  }
};

export default ProtectedRoute;

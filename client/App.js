import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import DoctorList from './components/DoctorList';
import About from './components/About';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Home from './components/Home';
import Appointements from './components/Appointements';
import Patients from './components/Patients';
import ComponentsPreview from './components/ComponentsPreview';
import DoctorLogin from './components/DoctorLogin';
import DoctorRegister from './components/DoctorRegister';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected routes inside Layout */}
        <Route path="/" element={<Layout role="doctor" />}>
          {/* Redirect root to /components-preview */}
          <Route index element={<Navigate to="/components-preview" />} />

          {/* Doctor routes */}
          <Route
            path="home"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="doctors"
            element={
              <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                <DoctorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="appointments"
            element={
              <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                <Appointements />
              </ProtectedRoute>
            }
          />
          <Route
            path="patients"
            element={
              <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                <Patients />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes (outside of layout) */}
        <Route path="components-preview" element={<ComponentsPreview />} />
        <Route path="public-home" element={<LandingPage />} />
        <Route path="doctor-register" element={<DoctorRegister />} />
        <Route path="doctor-login" element={<DoctorLogin />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

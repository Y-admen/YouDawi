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
import DoctorProfile from './components/DoctorProfile';
import DoctorRegister from './components/DoctorRegister';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import PatientDashboard from './components/PatientDashboard';
import NurseLogin from './components/NurseLogin';
import PatientProfile from './components/PatientProfile';
import PatientAppointments from './components/PatientAppointments';


import DoctorNurseDashboard from './components/DoctorNurseDashboard';
import { RoleProvider } from './components/RoleContext';
import { jwtDecode } from 'jwt-decode';
import ForgetPassword from './components/ForgetPassword';

function App() {
  const token = localStorage.getItem('token');
  let decodedToken = null;
  let role = null;

  if (token) {
    decodedToken = jwtDecode(token);  // Decode the token
    role = decodedToken.role;  // Extract the role from the token
  }

  return (
    <RoleProvider role={role}>  {/* Provide role globally */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout role={role} />}>
            {/* Redirect root to dashboard */}
            <Route index element={<Navigate to="/dashboard" />} />

            {/* Shared Doctor and Nurse Dashboard */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                  <DoctorNurseDashboard role={role} />  {/* Pass role as a prop */}
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

            {/* Patient Dashboard */}
            <Route
              path="patient-dashboard"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }

            />

            {/* Doctors */}
            <Route
              path="doctors"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DoctorList />
                </ProtectedRoute>
              }

            />

            {/* Patient Appointments */}
            <Route
              path="patient-appointments"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientAppointments patientId={decodedToken.id} />
                </ProtectedRoute>
              }

            />
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/nurse-login" element={<NurseLogin />} />
          <Route path="/public-home" element={<LandingPage />} />
          <Route path="/components-preview" element={<ComponentsPreview />} />
          <Route path="doctor-profile" element={<DoctorProfile />} />
          <Route path="patient-profile" element={<PatientProfile />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </RoleProvider >
  );
}

export default App;

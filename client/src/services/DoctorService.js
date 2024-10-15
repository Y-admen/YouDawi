import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors'; // todo: Update this

// Set JWT token for authorized requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Register a new doctor
export const registerDoctor = async (doctorData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${API_URL}/register`, doctorData, config);
    return response.data;
  } catch (error) {
    handleError(error, 'Error registering doctor');
  }
};

// Request password reset
export const requestResetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/request-reset-password`, { email });
    return response.data;
  } catch (error) {
    handleError(error, 'Error requesting password reset');
  }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    handleError(error, 'Error resetting password');
  }
};

// Doctor login
export const loginDoctor = async (loginData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${API_URL}/login`, loginData, config);

    if (response.headers['content-type'].includes('application/json')) {
      const { token, doctor } = response.data;
      setAuthToken(token);  // Set token for future requests
      return { doctor, token };  // Return doctor info and token
    } else {
      throw new Error('Expected JSON response but received a different format.');
    }
  } catch (error) {
    handleError(error, 'Error logging in');
  }
};

// Get all doctors (with pagination)
export const getAllDoctors = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctors');
  }
};

// Get doctor by specialty
export const getDoctorsBySpecialty = async (specialty) => {
  try {
    const response = await axios.get(`${API_URL}/specialty`, { params: { specialty } });
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctors by specialty');
  }
};

// Get doctors by name
export const getDoctorsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name`, { params: { name } });
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctors by name');
  }
};

// Get doctors by location
export const getDoctorsByLocation = async (location) => {
  try {
    const response = await axios.get(`${API_URL}/location`, { params: { location } });
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctors by location');
  }
};

// Get doctor by ID
export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctor by ID');
  }
};

// Update doctor profile
export const updateDoctor = async (id, updateData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.put(`${API_URL}/${id}`, updateData, config);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating doctor profile');
  }
};

// Update doctor status
export const updateDoctorStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/status/${id}`, { status });
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating doctor status');
  }
};

// Delete doctor account
export const deleteDoctor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error deleting doctor account');
  }
};

// Get doctor's schedule
export const getDoctorSchedule = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/schedule/${doctorId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctor schedule');
  }
};

// Update doctor's schedule
export const updateDoctorSchedule = async (doctorId, scheduleData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.put(`${API_URL}/schedule/${doctorId}`, scheduleData, config);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating doctor schedule');
  }
};

// Get doctor profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching profile');
  }
};

// Get doctor dashboard
export const getDoctorDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching dashboard');
  }
};

// Register a new nurse
export const registerNurse = async (nurseData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post(`${API_URL}/register-nurse`, nurseData, config);
    return response.data;
  } catch (error) {
    handleError(error, 'Error registering nurse');
  }
};

// Rate a doctor
export const rateDoctor = async (doctorId, rating) => {
  try {
    const response = await axios.post(`${API_URL}/rate/${doctorId}`, { rating });
    return response.data;
  } catch (error) {
    handleError(error, 'Error rating doctor');
  }
};

// Get doctor ratings
export const getDoctorRatings = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/ratings/${doctorId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching doctor ratings');
  }
};

// Error handler function
const handleError = (error, defaultMessage) => {
  console.error(error.response || error.message);
  if (error.response) {
    throw new Error(error.response.data?.message || defaultMessage);
  } else if (error.request) {
    throw new Error('No response from server. Please try again.');
  } else {
    throw new Error('Error: ' + error.message);
  }
};

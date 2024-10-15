import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:5000/api/nurses'; // todo: Update this

const nurseService = {

    /**
     * Log in a nurse
     * @param {Object} loginData - Contains email and password
     * @returns {Promise} - Resolves to the token if login is successful
     */
    loginNurse: async (loginData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, loginData);
            const token = response.data.data.token;

            // Save the token in localStorage (you can change this if needed)
            localStorage.setItem('nurseToken', token);

            return token;
        } catch (error) {
            console.error('Error logging in nurse:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Request a password reset
     * @param {string} email - Nurse's email address
     * @returns {Promise} - Resolves if the password reset email is successfully sent
     */
    requestResetPassword: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/requestResetPassword`, { email });
            return response.data;
        } catch (error) {
            console.error('Error requesting password reset:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Reset password
     * @param {string} token - Reset token
     * @param {string} password - New password
     * @returns {Promise} - Resolves if the password is successfully reset
     */
    resetPassword: async (token, password) => {
        try {
            const response = await axios.post(`${API_URL}/resetPassword/${token}`, { password });
            return response.data;
        } catch (error) {
            console.error('Error resetting password:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Fetch the logged-in nurse's profile
     * @param {string} token - JWT token
     * @returns {Promise} - Resolves to the nurse's profile data
     */
    getProfile: async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`${API_URL}/profile`, config);
            return response.data.data.nurse;
        } catch (error) {
            console.error('Error fetching nurse profile:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Fetch the nurse's dashboard data (appointments, patients, etc.)
     * @param {string} token - JWT token
     * @returns {Promise} - Resolves to the nurse's dashboard data
     */
    getDashboard: async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`${API_URL}/dashboard`, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching nurse dashboard:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Fetch all nurses (Admin or Doctor use case)
     * @param {Object} params - Pagination params (limit, page)
     * @returns {Promise} - Resolves to the list of nurses
     */
    getAllNurses: async (params) => {
        try {
            const response = await axios.get(`${API_URL}`, { params });
            return response.data.data.nurses;
        } catch (error) {
            console.error('Error fetching nurses:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Fetch nurse details by ID
     * @param {string} nurseId - Nurse's ID
     * @returns {Promise} - Resolves to the nurse's details
     */
    getNurseById: async (nurseId) => {
        try {
            const response = await axios.get(`${API_URL}/${nurseId}`);
            return response.data.data.nurse;
        } catch (error) {
            console.error('Error fetching nurse details:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update a nurse's details
     * @param {string} token - JWT token
     * @param {string} nurseId - Nurse's ID
     * @param {Object} updatedData - Data to update
     * @returns {Promise} - Resolves to the updated nurse's data
     */
    updateNurse: async (token, nurseId, updatedData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(`${API_URL}/${nurseId}`, updatedData, config);
            return response.data.data.nurse;
        } catch (error) {
            console.error('Error updating nurse:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Deactivate or delete a nurse
     * @param {string} token - JWT token
     * @param {string} nurseId - Nurse's ID
     * @param {Object} updateData - Contains the status (e.g., 'Inactive')
     * @returns {Promise} - Resolves when the nurse is deactivated or deleted
     */
    deactivateNurse: async (token, nurseId, updateData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(`${API_URL}/${nurseId}/deactivate`, updateData, config);
            return response.data.data.nurse;
        } catch (error) {
            console.error('Error deactivating nurse:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    }
};

export default nurseService;

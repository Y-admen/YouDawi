import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/appointments'; // todo: Update this

const appointmentService = {

    /**
     * Get all appointments with pagination
     * @param {Object} params - Contains limit and page for pagination
     * @returns {Promise} - Resolves to the list of appointments
     */
    getAllAppointments: async (params) => {
        try {
            const response = await axios.get(API_URL, { params });
            return response.data.data.appointments;
        } catch (error) {
            console.error('Error fetching appointments:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Create a new appointment
     * @param {Object} appointmentData - Appointment details (patientId, doctorId, appointmentDate, appointmentTime, etc.)
     * @returns {Promise} - Resolves to the newly created appointment
     */
    postAppointment: async (appointmentData) => {
        try {
            const response = await axios.post(API_URL, appointmentData);
            return response.data.data.appointment;
        } catch (error) {
            console.error('Error creating appointment:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get an appointment by its ID
     * @param {string} id - Appointment ID
     * @returns {Promise} - Resolves to the appointment details
     */
    getAppointmentById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.data.appointment;
        } catch (error) {
            console.error('Error fetching appointment by ID:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update an appointment by its ID
     * @param {string} id - Appointment ID
     * @param {Object} updatedData - Data to update in the appointment
     * @returns {Promise} - Resolves to the updated appointment
     */
    updateAppointment: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            return response.data.data.appointment;
        } catch (error) {
            console.error('Error updating appointment:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Delete an appointment by its ID
     * @param {string} id - Appointment ID
     * @returns {Promise} - Resolves if the appointment is deleted successfully
     */
    deleteAppointment: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting appointment:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get all appointments by Doctor ID with pagination
     * @param {string} doctorId - Doctor ID
     * @param {Object} params - Contains limit and page for pagination
     * @returns {Promise} - Resolves to the list of doctor appointments
     */
    getAppointmentsByDoctorId: async (doctorId, params) => {
        try {
            const response = await axios.get(`${API_URL}/doctor/${doctorId}`, { params });
            return response.data.data.doctorAppointments;
        } catch (error) {
            console.error('Error fetching doctor appointments:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get all appointments by Patient ID with pagination
     * @param {string} patientId - Patient ID
     * @param {Object} params - Contains limit and page for pagination
     * @returns {Promise} - Resolves to the list of patient appointments
     */
    getAppointmentsByPatientId: async (patientId, params) => {
        try {
            const response = await axios.get(`${API_URL}/patient/${patientId}`, { params });
            return response.data.data.patientAppointments;
        } catch (error) {
            console.error('Error fetching patient appointments:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Approve an appointment by its ID
     * @param {string} id - Appointment ID
     * @returns {Promise} - Resolves to the approved appointment
     */
    approveAppointment: async (id) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}/approve`);
            return response.data;
        } catch (error) {
            console.error('Error approving appointment:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Cancel an appointment by its ID
     * @param {string} id - Appointment ID
     * @returns {Promise} - Resolves to the cancelled appointment
     */
    cancelAppointment: async (id) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}/cancel`);
            return response.data;
        } catch (error) {
            console.error('Error cancelling appointment:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Set push notification subscription for a patient
     * @param {string} patientId - Patient ID
     * @param {Object} subscriptionData - Push notification subscription details
     * @returns {Promise} - Resolves if the subscription is set successfully
     */
    setPushSubscription: async (patientId, subscriptionData) => {
        try {
            const response = await axios.post(`${API_URL}/patient/${patientId}/subscribe`, subscriptionData);
            return response.data;
        } catch (error) {
            console.error('Error setting push subscription:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get push notification subscription for a patient
     * @param {string} patientId - Patient ID
     * @returns {Promise} - Resolves to the push subscription details
     */
    getPushSubscription: async (patientId) => {
        try {
            const response = await axios.get(`${API_URL}/patient/${patientId}/subscribe`);
            return response.data.data.pushSubscription;
        } catch (error) {
            console.error('Error fetching push subscription:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    }
};

export default appointmentService;

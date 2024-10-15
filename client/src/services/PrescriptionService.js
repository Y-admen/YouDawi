import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/prescriptions'; // todo: Update this

const prescriptionService = {

    /**
     * Get all prescriptions with pagination
     * @param {Object} params - Contains limit and page for pagination
     * @returns {Promise} - Resolves to the list of prescriptions
     */
    getAllPrescriptions: async (params) => {
        try {
            const response = await axios.get(API_URL, { params });
            return response.data.data.prescriptions;
        } catch (error) {
            console.error('Error fetching prescriptions:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Create a new prescription
     * @param {Object} prescriptionData - Prescription details (patientId, doctorId, medications, etc.)
     * @returns {Promise} - Resolves to the newly created prescription
     */
    postPrescription: async (prescriptionData) => {
        try {
            const response = await axios.post(API_URL, prescriptionData);
            return response.data.data.prescription;
        } catch (error) {
            console.error('Error creating prescription:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get a prescription by its ID
     * @param {string} id - Prescription ID
     * @returns {Promise} - Resolves to the prescription details
     */
    getPrescriptionById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.data.prescription;
        } catch (error) {
            console.error('Error fetching prescription by ID:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Update a prescription by its ID
     * @param {string} id - Prescription ID
     * @param {Object} updatedData - Data to update in the prescription
     * @returns {Promise} - Resolves to the updated prescription
     */
    updatePrescription: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            return response.data.data.prescription;
        } catch (error) {
            console.error('Error updating prescription:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    /**
     * Delete a prescription by its ID
     * @param {string} id - Prescription ID
     * @returns {Promise} - Resolves if the prescription is deleted successfully
     */
    deletePrescription: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting prescription:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    }
};

export default prescriptionService;

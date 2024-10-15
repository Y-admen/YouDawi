import React, { useState } from 'react';
import { registerDoctor } from '../services/DoctorService';
import { Link } from 'react-router-dom';

const DoctorRegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        adresse: '',
        city: '',
        phone: '',
        specialization: '',
        schedule: [],
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const cities = [
        'Alexandria', 'Aswan', 'Abydos', 'Avaris', 'Port Said', 'Faiyum', 
        'Elephantine', 'Amarna', 'Asyut', 'Giza', 'Luxor', 'Heliopolis', 
        'Sharm El-Sheikh', 'El-Mansoura', 'Akhetaten', 'Crocodiloplis city', 
        'Cairo', 'Minya', 'Thebes', 'Memphis', 'Zagazig', 'Edfu', 
        'Al Mahallah Al Kubra', 'Hermopolis'
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.adresse) newErrors.adresse = "Adresse is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.phone) newErrors.phone = "Phone is required.";
        if (!formData.specialization) newErrors.specialization = "Specialization is required.";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await registerDoctor(formData);
            setMessage('Doctor registered successfully!');
            setErrors({});
        } catch (error) {
            setMessage('Error registering doctor: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="max-w-50 mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register Doctor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    placeholder="Adresse"
                    className={`w-full p-3 border ${errors.adresse ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.adresse && <p className="text-red-500">{errors.adresse}</p>}

                {/* City Select Dropdown */}
                <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {errors.city && <p className="text-red-500">{errors.city}</p>}

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                {/* Specialization Select Dropdown */}
                <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${errors.specialization ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                    required
                >
                    <option value="" disabled>Select Specialization</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General Practice">General Practice</option>
                </select>
                {errors.specialization && <p className="text-red-500">{errors.specialization}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Register
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-gray-700">{message}</p>
            )}

            <div className="flex justify-center">
                Or
            </div>
            <div className="flex justify-center">
                <Link to="/doctor-login">Login</Link>
            </div>
        </div>
    );
};

export default DoctorRegisterForm;

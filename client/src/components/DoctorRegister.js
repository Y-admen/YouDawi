import React, { useState } from 'react';
import { registerDoctor } from '../services/DoctorService';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
        avatar: null, // For file upload
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const cities = [
        'Alexandria', 'Aswan', 'Abydos', 'Avaris', 'Port Said', 'Faiyum',
        'Elephantine', 'Amarna', 'Asyut', 'Damietta', 'Giza', 'Luxor', 'Heliopolis',
        'Sharm El-Sheikh', 'El-Mansoura', 'Akhetaten', 'Crocodiloplis city',
        'Cairo', 'Minya', 'Thebes', 'Memphis', 'Zagazig', 'Edfu',
        'Al Mahallah Al Kubra', 'Hermopolis'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
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

        // Create formData for file upload
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'schedule') {
                data.append(key, JSON.stringify(formData[key])); // Schedule as string
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await registerDoctor(data);
            setMessage('Doctor registered successfully!');
            console.log(response);
            setErrors({});
        } catch (error) {
          setMessage('Error registering doctor: ' + (error.response?.data?.message || error.message));

        }
    };

    return (
      <>
      <Navbar/>
        <div className="min-h-screen flex items-center rounded-2xl justify-center bg-primary-35">
          <div className="flex w-4/5 h-4/5 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="w-1/2 p-8">
                <h2 className="text-5xl font-bold text-primary-30 text-center mb-1">Register Doctor</h2>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'} `}
                        required
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}

                    <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleInputChange}
                        placeholder="Adresse"
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.adresse ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.adresse && <p className="text-red-500">{errors.adresse}</p>}

                    {/* City Select Dropdown */}
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
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
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                    {/* Specialization Select Dropdown */}
                    <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className={`w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
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

                    {/* File Upload */}
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition"
                    >
                        Register
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-gray-700">{message}</p>
                )}

                <div className="flex items-center my-2">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="flex-grow border-gray-300" />
                </div>
                  <div className="text-center mt-2">
                <Link to="/doctor-login">Login</Link>
                </div>
            </div>
            <div className="w-1/2 relative">
                    <img
                        src="doctor register-login.png"
                        alt="Transparent overlay"
                        className="relative z-10 mx-auto my-8 opacity-75"
                    />
                </div>
        </div>
        </div>
        </>
    );
};

export default DoctorRegisterForm;

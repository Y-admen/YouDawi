import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import patientService from '../services/PatientService';
import Navbar from '../components/Navbar';

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [gender, setGender] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('phone', data.phone);
        formData.append('gender', gender);
        formData.append('dateOfBirth', data.dateOfBirth);
        formData.append('age', data.age);
        formData.append('address', data.address);
        
        // Health History fields
        formData.append('healthHistory[familyStatus]', data.familyStatus);
        formData.append('healthHistory[diseases]', data.diseases);
        formData.append('healthHistory[examinations]', data.examinations);
        formData.append('healthHistory[diagnosis]', data.diagnosis);
        formData.append('healthHistory[treatment]', data.treatment);

        if (avatar) formData.append('avatar', avatar);

        try {
            const response = await patientService.registerPatient(formData);
            console.log('Patient registered successfully:', response);
            reset();
            setSuccess(true);
            setError(null);
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.message || 'Registration failed');
            setSuccess(false);
        }
    };

    return (
        <div className="">
            <Navbar />
            <div className="mx-auto max-w-1/2 bg-white shadow-md p-10">
                <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
                    <h2 className="text-lg font-semibold">Register</h2>
                </div>

                {success && <div className="text-green-600">Registration successful!</div>}
                {error && <div className="text-red-600">Error: {error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4" encType="multipart/form-data">
                    {/* Personal Details */}
                    <div>
                        <label className="block text-gray-700">First Name<span className="text-red-500">*</span></label>
                        <input type="text" {...register('firstName')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Last Name<span className="text-red-500">*</span></label>
                        <input type="text" {...register('lastName')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Gender<span className="text-red-500">*</span></label>
                        <div className="flex space-x-4 mt-2">
                            <label className="flex items-center">
                                <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="form-radio" />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="form-radio" />
                                <span className="ml-2">Female</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" value="other" checked={gender === 'other'} onChange={() => setGender('other')} className="form-radio" />
                                <span className="ml-2">Other</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Email<span className="text-red-500">*</span></label>
                        <input type="email" {...register('email')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Phone<span className="text-red-500">*</span></label>
                        <input type="text" {...register('phone')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Date of Birth<span className="text-red-500">*</span></label>
                        <input type="date" {...register('dateOfBirth')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Age<span className="text-red-500">*</span></label>
                        <input type="number" {...register('age')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Address<span className="text-red-500">*</span></label>
                        <input type="text" {...register('address')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    {/* Health History */}
                    <div>
                        <label className="block text-gray-700">Family Status</label>
                        <input type="text" {...register('familyStatus')} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Diseases</label>
                        <input type="text" {...register('diseases')} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Examinations</label>
                        <input type="text" {...register('examinations')} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Diagnosis</label>
                        <input type="text" {...register('diagnosis')} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700">Treatment</label>
                        <input type="text" {...register('treatment')} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700">Password<span className="text-red-500">*</span></label>
                        <input type="password" {...register('password')} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-gray-700">Upload Avatar</label>
                        <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                        <Link to="/login" className="text-blue-600">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

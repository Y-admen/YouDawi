import React, { useState } from 'react';
import Navbar from './Navbar';
import FooterH from './Footer_H';
import './styles.css'; // Import your CSS file
import { requestResetPassword as DoctorRequestResetPassword } from '../services/DoctorService';
import patientService from '../services/PatientService'; // Named import
import nurseService from '../services/NurseService';  // Named import






function ForgetPassword({ role }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            // if (role === 'doctor') {
            //     await DoctorRequestResetPassword(email);
            // } else if (role === 'patient') {
            await patientService.requestResetPassword(email);  // Use the named import
            // } else if (role === 'nurse') {
            //     await nurseService.requestResetPassword(email);  // Use the named import
            // } else {
            //     throw new Error('Invalid role specified.');
            // }
            setSuccess('Password reset email sent successfully.');
        } catch (err) {
            setError(`Error: ${err.message || 'Failed to send password reset email.'}`);
        }
    };

    return (
      <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-primary-35">

      <div className="flex w-4/5 h-3/4 max-h-70 bg-white opacity-90 rounded-2xl shadow-lg overflow-hidden">
          <div className="w-1/2 p-8">
              <h2 className="text-5xl font-bold text-primary-30 text-center mt-5 mb-4">Reset Password Request</h2>


              <form className="space-y-4">
                  <div>
                      <label className="block mb-1 text-gray-700">
                      Your Email<span className="text-red-500">*</span>
                      </label>
                      <input
                          type="email"
                          className="w-full px-2 py-1 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                      />
                  </div>
  
                  {/* Submit Button */}
                  <button type="submit" className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition">
                  Send Request
                  </button>
  
              </form>
              </div>
  
          <div className="w-1/2 relative">
              <img
                  src="trafalgar-illustration sec02 1.png"
                  alt="Transparent overlay"
                  className="relative z-10 mx-auto my-8 opacity-75"
              />
          </div>
      </div>
  </div>
  </>
    );
}

export default ForgetPassword;

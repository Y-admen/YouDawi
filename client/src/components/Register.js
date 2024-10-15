import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit } = useForm();
    // const [role, setRole] = useState('patient');
    const [gender, setGender] = useState('');
    const onSubmit = (data) => {
        console.log('Form Data:', data);
        // Here, you can send the data to your backend server
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div>
                    <label>
                        <input
                            type="radio"
                            value="patient"
                            checked={role === 'patient'}
                            onChange={() => setRole('patient')}
                        />
                        Patient
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="doctor"
                            checked={role === 'doctor'}
                            onChange={() => setRole('doctor')}
                        />
                        Doctor
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="nurse"
                            checked={role === 'nurse'}
                            onChange={() => setRole('nurse')}
                        />
                        Nurse
                    </label>
                </div> */}

                <div>
                    <label>Name:</label>
                    <input type="text" {...register('name')} required />
                </div>


                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            {...register('gender')}
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            {...register('gender')}
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="other"
                            {...register('gender')}
                            checked={gender === 'other'}
                            onChange={() => setGender('other')}
                        />
                        Other
                    </label>
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" {...register('email')} required />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" {...register('password')} required />
                </div>

                {/* {role === 'doctor' && (
                    <div>
                        <div>
                            <label>Specialty:</label>
                            <input type="text" {...register('specialty')} required /></div>
                        <div>
                            <label>License Number:</label>
                            <input type="text" {...register('licenseNumber')} required />
                        </div>
                    </div>
                )}

                {role === 'patient' && (
                    <div>
                        <label>Date of Birth:</label>
                        <input type="date" {...register('dob')} required />

                    </div>
                )}

                {role === 'nurse' && (
                    <div>
                        Maybe some additional fields for nurses?
                    </div>
                )} */}

                <button type="submit">Register</button>
            </form>

            Or
            <br />
            <Link to="/login">
                <button>Sign In</button>
            </Link>
        </div>
    );
};

export default Register;

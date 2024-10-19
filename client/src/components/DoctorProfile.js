import React from 'react';
import profileDoc1 from '../pics/profile_doc1.jpg';
import profileDoc2 from '../pics/profile_doc2.jpg';
import profileDoc3 from '../pics/profile_doc3.jpg';

     function DoctorProfile() {
            const doctors = [
                {
                    name: "Dr.mahamed mostafa",
                    specialization: "Orthopedics",
                    experience: "5 yrs",
                    price: "120",
                    phone: "1234567890",
                    image: profileDoc1
                },
                {
                    name: "Dr.Ahmed Hasam",
                    specialization: "Eye",
                    experience: "7 yrs",
                    price: "500",
                    phone: "123123123",
                    image:profileDoc2
                },
                {
                    name: "Dr.Nasir sherasiya",
                    specialization: "Heart",
                    experience: "10 yrs",
                    price: "$100",
                    phone: "123456789",
                    image: profileDoc3
                }
            ];

            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {doctors.map((doctor, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <img src={doctor.image} alt={`Image of ${doctor.name}`} className="mx-auto mb-4"/>
                                <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
                                <p className="text-gray-700 mb-1"><strong>Specialization:</strong> {doctor.specialization}</p>
                                <p className="text-gray-700 mb-1"><strong>Experience:</strong> {doctor.experience}</p>
                                <p className="text-gray-700 mb-1"><strong>fee per consultation:</strong> {doctor.price}</p>
                                <p className="text-gray-700 mb-4"><strong>Phone:</strong> {doctor.phone}</p>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded">BOOK APPOINTMENT</button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
export default DoctorProfile;
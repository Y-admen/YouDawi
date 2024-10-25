import React, { useState } from 'react';

const ProfileSettingspat = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Profile info, passwords, and notifications state (same as before)
    const [profileInfo, setProfileInfo] = useState({
        firstName: 'esraa',
        lastName: 'Alaa',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: 'adress',
        avatar: "pics/default.png",
        diseases: "Hypertension",
        examinations: "Blood Test",
        diagnosis: "Hypertension Stage 1",
        treatment: "Medication",
    });
    // Handling changes and form submissions
    const handleProfileChange = (e) => setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
    // Navigation for slider view
    const handleSlideChange = (index) => setCurrentSlide(index);

    const slides = [
        {
            label: 'Profile Information',
            content: (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700">firstName</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profileInfo.firstName}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">lastName</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profileInfo.lastName}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileInfo.email}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileInfo.phone}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="tel"
                            name="address"
                            value={profileInfo.address}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full p-2 border rounded-md"
                        />
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Save Profile
                    </button>
                </form>
            ),
        },
    ];

    return (
        <div className="container">
            {/* <h1 className="text-3xl font-bold mb-6">Profile Settings</h1> */}

            {/* Slider Navigation */}
            <div className="flex justify-center mb-4">
                {slides.map((slide, index) => (
                    <label key={index} className="mx-2">
                        <input
                            type="radio"
                            name="slide-selector"
                            checked={currentSlide === index}
                            onChange={() => handleSlideChange(index)}
                            className="hidden"
                        />
                        <span
                            className={`cursor-pointer inline-block w-4 h-4 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-400'
                                }`}
                        ></span>
                    </label>
                ))}
            </div>

            {/* Slider Content */}
            <div className="transition-all duration-300 ease-in-out">
                {slides[currentSlide].content}
            </div>
        </div>
    );
};

export default ProfileSettingspat;

import React from "react";
import myImage2 from '../pics/banner1.jpg';

        function Banner() {
            return (
                <div className="relative h-screen">
                    <img src={myImage2} alt="A doctor holding an elderly person's hand" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="bg-white bg-opacity-85 p-11 rounded-lg shadow-lg text-center">
                            <h1 className="text-4xl font-bold text-blue-700 mb-4">Find the care you need</h1>
                           <div className="flex space-x-4 mb-4">
    <select className="p-2 border border-gray-300 rounded">
        <option value="" disabled selected>Specialty</option>
        <option value="cardiology">Cardiology</option>
        <option value="neurology">Neurology</option>
        <option value="pediatrics">Pediatrics</option>
        {/* Add more options as needed */}
    </select>
    
    <select className="p-2 border border-gray-300 rounded">
        <option value="" disabled selected>Search Doctors</option>
        <option value="doctor1">Doctor 1</option>
        <option value="doctor2">Doctor 2</option>
        <option value="doctor3">Doctor 3</option>
        {/* Add more options as needed */}
    </select>
    
    <select className="p-2 border border-gray-300 rounded">
        <option value="" disabled selected> Location</option>
        <option value="new-york">Elmonfia</option>
        <option value="los-angeles">port said</option>
        <option value="chicago">cairo</option>
        {/* Add more options as needed */}
    </select>
    
    <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
</div>
                            <p className="text-blue-600">
                                Search by department and your current location
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 w-full text-center p-4 bg-white bg-opacity-70">
                        <h2 className="text-6xl font-bold">YouDawi</h2>
                        <p>We ensures the best Doctors. Find The Best Doctor Near By You</p>
                    </div>
                </div>
            );
        }
   export default Banner;
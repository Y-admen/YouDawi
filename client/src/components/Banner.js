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
                                <input type="text" placeholder="Specialties" className="p-2 border border-gray-300 rounded" />
                                <input type="text" placeholder="Search Doctors" className="p-2 border border-gray-300 rounded" />
                                <input type="text" placeholder="Location" className="p-2 border border-gray-300 rounded" />
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
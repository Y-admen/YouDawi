import React from 'react';
import Navbar from './Navbar';
// import myImage from '../pics/photo_doctors.jpg';
// import myImage2 from '../pics/home_visit.jpeg';
// import myImage3 from '../pics/mobile.jpeg';
import './style.css'
import FooterH from './Footer';
import Banner from './Banner';
import About from './About';
import Reviews from "./Reviews";
import Info from './Info';

function LandingPage() {
  return (
    <div>
          <Navbar />
           <Banner/>
                        <section className="flex  py-0">
                        <div className="mx-auto absolute  top-12 bottom-50 left-20 right-15">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md opacity-90">
                                <h1 className="text-6xl font-bold mb-4 text-blue-600">Find the care you need</h1>
                          <div className="flex space-x-4 mb-4">
                                     <input type="text" placeholder="Specialties" className="flex-1 p-2 rounded-lg border border-gray-300"/>
                                    <input type="text" placeholder="Search Doctors" className="flex-1 p-2 rounded-lg border border-gray-300"/>
                                    <input type="text" placeholder="Location" className="flex-1 p-2 rounded-lg border border-gray-300"/>

              <button className="p-3 bg-blue-600 text-white rounded-lg"><i className="fas fa-search">Search</i></button>
            </div>
            <div className="flex space-x-4 text-blue-600">
              <p>Search by department and your current location </p>
            </div>
          </div>
        </div>
      </section>
      <Info />
      <About />
      <Reviews />
      <FooterH />
    </div>
  );
}

export default LandingPage;

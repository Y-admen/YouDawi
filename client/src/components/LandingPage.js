import React, {useEffect} from 'react';
import Navbar from './Navbar';
// import myImage from '../pics/photo_doctors.jpg';
// import myImage2 from '../pics/home_visit.jpeg';
// import myImage3 from '../pics/mobile.jpeg';
import './style.css'
import Footer_H from './Footer_H';
import Banner from './Banner';
import About from './About';
import Reviews from "./Reviews";
import Info from './Info';

function LandingPage() {
  // useEffect(() => {
  //   // Dynamically import Bootstrap CSS and JS only for this page
  //   import('bootstrap/dist/css/bootstrap.min.css')
  //     .then(() => {
  //       return import('bootstrap/dist/js/bootstrap.bundle.min');
  //     })
  //     .catch((error) => console.error('Error loading Bootstrap', error));
  // }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
          <Navbar />
           <Banner/>
      <Info />
      <About />
      <Reviews />
      <Footer_H />
    </div>
  );
}

export default LandingPage;

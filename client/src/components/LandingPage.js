import React, { useEffect } from 'react';
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


    return (
        < div >
            <Navbar />
            <Banner />
            <Info />
            < About />
            < Reviews />
            < Footer_H />
        </div>
    );
}

export default LandingPage;

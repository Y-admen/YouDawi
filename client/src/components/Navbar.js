import React from 'react';
import { Link } from 'react-router-dom';
import myImage from '../pics/logo-rbg.png';


const Navbar = () => {
  return (

    <nav className="w-full bg-primary-30 py-2  h-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          {/* <i className="fas fa-bars text-xl mr-4"></i> */}
          <img src={myImage} alt="YouDawi" className="h-6 w-20" />
          {/* <img src={myImage} alt="Healthgrades logo" className="h-10 w-10 rounded-full"/> */}
        </div>


        {/* Menu Items */}
        <div className="space-x-4">
          <Link to="/public-home" className="text-white">
            Home
          </Link>
          <Link to="/doctor-register" className="text-white">
            Are you a Doctor?
          </Link>
          <a href="/public-home#about" className="text-white">
            About
          </a>
          <a href="/public-home#reviews" className="text-white">
            Reviews
          </a>
          <Link to="/login" className="text-white">
            Sign In
          </Link>
          <Link to="/register" className="text-white">
            Sign Up
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

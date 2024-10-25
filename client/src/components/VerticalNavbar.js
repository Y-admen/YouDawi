import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaUserMd, FaCalendarAlt, FaUserInjured, FaProcedures } from 'react-icons/fa'; // Added more icons
// import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import logopic from '../pics/logo-rbg.png';


function VerticalNavbar({ onOpenModal, userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleClasses = isOpen ? 'w-30' : 'w-10'; // Adjust width based on toggle
  const linkTextClass = isOpen ? 'opacity-100' : 'opacity-0'; // Text visibility



  const doctorNavItems = [
    {
      path: '/dashboard'
      , label: 'Home', icon: <FaHome />
    },
    {
      path: '/appointments'
      , label: 'My Appointments', icon: <FaUserMd />
    },
    {
      path: '/patients'
      , label: 'Patients', icon: <FaUserInjured />
    },
  ];

  const patientNavItems = [
    { path: '/patient-dashboard', label: 'Home', icon: <FaHome /> },
    { path: '/doctors', label: 'Doctors', icon: <FaUserInjured /> },
    { path: '/patient-appointments', label: 'My Appointments', icon: <FaCalendarAlt /> },
    { path: '/patient-data', label: 'Health History', icon: <FaUserCircle /> },
  ];

  const nurseNavItems = [
    { path: '/nurse-dashboard', label: 'Nurse Dashboard', icon: <FaProcedures /> },
  ];

  // Determine which nav items to display based on the user role
  let navItems = [];
  if (userRole === 'doctor') {
    navItems = doctorNavItems;
  } else if (userRole === 'patient') {
    navItems = patientNavItems;
  } else if (userRole === 'nurse') {
    navItems = nurseNavItems;
  }
  console.log(navItems);

  return (
    <nav onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className={`vertical-navbar  bg-transparent h-full flex flex-col pl-1 pr-1.5 pt-2 pb-2 justify-between transition-all duration-300 ${toggleClasses}`}>
      <div className='items-center'>
        {/* Logo */}
        <div className={`border-solid border-black border-0.25 text-blue text-center mb-4 ${isOpen ? 'text-lg' : 'text-sm'}`}>
          <img className='w-23 h-17' src={logopic} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4">
          {navItems.map(({ path, label, icon }) => {
            // Check if the current path matches the nav item's path
            const isActive = location.pathname === path;
            return (
              <li key={path} className="group">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? 'text-white bg-emerald-600' : 'text-gray-200 hover:bg-emerald-500'
                  }
                >
                  <div className="flex items-center space-x-2 p-0.5 rounded-lg transition-colors duration-300">
                    <span className={`ml-2 text-5x4 transition-colors duration-300 ${isActive ? 'text-yellow-300' : 'text-gray-300'}`}>
                      {icon}
                    </span>
                    <span className={`text-5x4 transition-opacity duration-300 ${linkTextClass} ${isActive ? 'text-yellow-300' : 'text-gray-300'}`}>
                      {label}
                    </span>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Avatar */}
      <button className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white" onClick={onOpenModal}>
        <FaUserCircle style={{ color: 'white', width: '48px', height: '48px' }} />
      </button>
    </nav>
  );
}

export default VerticalNavbar;

import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaUserMd, FaCalendarAlt, FaUserInjured } from 'react-icons/fa'; // Importing some icons
import { MdMenuOpen, MdSpaceDashboard } from "react-icons/md";


function VerticalNavbar({ onOpenModal }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current location

    const toggleClasses = isOpen ? 'w-30' : 'w-7'; // Adjust width based on toggle
    const linkTextClass = isOpen ? 'opacity-100' : 'opacity-0'; // Text visibility
    const logoSize = isOpen ? 'w-12 h-12' : 'w-8 h-8';
    const iconSize = 'text-5xl'; 

    const navItems = [
        { path: '/', label: 'Dashboard', icon: <MdSpaceDashboard /> },
        { path: '/home', label: 'Home', icon: <FaHome /> },
        { path: '/doctor-register', label: 'Doctors', icon: <FaUserMd /> },
        { path: '/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
        { path: '/patients', label: 'Patients', icon: <FaUserInjured /> },
    ];

    return (
        <nav className={`vertical-navbar bg-primary-30 h-full flex flex-col space-y-7  justify-between transition-all duration-300  ${toggleClasses} p-1`}>
            <div>
                {/* Logo
                <div className="flex items-center justify-center mb-4">
                    <img src="logo-rbg.png" alt="logo" className={`transition-all duration-300 ${logoSize}`} />
                </div> */}
                <button className="w-5 h-5 rounded-full my-3 ml-1 bg-primary-40 flex items-center justify-center text-white" onClick={onOpenModal}>
                Avatar
            </button>
                {/* Toggle Button */}
                <div className="mb-5">
                    <button className="w-5 h-5 bg-primary-40 ml-1 hover:bg-primary-60 flex items-center justify-center rounded-full text-white" onClick={() => setIsOpen(!isOpen)}>
                        <MdMenuOpen />
                    </button>
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
                                    <div className="flex space-x-3 p-2 rounded-lg transition-colors duration-300">
                                    <span className={`${iconSize} ${isActive ? 'text-yellow-300' : 'text-gray-300'} mr-3`}>
                                            {icon}
                                        </span>
                                        <span className={`text-3xl transition-opacity duration-300 ${linkTextClass} ${isActive ? 'text-white' : 'text-gray-200'}`}>
                                            {label}
                                        </span>
                                    </div>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>

        </nav>
    );
}

export default VerticalNavbar;

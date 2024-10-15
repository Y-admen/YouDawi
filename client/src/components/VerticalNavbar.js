import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaUserMd, FaCalendarAlt, FaUserInjured } from 'react-icons/fa'; // Importing some icons
import { MdMenuOpen } from "react-icons/md";


function VerticalNavbar({ onOpenModal }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get current location

    const toggleClasses = isOpen ? 'w-30' : 'w-10'; // Adjust width based on toggle
    const linkTextClass = isOpen ? 'opacity-100' : 'opacity-0'; // Text visibility

    const navItems = [
        { path: '/home', label: 'Home', icon: <FaHome /> },
        { path: '/doctor-register', label: 'Doctors', icon: <FaUserMd /> },
        { path: '/appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
        { path: '/patients', label: 'Patients', icon: <FaUserInjured /> },
    ];

    return (
        <nav className={`vertical-navbar bg-primary-10 h-full p-2 flex flex-col justify-between transition-all duration-300 ${toggleClasses}`}>
            <div>
                {/* Logo */}
                <div className={`border-solid border-black border-0.25 text-blue text-center mb-4 ${isOpen ? 'text-lg' : 'text-sm'}`}>
                    Logo
                </div>

                {/* Toggle Button */}
                <div className="mb-4">
                    <button className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-4xl" onClick={() => setIsOpen(!isOpen)}>
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
                                    <div className="flex items-center space-x-4 p-2 rounded-lg transition-colors duration-300">
                                        <span className={`text-3xl transition-colors duration-300 ${isActive ? 'text-yellow-300' : 'text-gray-300'}`}>
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

            {/* Avatar */}
            <button className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white" onClick={onOpenModal}>
                Avatar
            </button>
        </nav>
    );
}

export default VerticalNavbar;

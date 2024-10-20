import { Outlet } from 'react-router-dom';
import VerticalNavbar from './VerticalNavbar';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import ProfileSettings from './ProfileSettings';

// Assuming role is either passed via props or fetched from localStorage/context
function Layout({ role }) {
    // State for controlling modal visibility
    const [isModalVisible, setModalVisible] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Logic to render the dashboard based on role
    const renderDashboard = () => {
        switch (role) {
            case 'doctor':
                return <DoctorDashboard />;
            case 'patient':
                return <PatientDashboard />;
            case 'nurse':
                return <NurseDashboard />;
            default:
                return <DefaultDashboard />;
        }
    };

    return (
      <div className="flex h-screen bg-primary-30">
                {/* Pass openModal function to VerticalNavbar */}
                <VerticalNavbar onOpenModal={openModal} />

                <div className="flex-1 overflow-auto border-7 rounded-3xl border-primary-30  bg-gray-100 p-6">
                    {/* Render the appropriate dashboard based on the user's role */}
                    {renderDashboard()}
                    <Outlet />
                </div>


            {/* Profile Component - Triggered within layout */}
            {isModalVisible && (
                <Modal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    title="Profile settings"
                    content={<ProfileSettings />}
                />
            )}
        </div>
    );
}

// Dummy components for each role's dashboard
function DoctorDashboard() {
    return <div>Doctor Dashboard</div>;
}

function PatientDashboard() {
    return <div>Patient Dashboard</div>;
}

function NurseDashboard() {
    return <div>Nurse Dashboard</div>;
}

function DefaultDashboard() {
    return <div>Default Dashboard</div>;
}

export default Layout;

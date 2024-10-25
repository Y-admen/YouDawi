import { Outlet } from 'react-router-dom';
import VerticalNavbar from './VerticalNavbar';
import Modal from './Modal';
import { useState } from 'react';
import ProfileSettings from './ProfileSettingspat';
import DoctorNurseDashboard from './DoctorNurseDashboard';
import PatientDashboard from './PatientDashboard';

function Layout({ role }) {
    const [isModalVisible, setModalVisible] = useState(false);


    // Function to open the modal
    const openModal = () => {
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Function to render dashboard based on the user's role
    const renderDashboard = () => {
        switch (role) {
            case 'doctor':
                return <DoctorNurseDashboard role={role} />;
            case 'patient':
                return <PatientDashboard />;
            case 'nurse':
                return <DoctorNurseDashboard role={role} />;
            default:
                return <DefaultDashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-primary-10 to-primary-35 pt-1 pb-1">
            {/* Pass openModal function to VerticalNavbar */}
            <VerticalNavbar onOpenModal={openModal} userRole={role} />

            {/* <div className="w-2 min-w-2"></div> */}

            <div className="flex-1 overflow-auto border-7 rounded-3xl border-primary-30  bg-gray-100 p-6">
                {/* Render the appropriate dashboard based on the user's role */}
                {/* {renderDashboard()} */}
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


function DefaultDashboard() {
    return <div>Default Dashboard</div>;
}

export default Layout;

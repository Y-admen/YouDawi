import React, { useState, useEffect } from 'react';
import prescriptionService from '../services/PrescriptionService';
// import { getDoctorById } from '../services/DoctorService'; // Uncomment if you have a doctor service
// import patientService from '../services/PatientService'; // Uncomment if you have a patient service
import { useNavigate, useParams } from 'react-router-dom';

const WritePrescription = () => {
    const [doctor, setDoctor] = useState({
        logo: '',
        firstName: 'John',
        lastName: 'Doe',
        specialty: 'Cardiology',
        address: '123 Medical St.',
        city: 'New York',
        phone: '(555) 123-4567',
        email: 'johndoe@example.com',
    });
    
    const [patient, setPatient] = useState({ name: 'Jane Smith' });  //Jane Smith
    const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
    const [instructions, setInstructions] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { doctorId, patientId } = useParams();

    // Uncomment this if you implement fetching doctor and patient data
    /*
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const doctorResponse = await getDoctorById(doctorId); // Fetch doctor info
                setDoctor(doctorResponse.data);
            } catch (error) {
                setError('Failed to fetch doctor information');
                console.error('Error fetching doctor:', error);
            }
        };

        const fetchPatientData = async () => {
            try {
                const patientResponse = await patientService.getPatientById(patientId); // Fetch patient info
                setPatient(patientResponse.data);
            } catch (error) {
                setError('Failed to fetch patient information');
                console.error('Error fetching patient:', error);
            }
        };

        fetchDoctorData();
        fetchPatientData();
    }, [doctorId, patientId]);
    */

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prescriptionData = {
            patientId,
            doctorId,
            medications,
            instructions,
            dateIssued: new Date(),
        };

        try {
            await prescriptionService.postPrescription(prescriptionData);
            alert('Prescription submitted successfully!');
            window.print(); // Trigger the print dialog after submission
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to submit prescription');
            console.error('Error submitting prescription:', error);
        }
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = medications.map((med, i) =>
            i === index ? { ...med, [field]: value } : med
        );
        setMedications(updatedMedications);
    };

    const addMedication = () => {
        setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
    };

    const removeMedication = (index) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    return (
        <div className="flex min-h-screen justify-center items-center bg-primary-35 ">
            <div className="bg-white opacity-90 my-5 w-5/6 border-35 rounded-2xl shadow-lg flex flex-col text-left px-2">
                {error && <div className="text-red-500">{error}</div>}
                
                <div className="flex items-center rounded-2xl mb-5">
                    <div className="max-w-36 h-20  mr-5">
                        <img src="logo-rbg.png" alt="Doctor Logo" className="w-full h-full" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-4xl">{`${doctor.firstName} ${doctor.lastName}`}</h2>
                        <p className="text-4xl text-gray-600">{doctor.specialty}</p>
                    </div>
                </div>

                <div className="flex justify-between mb-5">
                    <div className="flex-1 flex flex-col">
                        <label className="font-bold mb-1">Date:</label>
                        <input type="text" value={new Date().toLocaleDateString()} disabled className="rounded-full shadow border border-[#003357] p-2 w-25" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <label className="font-bold mb-1">Patient:</label>
                        <input type="text" value={patient.name} disabled className="rounded-full shadow border border-[#003357] p-2 w-25" />
                    </div>
                </div>

                {/* Separator between doctor info and medications */}
                <div className="flex justify-center mb-5">
                    <div className="flex-1 h-[1px] bg-[#003357] mx-2" />
                    <div className="flex-1 h-[1px] bg-[#003357] mx-2" style={{ height: '1px', zIndex: 1 }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="font-bold">Medications:</label>
                        {medications.map((medication, index) => (
                            <div key={index} className="flex gap-1 mb-2">
                                <input
                                    type="text"
                                    value={medication.name}
                                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                    placeholder="Medication Name"
                                    className="rounded-full w-25 shadow border border-[#003357] flex-1"
                                />
                                <input
                                    type="text"
                                    value={medication.dosage}
                                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                    placeholder="Dosage"
                                    className="rounded-full shadow border border-[#003357] flex-1"
                                />
                                <input
                                    type="text"
                                    value={medication.frequency}
                                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                                    placeholder="Frequency"
                                    className="rounded-full shadow border border-[#003357] flex-1"
                                />
                                <input
                                    type="text"
                                    value={medication.duration}
                                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                                    placeholder="Duration"
                                    className="rounded-full shadow border border-[#003357] flex-1"
                                />
                                <button
                                    type="button"
                                    className="w-full bg-primary-30 text-white rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition"
                                    onClick={() => removeMedication(index)}
                                >
                                    Remove
                                </button>
                                <button
                            type="button"
                            className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition"
                            onClick={addMedication}
                        >
                            Add Medication
                        </button>
                            </div>
                        ))}
                        
                    </div>

                    {/* Separator between medications and signature section */}
                    <div className="flex justify-center mb-5">
                        <div className="flex-1 h-[1px] bg-[#003357] mx-2" />
                        <div className="flex-1 h-[1px] bg-[#003357] mx-2" style={{ height: '1px', zIndex: 1 }} />
                    </div>

                    <div className="mb-5">
                        <label className="font-bold">Instructions:</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="Additional instructions"
                            className="rounded-3xl shadow border border-[#003357] p-2 w-full h-24"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="font-bold">Signature:</label>
                        <div className="w-52 h-1 border-b border-black mb-1"></div>
                    </div>

                    <button type="submit" className="w-full bg-primary-30 text-white py-1 rounded-lg font-semibold shadow-lg hover:bg-[#00263d] transition w-50">Submit Prescription</button>
                </form>

                <div className="my-3 text-4xl text-center text-gray-600">
                    <p>{`${doctor.address}, ${doctor.city}`}</p>
                    <p>Phone: {doctor.phone}</p>
                    <p>Email: {doctor.email}</p>
                </div>
            </div>
        </div>
    );
};

export default WritePrescription;

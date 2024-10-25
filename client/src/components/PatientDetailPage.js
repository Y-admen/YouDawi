// src/components/PatientDetailPage.js

// ... other imports
import './HealthStyle.css';
import dummyPatient from './HealthhistoryDummyData';
import defaultAvatar from '../pics/default.png';

const PatientDetailPage = () => {
    const { patient } = dummyPatient.data;

    return (
        <div className="patient-detail">
            <h1 className="text-4xl font-bold mb-4">Patient Details</h1>
            <div className="patient-info flex items-center">
                <img
                    src={patient.avatar}
                    alt={`${patient.firstName} ${patient.lastName}`}
                    className="patient-avatar rounded-full mr-6"
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                />
                <div>
                    <h2 className="text-15 font-bold">{`${patient.firstName} ${patient.lastName}`}</h2>
                    <p className="text-3x1"><strong>Email:</strong> {patient.email}</p>
                    <p className="text-3x1"><strong>Phone:</strong> {patient.phone}</p>
                    <p className="text-3x1"><strong>Gender:</strong> {patient.gender}</p>
                    <p className="text-3x1"><strong>Age:</strong> {patient.age}</p>
                    <p className="text-3x1"><strong>Address:</strong> {patient.address}</p>
                </div>
            </div>
            <h3 className="text-15 font-bold mb-2">Health History :</h3>
            <div className="health-history space-y-4">
                {patient.healthHistory.map((historyItem) => (
                    <div key={historyItem._id} className="history-item">
                        {historyItem.familyStatus && (
                            <p className="text-3x1"><strong>Family Status:</strong> {historyItem.familyStatus}</p>
                        )}
                        {historyItem.diseases && (
                            <p className="text-3x1"><strong>Diseases:</strong> {historyItem.diseases}</p>
                        )}
                        {historyItem.examinations && (
                            <p className="text-3x1"><strong>Examinations:</strong> {historyItem.examinations}</p>
                        )}
                        {historyItem.diagnosis && (
                            <p className="text-3x1"><strong>Diagnosis:</strong> {historyItem.diagnosis}</p>
                        )}
                        {historyItem.treatment && (
                            <p className="text-3x1"><strong>Treatment:</strong> {historyItem.treatment}</p>
                        )}

                        {historyItem.prescriptions.length > 0 && (
                            <div className="prescriptions mt-4">
                                <h4 className="font-semibold">Prescription : </h4>
                                {historyItem.prescriptions.map((prescription) => (
                                    <div key={prescription.prescriptionId} className="prescription p-2 bg-white border border-gray-300 rounded mt-2">
                                        <p className="text-3x1"><strong>Doctor:</strong> {prescription.doctorName}</p>
                                        <p className="text-3x1"><strong>Date Issued:</strong> {new Date(prescription.dateIssued).toLocaleDateString()}</p>
                                        <p className="text-3x1"><strong>Instructions:</strong> {prescription.instructions}</p>
                                        <p className="text-3x1"><strong>Medications:</strong></p>
                                        <ul className="list-disc ml-5">
                                            {prescription.medications.map((med) => (
                                                <li key={med.name} className="text-3x1">
                                                    {`${med.name} (${med.dosage}, ${med.frequency}, ${med.duration})`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="text-primary-60 rounded-3x1 p-2 hover:text-white bg-primary-10 mt-2">Add prescription</button>
        </div>
    );
};

export default PatientDetailPage;

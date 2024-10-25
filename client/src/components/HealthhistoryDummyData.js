const dummyPatient = {
    "status": "success",
    "data": {
        "patient": {
            "_id": "6716bb2185f508aeb446abe0",
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "lifelearner.159@gmail.com",
            "phone": 1234567890,
            "gender": "Female",
            "age": 38,
            "avatar": "pics/default.png",
            "address": "123 Main St, City, Country",
            "healthHistory": [
                {
                    "familyStatus": "Married",
                    "diseases": "Hypertension",
                    "examinations": "Blood Test",
                    "diagnosis": "Hypertension Stage 1",
                    "treatment": "Medication",
                    "doctor": "670113df872ee7cab2849509",
                    "_id": "6716bb2185f508aeb446abe1",
                    "prescriptions": []
                },
                {
                    "doctor": "6716b7f985f508aeb446aa90",
                    "prescriptions": [
                        {
                            "prescriptionId": "671970be5f3badaa999f9fd6",
                            "doctorName": "Jane Dohe",
                            "dateIssued": "2024-10-01T00:00:00.000Z",
                            "instructions": "Take medications before meals.",
                            "medications": [
                                {
                                    "name": "Amoxicillin",
                                    "dosage": "500mg",
                                    "frequency": "Twice a day",
                                    "duration": "5 days"
                                }
                            ],
                            "_id": "671970bf5f3badaa999fa025"
                        }
                    ],
                    "_id": "671970bf5f3badaa999fa024"
                },
                {
                    "doctor": "671539f7265122b37c62b90a",
                    "prescriptions": [
                        {
                            "prescriptionId": "6719710e5f3badaa999fa02d",
                            "doctorName": "Irene Aragona",
                            "dateIssued": "2024-10-01T00:00:00.000Z",
                            "instructions": "Take medications before meals.",
                            "medications": [
                                {
                                    "name": "Amoxicillin",
                                    "dosage": "500mg",
                                    "frequency": "Twice a day",
                                    "duration": "5 days"
                                }
                            ],
                            "_id": "6719710e5f3badaa999fa03a"
                        }
                    ],
                    "_id": "6719710e5f3badaa999fa039"
                }
            ],
            "role": "patient",
            "appointmentsNotifications": [],
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpZmVsZWFybmVyLjE1OUBnbWFpbC5jb20iLCJpZCI6IjY3MTZiYjIxODVmNTA4YWViNDQ2YWJlMCIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzI5NTQyOTQ1LCJleHAiOjE3Mjk2MjkzNDV9.zcCrYELxQZmBN9JFXegxLcWcYA-UxJYIXigyWusXDAA",
            "__v": 0
        }
    }
};

export default dummyPatient;

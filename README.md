# YouDawi - Doctor Appointment Booking System

This project is a comprehensive Doctor Appointment Booking System built using the MERN stack.

![YouDawi Screenshot](#)

## Features

- **Patient Features**: Search doctors, Book appointments, view health history, receive reminders.
- **Doctor Features**: Manage schedules, view/update patient history, issue prescriptions, create nurses.
- **Nurse Features**: Manage appointments, update patient history.
- **Admin Features**: Manage users, approve doctors.
- **Email Notifications**: For appointment reminders and password resets.

## Technologies

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: JWT Authentication, Multer for file uploads

## Team Members

| Name              | Role               | GitHub                                      | LinkedIn                                  |
|-------------------|--------------------|---------------------------------------------|-------------------------------------------|
| Yasmeen Al Ashry   | BackEnd Developer  | [GitHub](https://github.com/Y-admen)  | [LinkedIn](#) |
| Habiba Zguaid      | BackEnd Developer  | [GitHub](https://github.com/zguaidh)  | [LinkedIn](https://www.linkedin.com/in/habibazguaid/) |
| Esraa Aalaa        | FrontEnd Developer | [GitHub](https://github.com/489Esraa)    | [LinkedIn](#) |
| Abdallah Gamal     | BackEnd Developer  | [GitHub](https://github.com/abdallahgamal110a) | [LinkedIn](#) |

## Getting Started

### Prerequisites

You need to have the following installed to run this project:

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Y-admen/YouDawi.git

## Getting Started

### Navigate into the project directory:

```bash
cd YouDawi

## Install the required dependencies

To install the necessary dependencies, run:

```bash
npm install

## Set up your environment variables

Set up your environment variables by creating a `.env` file in the project root. Define the following necessary keys:

- `PORT`: The port number for the server to run on (e.g., `5000`)
- `DB_URL`: MongoDB connection string for the production database
- `DB_URL_TEST`: MongoDB connection string for the test database
- `JWT_SECRET_KEY`: Secret key for JWT authentication
- `USERNAME_ADMIN`: Admin username
- `PASSWORD_ADMIN`: Admin password
- `VAPI_PRIVATE_KEY`: Private key for VAPI (replace with your actual key)
- `VAPI_PUBLIC_KEY`: Public key for VAPI (replace with your actual key)
- `EMAIL_USER`: Email account for sending emails (e.g., noreply address)
- `EMAIL_PASS`: Password for the email account
- `CLIENT_URL`: URL of the client application (e.g., `http://localhost:5000`)
- `EMAIL_HOST`: SMTP host for sending emails
- `EMAIL_PORT`: SMTP port(s) (e.g., 25, 465, 587, 2525)
- `USER_NAME`: SMTP username for email authentication
- `EMAIL_PASSWORD`: SMTP password for email authentication
- `AUTH`: Authentication methods for SMTP (e.g., PLAIN, LOGIN, CRAM-MD5)
- `TLS`: TLS options (e.g., `Optional` with `STARTTLS` on all ports)

Make sure to set appropriate values for each key to match your environment setup.

## Start the MongoDB server

Ensure that MongoDB is running locally or that you are connected to a cloud instance.

## Available Scripts

In the project directory, you can run:

## BackEnd:

### `npm start`

Runs the backend server in development mode.  
Open [http://localhost:5000](http://localhost:5000) to access the API.

The server will reload when you make changes.  
Ensure MongoDB is running for database connection.

### `npm test`

Launches the Jest test runner for backend APIs.  
Run all unit tests and see the coverage report.  
Make sure to set up your testing environment before running the tests.

## FrontEnd:

### Navigate into the project directory:

```bash
cd client

In the client folder, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

[Watch Video Demo](https://drive.google.com/file/d/1_q9Dph-_AluRDeE522Z_mCsYXDq4fpyf/view)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.



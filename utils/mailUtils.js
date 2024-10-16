const nodemailer = require('nodemailer');
const appError = require('../utils/appError');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const transporter2 = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendPasswordResetEmail = async(Email, URL) => {
    const mailOptions = {
        to: Email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #DDEBF0; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto;">
        <h2 style="color: #004581; text-align: center;">Password Reset Request</h2>
        <p style="color: #333; font-size: 16px;">Dear User,</p>
        <p style="color: #333; font-size: 16px;">
        You are receiving this email because you (or someone else) have requested to reset your password for your account.
        </p>
        <p style="color: #333; font-size: 16px;">
        To complete the password reset process, please click the link below or paste it into your browser within the next hour:
        </p>
        <p style="text-align: center;">
        <a href="${URL}" style="background-color: #018ABD; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </p>
        <p style="color: #333; font-size: 16px;">
        If you did not request a password reset, please ignore this email.
        </p>
        <p style="color: #333; font-size: 16px;">Thank you,<br>The Team</p>
    </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

const sendAppointmentEmail = async(email, approveURL, cancelURL, patientName, doctorName, appointmentTime) => {
    const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Appointment Reminder',
        html: `
<div style="font-family: Arial, sans-serif; background-color: #DDEBF0; padding: 20px; border-radius: 10px; max-width: 100%; width: 100%; box-sizing: border-box; margin: auto;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
        <h2 style="color: #004581; text-align: center; margin-bottom: 20px;">Appointment Reminder</h2>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear ${patientName} ,</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            This is a reminder that you have an appointment with  doctor ${doctorName} tomorrow at <strong>${appointmentTime}</strong>.
        </p>
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; width: 70%; margin: 5px 2.5%;">
                <a href="${approveURL}" style="background-color: #60A940; color: #ffffff; padding: 6px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: block; text-align: center;">Approve Appointment</a>
            </div>
            <div style="display: inline-block; width: 70%; margin: 5px 2.5%;">
                <a href="${cancelURL}" style="background-color: #FF5733; color: #ffffff; padding: 6px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: block; text-align: center;">Cancel Appointment</a>
            </div>
        </div>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you did not schedule this appointment, please contact us immediately.
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you,<br><strong>The Medical Team</strong>
        </p>
    </div>
</div>
    `,
    };

    try {
        const info = await transporter2.sendMail(mailOptions);
        console.log(`Appointment reminder email sent successfully to ${email}`);
        return true;
    } catch (error) {
        console.error(`Error sending appointment reminder email to ${email}:`, error);
        throw new Error(`Failed to send appointment reminder email to ${email}`);
    }
};

const sendNurseRegistrationEmail = async(Email, URL, password) => {
    const mailOptions = {
        to: Email,
        from: process.env.EMAIL_USER,
        subject: 'Nurse Account Created - Login Instructions',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #F4F7F9; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto;">
                <h2 style="color: #004581; text-align: center;">Your Account Has Been Created</h2>
                <p style="color: #333; font-size: 16px;">Dear Nurse,</p>
                <p style="color: #333; font-size: 16px;">
                    This is to inform you that a doctor has created an account for you on our platform.
                </p>
                <p style="color: #333; font-size: 16px;">
                    Your login details are as follows:
                    <ul style="padding-left: 20px;">
                        <li>Email: ${Email}</li>
                        <li>Password: ${password}</li>
                    </ul>
                </p>
                <p style="color: #333; font-size: 16px;">
                    Please use these credentials to log in to your account. You can find the login page at:
                    <a href="${URL}" target="_blank" style="color: #018ABD; text-decoration: underline;">${URL}</a>
                </p>
                <p style="color: #333; font-size: 16px;">
                    If you did not authorize this account creation, please contact the doctor who created it.
                </p>
                <p style="color: #333; font-size: 16px;">Best regards,<br>The Support Team</p>
            </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully to:', Email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};


module.exports = {
    sendPasswordResetEmail,
    sendAppointmentEmail,
    sendNurseRegistrationEmail
};
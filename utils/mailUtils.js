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


module.exports = {
    sendPasswordResetEmail
};
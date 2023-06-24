import dbConnect from '@/util/mongo';
import Users1 from '@/models/Users1';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const MAX_LOGIN_ATTEMPTS = 15;
const LOCKOUT_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email provider here
  // For example, using Gmail SMTP:
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password',
  },
});

export default async function emailExisit(req, res) {
  const { method } = req;
  dbConnect();

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
    return;
  }

  const { oldEmail } = req.body;

  try {
    // Find user by email
    const user = await Users1.findOne({ email: oldEmail });

    if (!user) {
      res.status(400).json({ success: false, message: 'Email not found' });
      return;
    }

    // Check if the account is locked
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      res.status(429).json({ success: false, message: `Account locked. Please try again after ${remainingTime} minutes.` });
      return;
    }

    // Create a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the code and reset the login attempts
    user.resetPasswordCode = code;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Send the email with the code
    const mailOptions = {
      from: 'mohannadosman2@gmail.com',
      to: oldEmail,
      subject: 'Reset Password Code',
      html: `
        <h1>Welcome to our Website</h1>
        <p>We received a request to reset your password. Please use the following code to reset your password:</p>
        <h2>${code}</h2>
        <p>This code will expire in 15 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email exists' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

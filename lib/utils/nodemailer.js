import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., "smtp.gmail.com"
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for port 465, false for others
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"EV Station" <${process.env.EMAIL_USERNAME}>`, 
    to, // Recipient's email
    subject: 'Your OTP Code', // Subject line
    text: `Your OTP code is: ${otp}`, // Plain text body
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`, // HTML body
  };

  return transporter.sendMail(mailOptions);
};

export const resetPassword = async (to, subject, text) => {
  const mailOptions = {
    from: `"EV Station" <${process.env.EMAIL_USERNAME}>`,
    to, // Recipient's email
    subject: subject, // Subject line
    text: `${text}`, // Plain text body
    html: `<p><strong>${text}</strong></p><p>Click <a href="${text}">here</a> to reset your password.</p>`, // HTML body with clickable link
  };

  return transporter.sendMail(mailOptions);
};
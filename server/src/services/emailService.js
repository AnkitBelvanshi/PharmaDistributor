const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

const sendContactNotification = async ({ firstName, lastName, email, phone, location, message }) => {
  if (!env.SMTP_USER || !env.ADMIN_EMAIL) return;

  const html = `
    <h2>New Customer Query — Lifecare Supportive Solutions</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Location</strong></td><td style="padding:8px;border:1px solid #ddd">${location}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${message || '—'}</td></tr>
    </table>
  `;

  await getTransporter().sendMail({
    from: `"Pharma Distributor" <${env.SMTP_USER}>`,
    to: env.ADMIN_EMAIL,
    subject: `New Contact Query from ${firstName} ${lastName}`,
    html,
  });
};

module.exports = { sendContactNotification };

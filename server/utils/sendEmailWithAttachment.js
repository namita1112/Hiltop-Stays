const nodemailer = require("nodemailer");

const sendEmailWithAttachment = async ({ to, subject, text, attachment }) => {
  // Use environment variables for these values in production
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465, // or your provider
    secure: true,
    auth: {
      user: 'no-reply@hiltopstay.com',  //process.env.EMAIL_USER, // example: yourname@gmail.com
      pass: 'Retro#Miss@2025'//process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"Hiltop Stays" <no-reply@hiltopstay.com>`,
    to,
    subject,
    text,
    attachments: [
      {
        filename: attachment.filename,
        content: attachment.content,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailWithAttachment;

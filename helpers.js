const nodeMailer = require("nodemailer");
//1. Send email with nodemailer
const sendEmail = (mailOptions) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CLIENT_EMAIL,
      pass: process.env.CLIENT_EMAIL_SECRET,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {});
};

module.exports = {
  sendEmail,
};

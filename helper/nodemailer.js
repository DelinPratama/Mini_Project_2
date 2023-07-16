const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, //!bukan password gmail, tapi password application
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

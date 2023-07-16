const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "delinpratama24@gmail.com",
    pass: "hhbceqlolnlnbino", //!bukan password gmail, tapi password application
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

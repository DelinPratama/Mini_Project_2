const { db } = require("../database");
const crypto = require("crypto");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");
const otpGenerator = require("otp-generator");
const { error } = require("console");

module.exports = {
  //*GET USER DATA
  getData: (req, res) => {
    let scriptQuery = "select * from user";
    if (req.query.id) {
      scriptQuery = `select * from user where id = ${db.escape(req.query.id)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  //*CREATE USER
  addUser: (req, res) => {
    let { id, username, email, phone, password, img_profile, is_verified, role, createdAt, updateAt } = req.body;

    //*HASHING PASSWORD
    const hmac = crypto.createHmac("sha256", "hash123");
    const hashedPassword = hmac.update(password).digest("hex");

    createdAt = new Date();

    //* GENERATE OTP CODE
    const otpCode = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const otpExpiration = new Date(Date.now() + 10 * 60000);

    let insertQuery = `insert into user values (null, ${db.escape(username)},${db.escape(email)},${db.escape(phone)},${db.escape(hashedPassword)},${db.escape(img_profile)},${db.escape(is_verified)},2,${db.escape(createdAt)},${db.escape(
      updateAt
    )},${otpCode},${db.escape(otpExpiration)})`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      // if (results.insertId) {
      //   let sqlGet = `select * from user where id = ${results.insertId}`;
      //   db.query(sqlGet, (err2, results2) => {
      //     if (err2) {
      //       res.status(500).send(err);
      //     }

      //     //*DATA UNTUK MEMBUAT TOKEN
      //     let { id, username, email, role, is_verified } = results2[0];

      //     //*CREATE TOKEN
      //     let token = createToken({ id, username, email, role, is_verified });

      //*EMAIL VERIFICATION
      const mailOption = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Email verification OTP",
        text: `Your OTP code id ${otpCode}`,
      };

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log("Email sent : " + info.response);
      });

      res.status(200).send({ message: `Registration success, please check your email for verification !` });
    });
  },

  //*VERIFIKASI OTP
  verificationOTP: (req, res) => {
    const { otp } = req.body;

    const verifikasiQuery = `SELECT * FROM user WHERE otp = ${db.escape(otp)} AND otp_expire > NOW()`;

    db.query(verifikasiQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (results.length > 0) {
          // Kode OTP valid
          const userId = results[0].id;

          const updateQuery = `UPDATE user SET is_verified = "TRUE" WHERE id = ${db.escape(userId)}`;
          db.query(updateQuery, (updateErr) => {
            if (updateErr) {
              res.status(500).send(updateErr);
            } else {
              // Verifikasi email berhasil
              res.status(200).send("Email verification success");
            }
          });
        } else {
          // Kode OTP tidak valid atau telah kedaluwarsa
          res.status(400).send("Kode OTP tidak valid atau telah kedaluwarsa");
        }
      }
    });
  },
};

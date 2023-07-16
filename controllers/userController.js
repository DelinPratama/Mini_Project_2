const { db } = require("../database");
const crypto = require("crypto");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");

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

    let insertQuery = `insert into user values (null, ${db.escape(username)},${db.escape(email)},${db.escape(phone)},${db.escape(hashedPassword)},${db.escape(img_profile)},${db.escape(is_verified)},${db.escape(role)},${db.escape(
      createdAt
    )},${db.escape(updateAt)})`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      if (results.insertId) {
        let sqlGet = `select * from user where id = ${results.insertId}`;
        db.query(sqlGet, (err2, results2) => {
          if (err2) {
            res.status(500).send(err);
          }

          //*DATA UNTUK MEMBUAT TOKEN
          let { id, username, email, role, is_verified } = results2[0];

          //*CREATE TOKEN
          let token = createToken({ id, username, email, role, is_verified });

          //*EMAIL VERIFICATION
          //!NOT READY
          //   let mail = {
          //     from: `Admin <delinpratama24@gmail.com>`,
          //     to: `${email}`,
          //     subject: `Account Verification`,
          //     html: `<a href=>click here for verification your account</a>`,
          //   };

          //   transporter.sendMail;
        });
      }
      res.status(200).send({ message: `User berhasil ditambah` });
    });
  },
};

const { db } = require("../database");
const crypto = require("crypto");

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
    // password = crypto.createHmac("shal", "hash123").update(password);
    const hmac = crypto.createHmac("sha256", "hash123");
    const hashedPassword = hmac.update(password).digest("hex");
    // console.log(password);
    // console.log(hashedPassword);

    let insertQuery = `insert into user values (null, ${db.escape(username)},${db.escape(email)},${db.escape(phone)},${db.escape(hashedPassword)},${db.escape(img_profile)},${db.escape(is_verified)},${db.escape(role)},${db.escape(
      createdAt
    )},${db.escape(updateAt)})`;
    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: `User berhasil ditambah` });
    });
  },
};

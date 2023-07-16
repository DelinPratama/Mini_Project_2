const mysql = require("mysql2");

//* CONNNECTION TO DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "blog",
  multipleStatements: true,
});

//* CEK CONNECTION TO DB
db.connect((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  } else {
    console.log("connect to MySql server");
  }
});

module.exports = { db };

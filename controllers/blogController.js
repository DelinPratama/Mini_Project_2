const { db } = require("../database");

module.exports = {
  //* GET BLOG
  getBlog: (req, res) => {
    let scriptQuery = "select * from article;";
    if (req.query.id) {
      scriptQuery = `select * from article where id = ${db.escape(req.query.id)};`;
    }
    if (req.query.category) {
      scriptQuery = `select * from article where category_id = ${db.escape(req.query.category)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  //* GET CATEGORY
  getCategory: (req, res) => {
    let scriptQuery = "select * from category;";
    if (req.query.id) {
      scriptQuery = `select * from category where id = ${db.escape(req.query.id)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  //* CREATE ARTICLE
  addArticle: (req, res) => {
    // console.log(req.body);
    let { id, title, imageURL, content, videoURL, country, isPublished, isDeleted, createdAt, udpateAt, user_id, category_id } = req.body;
    let insertQuery = `insert into article values (null, ${db.escape(title)},${db.escape(imageURL)},${db.escape(content)},${db.escape(videoURL)},${db.escape(country)},${db.escape(isPublished)},${db.escape(isDeleted)},${db.escape(
      createdAt
    )},${db.escape(udpateAt)},${db.escape(user_id)},${db.escape(category_id)});`;
    console.log(insertQuery);
    //   db.query(insertQuery, (err, results)
    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);

      db.query(`select * from article where id=${db.escape(id)}`, (err, results) => {
        res.status(200).send({ message: `Penambahan data baru berhasil` });
      });
    });
  },

  //* DELETE ARTICLE
  deleteArticle: (req, res) => {
    let deleteQuery = `delete from article where id = ${req.params.id};`;
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: `Data berhasil dihapus` });
    });
  },
};

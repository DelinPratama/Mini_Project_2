const express = require("express");
const { blogController } = require("../controllers");
const routers = express.Router();

//*BLOG ROUTERS
routers.get("/blog", blogController.getBlog);
routers.get("/category", blogController.getCategory);
routers.post("/addArticle", blogController.addArticle);
routers.delete("/deleteArticle/:id", blogController.deleteArticle);

module.exports = routers;

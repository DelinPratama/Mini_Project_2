const express = require("express");
const { blogController, userController } = require("../controllers");
const routers = express.Router();

//*BLOG ROUTERS
routers.get("/blog", blogController.getBlog);
routers.get("/category", blogController.getCategory);
routers.post("/addArticle", blogController.addArticle);
routers.delete("/deleteArticle/:id", blogController.deleteArticle);

//*USER ROUTERS
routers.get("/user/getData/", userController.getData);
routers.post("/adduser", userController.addUser);

module.exports = routers;

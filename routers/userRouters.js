const express = require("express");
const { userController } = require("../controllers");
const routers = express.Router();

//*USER ROUTERS
routers.get("/user/getData/", userController.getData);
routers.post("/adduser", userController.addUser);
routers.patch("/verification", userController.verificationOTP);

module.exports = routers;

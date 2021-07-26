const express = require("express");
const api = express.Router();
const mdAuth = require("../middlewares/auth");
const userController = require("../controllers/user");

// public routes
api.post("/user/signin", userController.signin);
api.post("/user/signup", userController.signup);

module.exports = api;

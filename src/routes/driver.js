const express = require("express");
const api = express.Router();
const mdAuth = require("../middlewares/auth");
const driverController = require("../controllers/driver");

// public routes
api.post("/driver/signin", driverController.signin);
api.post("/driver/signup", driverController.signup);

module.exports = api;

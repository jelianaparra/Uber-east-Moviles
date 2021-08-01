const express = require("express");
const api = express.Router();
const mdAuth = require("../middlewares/auth");
const ShoppingCarController = require("../controllers/shoppingCar");

// crud de los productos o tambien menu en el front

api.post("/shoppingCar/addProducts", ShoppingCarController.addProducts);
api.get("/shoppingCar/getProducts", ShoppingCarController.getProducts);
//api.get("/shoppingCar/getProductsById/:id", productController.getProductsById);
//api.put("/shoppingCar/uptadeProducts/:id", productController.uptadeProducts);
api.delete(
  "/shoppingCar/deleteProducts/:id",
  ShoppingCarController.deleteProducts
);

module.exports = api;

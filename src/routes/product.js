const express = require("express");
const api = express.Router();
const mdAuth = require("../middlewares/auth");
const productController = require("../controllers/product");

// crud de los productos o tambien menu en el front

api.post("/product/createProducts", productController.createProducts);
api.get("/product/getProducts", productController.getProducts);
api.get("/product/getProductsById/:id", productController.getProductsById);
api.put("/product/uptadeProducts/:id", productController.uptadeProducts);
api.delete("/product/deleteProducts/:id", productController.deleteProducts);

module.exports = api;

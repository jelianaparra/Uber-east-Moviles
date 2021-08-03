const express = require("express");
const api = express.Router();
const mdAuth = require("../middlewares/auth");
const purchaseController = require("../controllers/purchase");

// crud de los productos o tambien menu en el front

api.post("/purchase/addPurchase", purchaseController.addPurchase);

/*
api.get("/product/getProducts", productController.getProducts);
api.get("/product/getProductsById/:id", productController.getProductsById);
api.get(
  "/product/getProductsByIdEstablishment/:id",
  productController.getProductsByIdEstablishment
);
api.put("/product/uptadeProducts/:id", productController.uptadeProducts);
api.delete("/product/deleteProducts/:id", productController.deleteProducts);
*/
module.exports = api;

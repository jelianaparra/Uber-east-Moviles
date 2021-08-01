const db = require("../services/db");
const shoppingCarQuerys = require("../queries/shoppingCar");
const ShoppingCarController = {};
const PDF = require("pdfkit");
const fs = require("fs");
const invoice = new PDF();

invoice.pipe(fs.createWriteStream("./pruebas/factura.pdf"));

invoice.text("LOS INVITAMOS DE NUEVO A UTILIZAR NUESTRA APLICACION", {
  align: "center",
});

/*invoice.image("../images/gracias-por-su-compra.jpg", {
  fit: [250, 300],
  align: "center",
  valign: "center",
});*/
var algo = "gggggggggggg";
invoice.text(algo);
invoice.end();

ShoppingCarController.addProducts = async (req, res) => {
  try {
    const { products, total } = req.body;
    const p = await db.any(shoppingCarQuerys.insertProducts, [products, total]);
    res.status(200).json({
      msg: "Products Successfully added",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The product could not be added",
      statusCode: 500,
    });
  }
};

ShoppingCarController.getProducts = async (req, res) => {
  try {
    let p = await db.any(shoppingCarQuerys.getProducts);
    console.log(p);
    res.status(200).json({
      msg: "Products Successfully Found",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No products in your ShoppingCar",
      statusCode: 500,
    });
  }
};

/*
ShoppingCarController.getProductsById = async (req, res) => {
  try {
    const id = await req.params.id;
    const p = await db.any(productsQuerys.getProductsById, [id]);
    res.status(200).json({
      msg: "Product Successfully Found",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The Product you are looking for does not exist... Sorry",
      statusCode: 500,
    });
  }
};

ShoppingCarController.uptadeProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, idEst, price } = req.body;
    console.log(id);
    const p = await db.any(productsQuerys.updateProducts, [
      name,
      description,
      idEst,
      price,
      id,
    ]);
    res.status(200).json({
      msg: "Product Successfully Updated",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The Product could not be updated",
      statusCode: 500,
    });
  }
};*/

ShoppingCarController.deleteProducts = async (req, res) => {
  try {
    const id = await req.params.id;
    const p = await db.any(shoppingCarQuerys.deleteProducts, [id]);
    res.status(200).json({
      msg: "Product removed successfully from your ShoppingCar",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The product could not be eliminated from your ShoppingCar",
      statusCode: 500,
    });
  }
};

module.exports = ShoppingCarController;

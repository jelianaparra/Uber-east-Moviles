const db = require("../services/db");
const productsQuerys = require("../queries/product");
const ProductsController = {};

ProductsController.createProducts = async (req, res) => {
  try {
    const { name, description, id, price } = req.body;
    const p = await db.any(productsQuerys.insertProducts, [
      name,
      description,
      id,
      price,
    ]);
    res.status(200).json({
      msg: "Products Successfully Found",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The product could not be created",
      statusCode: 500,
    });
  }
};

ProductsController.getProducts = async (req, res) => {
  try {
    let p = await db.any(productsQuerys.getProducts);
    console.log(p);
    res.status(200).json({
      msg: "Products Successfully Found",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No products found",
      statusCode: 500,
    });
  }
};
ProductsController.getProductsById = async (req, res) => {
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

ProductsController.uptadeProducts = async (req, res) => {
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
};

ProductsController.deleteProducts = async (req, res) => {
  try {
    const id = await req.params.id;
    const p = await db.any(productsQuerys.deleteProducts, [id]);
    res.status(200).json({
      msg: "Product removed successfully",
      statusCode: 200,
      data: p,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The product could not be eliminated",
      statusCode: 500,
    });
  }
};

module.exports = ProductsController;

const db = require("../services/db");
const productsQuerys = require("../queries/product");
const PurchaseController = {};

PurchaseController.addPurchase = async (req, res) => {
  try {
    const { name, description, id, price } = req.body;
    const userId = req.user.id;
    const p = await db.any(productsQuerys.insertProducts, [
      name,
      description,
      id,
      price,
    ]);
    res.status(200).json({
      msg: "Products Successfully created",
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
module.exports = PurchaseController;

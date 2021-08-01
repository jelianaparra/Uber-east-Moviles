const { PreparedStatement: PS } = require("pg-promise");
const queries = {
  getProducts: new PS({
    name: "getProducts",
    text: `SELECT * FROM shoppingcar;`,
  }),
  /*getProductsById: new PS({
    name: "getProductsById",
    text: `SELECT * FROM product WHERE p_id = $1;`,
  }),
  getProductsByName: new PS({
    name: "getProductsByName",
    text: `SELECT * FROM product WHERE p_name = $1;`,
  }),
  getProductsByEmailDistinctId: new PS({
    name: "getEstablishmentByEmailDistinctId",
    text: `SELECT * FROM establishement WHERE e_email = $1 AND e_id != $2;`,
  }),*/
  insertProducts: new PS({
    name: "insertProducts",
    text: `
        INSERT INTO shoppingcar ( 
            s_products,
            s_total     
        )
        VALUES($1, $2)`,
  }),
  /*updateProducts: new PS({
    name: "updateProducts",
    text: `
        UPDATE product_purchase SET
            pur_id = $1,
            pp_pricepurchase = $2, 
            p_id = $3,
            pp_amount = $4

        WHERE p_id = $5;`,
  }),*/
  deleteProducts: new PS({
    name: "deleteProducts",
    text: `DELETE FROM shoppingcar where s_id = $1`,
  }),
};

module.exports = queries;

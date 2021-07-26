const { PreparedStatement: PS } = require("pg-promise");
const queries = {
  getProducts: new PS({
    name: "getProducts",
    text: `SELECT * FROM product;`,
  }),
  getProductsById: new PS({
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
  }),
  insertProducts: new PS({
    name: "insertProducts",
    text: `
        INSERT INTO product (
            p_name, 
            p_description, 
            e_id,
            p_price          
        )
        VALUES($1, $2, $3, $4)`,
  }),
  updateProducts: new PS({
    name: "updateProducts",
    text: `
        UPDATE product SET
            p_name = $1,
            p_description = $2, 
            e_id = $3,
            p_price = $4

        WHERE p_id = $5;`,
  }),
  deleteProducts: new PS({
    name: "deleteProducts",
    text: `DELETE FROM product where p_id = $1`,
  }),
};

module.exports = queries;

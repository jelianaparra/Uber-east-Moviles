const { PreparedStatement: PS } = require("pg-promise");
const queries = {
  insertPurchase: new PS({
    name: "insertPurchase",
    text: `
            INSERT INTO purchase (
                u_id, 
                _description, 
                e_id,
                p_price          
            )
            VALUES($1, $2, $3, $4)`,
  }),
};

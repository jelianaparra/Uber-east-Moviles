const { PreparedStatement: PS } = require("pg-promise");
const queries = {
  getEstablishement: new PS({
    name: "getEstablishement",
    text: `SELECT * FROM Establishement;`,
  }),
  getEstablishementById: new PS({
    name: "getEstablishementById",
    text: `SELECT * FROM establishement WHERE e_id = $1;`,
  }),
  getEstablishmentByEmail: new PS({
    name: "getEstablishmentByEmail",
    text: `SELECT * FROM establishement WHERE e_email = $1;`,
  }),
  getEstablishmentByEmailDistinctId: new PS({
    name: "getEstablishmentByEmailDistinctId",
    text: `SELECT * FROM establishement WHERE e_email = $1 AND e_id != $2;`,
  }),
  insertEstablishment: new PS({
    name: "insertEstablishment",
    text: `
        INSERT INTO establishement(
            e_email, 
            e_password, 
            e_name,
            e_latitude,
            e_longitude,
            e_direction,
            e_foto,
            e_available
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
  }),
  updateEstablishment: new PS({
    name: "updateEstablishment",
    text: `
        UPDATE establishement SET
            e_email = $1,
            e_name = $2,
            e_latitude = $3,
            e_longitude = $4, 
            e_direction= $5,
            e_foto = $6,
            e_available = $7,
            e_password= $8
        WHERE e_id = $9;`,
  }),
  deleteEstablishments: new PS({
    name: "deleteEstablishments",
    text: "DELETE FROM establishments where id = $1`",
  }),
};

module.exports = queries;

const { PreparedStatement: PS } = require("pg-promise");
const queries = {
    getEstablishement: new PS({
        name: "getEstablishement",
        text: `SELECT * FROM establishement;`,
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
            e_name
        )
        VALUES($1, $2, $3)`,
    }),
    updateEstablishment: new PS({
        name: "updateEstablishment",
        text: `
        UPDATE establishement SET
            e_email = $1,
            e_name = $2
        WHERE e_id = $3;`,
    }),
};

module.exports = queries;

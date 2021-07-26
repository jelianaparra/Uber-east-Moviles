const { PreparedStatement: PS } = require("pg-promise");
const queries = {
    getDriver: new PS({
        name: "getDriver",
        text: `SELECT * FROM driver;`
    }),
    getDriverById: new PS({
        name: "getDriverById",
        text: `SELECT * FROM driver WHERE d_id = $1;`,
    }),
    getDriverByEmail: new PS({
        name: "getDriverByEmail",
        text: `SELECT * FROM driver WHERE d_email = $1;`,
    }),
    getDriverByEmailDistinctId: new PS({
        name: "getDriverByEmailDistinctId",
        text: `SELECT * FROM driver WHERE d_email = $1 AND d_id != $2;`,
    }),
    insertDriver: new PS({
        name: "insertDriver",
        text: `
        INSERT INTO driver(
            d_email, 
            d_password, 
            d_name,
            d_lastname,
            d_created_at,
            d_uptaded_at
        )
        VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    }),
    updateDriver: new PS({
        name: "updateDriver",
        text: `
        UPDATE driver SET
            d_email = $1,
            d_name = $2
        WHERE d_id = $3;`,
    }),
};

module.exports = queries;

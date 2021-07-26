const { PreparedStatement: PS } = require("pg-promise");
const queries = {
  getUsers: new PS({
    name: "getUsers",
    text: `SELECT * FROM users;`,
  }),
  getUsersById: new PS({
    name: "getUsersById",
    text: `SELECT * FROM users WHERE u_id = $1;`,
  }),
  getUsersByEmail: new PS({
    name: "getUsersByEmail",
    text: `SELECT * FROM users WHERE u_email = $1;`,
  }),
  getUsersByEmailDistinctId: new PS({
    name: "getUsersByEmailDistinctId",
    text: `SELECT * FROM users WHERE u_email = $1 AND u_id != $2;`,
  }),
  insertUser: new PS({
    name: "insertUser",
    text: `
        INSERT INTO users(
            u_email, 
            u_password, 
            u_name,
            u_lastname,
            u_created_at,
            u_uptaded_at
        )
        VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
  }),
  updateUser: new PS({
    name: "updateUser",
    text: `
        UPDATE users SET
            u_email = $1,
            u_name = $2
        WHERE u_id = $3;`,
  }),
};

module.exports = queries;

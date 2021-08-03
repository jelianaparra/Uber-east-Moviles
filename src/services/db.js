const pgp = require("pg-promise")();
const config = require("../config/index");
let { user, password, host, port, database } = config.db;

const db = pgp({
  connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
  ssl: { rejectUnauthorized: false },
});

module.exports = db;

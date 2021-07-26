const pgp = require('pg-promise')();
const config = require('../config/index');
let {user, password, host, port, database} = config.db;
const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

module.exports = db;
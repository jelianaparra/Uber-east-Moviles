"use strict";

const db = require("./db");
const jwt = require("./jwt");
const base = require("./base");
const cors = require("./cors");

const Config = new Object({
  db: db,
  jwt: jwt,
  base: base,
});

module.exports = Config;

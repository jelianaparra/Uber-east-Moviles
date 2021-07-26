"use strict";

const db = require("./db"),
  jwt = require("./jwt"),
  base = require("./base"),
  cors = require("./cors"),
  mail = require("./mail");

const Config = {
  db,
  jwt,
  base,
  cors,
  mail,
};

module.exports = Config;

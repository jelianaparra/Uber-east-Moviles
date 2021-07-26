"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

exports.createToken = (user) => {
  let payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(config.jwt.expirationDays, "days").unix(),
  };

  return jwt.encode(payload, config.jwt.secret);
};

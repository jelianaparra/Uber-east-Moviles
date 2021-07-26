"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config/jwt");

const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send();

  let token = req.headers.authorization.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        error: ["El token ha expirado"],
      });
    }
  } catch (err) {
    return res.status(403).send({
      error: ["El token no es válido"],
    });
  }

  req.user = payload;
  next();
};

const ensureEstablishment = (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).send();

  let token = req.headers.authorization.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);

    if (payload.role != 2) {
      return res.status(403).send({
        error: ["Empresa no autorizada"],
      });
    }
  } catch (err) {
    return res.status(403).send({
      error: ["Empresa no autorizada"],
    });
  }

  req.user = payload;
  next();
};

const ensureUser = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).send({
      error: ["Usuario no autorizado"],
    });

  let token = req.headers.authorization.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);

    if (payload.role != 1) {
      return res.status(403).send({
        error: ["Usuario no autorizado"],
      });
    }
  } catch (err) {
    return res.status(403).send({
      error: ["Usuario no autorizado"],
    });
  }

  req.user = payload;
  next();
};

const ensureDriver = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).send({
      error: ["Conductor no autorizado"],
    });

  let token = req.headers.authorization.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);
    if (payload.role != 4) {
      return res.status(403).send({
        error: ["Conductor no autorizado"],
      });
    }
  } catch (err) {
    return res.status(403).send({
      error: ["Conductor no autorizado"],
    });
  }

  req.user = payload;
  next();
};

const ensureAdmin = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).send({
      error: ["Administrador no autorizado"],
    });

  let token = req.headers.authorization.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);
    if (payload.role != 3) {
      return res.status(403).send({
        error: ["Administrador no autorizado"],
      });
    }
  } catch (err) {
    return res.status(403).send({
      error: ["Administrador no autorizado"],
    });
  }

  req.user = payload;
  next();
};

const ensureAuthByGet = (req, res, next) => {
  if (!req.query.q) return res.status(403).send();

  let token = req.query.q.replace(/['"]+/g, ""),
    payload;

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);

    if (payload.exp <= moment().unix()) {
      return res.status(403).send();
    }
  } catch (err) {
    return res.status(403).send();
  }

  req.user = payload;

  next();
};

const ensureSocket = (token, next) => {
  let payload;
  token = token.replace(/['"]+/g, "");

  try {
    token = token.replace("Bearer ", "");
    payload = jwt.decode(token, config.secret);

    if (payload.exp <= moment().unix()) {
      return false;
    }
  } catch (err) {
    return false;
  }

  next(payload);
};

module.exports = {
  ensureAuth,
  ensureEstablishment,
  ensureUser,
  ensureAdmin,
  ensureDriver,
  ensureAuthByGet,
  ensureSocket,
};

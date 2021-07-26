const bcrypt = require("bcrypt-nodejs");
const db = require("../services/db");
const jwt = require("../services/jwt");
const driverQuerys = require("../queries/driver");
const DriverController = {};

getResponse = () => {
  return {
    status: 200,
    data: [],
    error: [],
  };
};

DriverController.signin = async (req, res) => {
  const response = getResponse();
  try {
    let { email, password } = req.body;
    let profile = await db.any(driverQuerys.getDriverByEmail, [email]);

    console.log(profile);

    if (profile.length) {
      profile = profile[0];
      //Comparo las passwords
      await new Promise((resolve, reject) => {
        bcrypt.compare(password, profile.d_password, async (err, check) => {
          if (err) {
            response.status = 500;
            response.error.push("GENERAL_ERROR");
            resolve();
          } else {
            //Si el password es correcto
            if (check) {
              const driver = profile;
              driver.d_password = undefined;
              driver.d_status = undefined;
              driver.role = 1;
              response.data.push({
                token: jwt.createToken(driver),
                profile: profile,
              });
            }
            //Si no
            else {
              response.status = 403;
              response.error.push("INCORRECT_PASSWORD");
            }

            resolve();
          }
        });
      });
    } else {
      response.status = 404;
      response.error.push("INVALID_USER");
    }
  } catch (error) {
    response.status = 500;
    response.error = error;
  } finally {
    res.status(response.status).send(response);
  }
};

DriverController.signup = async (req, res) => {
  const response = getResponse();
  try {
    let { email, lastname, password, name } = req.body;
    let rs = await db.any(driverQuerys.getDriverByEmail, [email]);

    if (rs.length) {
      response.status = 403;
      response.error = "ALREADY_EXIST_EMAIL";
    }

    await new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
          reject("PASSWORD_INVALID");
        } else {
          password = hash;
          resolve();
        }
      });
    });

    rs = await db.any(driverQuerys.insertDriver, [
      email,
      password,
      name,
      lastname,
    ]);

    response.data = {
      status: 200,
    };
  } catch (error) {
    response.status = 500;
    response.error = error;
    console.log(error);
  } finally {
    res.status(response.status).send(response);
  }
};

module.exports = DriverController;

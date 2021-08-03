const bcrypt = require("bcrypt-nodejs");
const db = require("../services/db");
const jwt = require("../services/jwt");
const userQuerys = require("../queries/user");
const UserController = {};

UserController.signin = async (req, res) => {
  const response = {
    status: 200,
    data: [],
    error: [],
  };
  try {
    let { email, password } = req.body;
    let profile = await db.any(userQuerys.getUsersByEmail, [email]);

    console.log(profile);

    if (profile.length) {
      profile = profile[0];
      //Comparo las passwords
      await new Promise((resolve, reject) => {
        bcrypt.compare(password, profile.u_password, async (err, check) => {
          if (err) {
            response.status = 500;
            response.error.push("GENERAL_ERROR");
            resolve();
          } else {
            //Si el password es correcto
            if (check) {
              const user = profile;
              profile.u_password = undefined;
              profile.u_status = undefined;
              profile.role = 1;
              response.data.push({
                token: jwt.createToken(user),
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
    console.log(error);
    if (response.status == 200) {
      response.status = 500;
      response.error = error;
    }
  } finally {
    res.status(200).send(response);
  }
};

UserController.signup = async (req, res) => {
  const response = {
    status: 200,
    data: [],
    error: [],
  };

  try {
    let { email, password, name, lastname } = req.body;
    //console.log(email, password, name, lastname);
    // console.log(req.body);
    let rs = await db.any(userQuerys.getUsersByEmail, [email]);

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

    rs = await db.any(userQuerys.insertUser, [email, password, name, lastname]);

    response.data = {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    if (response.status == 200) {
      response.status = 500;
      response.error = error;
    }
  } finally {
    res.status(200).send(response);
  }
};

module.exports = UserController;

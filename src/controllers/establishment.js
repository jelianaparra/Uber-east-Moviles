const bcrypt = require("bcrypt-nodejs");
const db = require("../services/db");
const jwt = require("../services/jwt");
const establishmentQuerys = require("../queries/establishment");
const EstablishmentController = {};

getResponse = () => {
  return {
    status: 200,
    data: [],
    error: [],
  };
};

EstablishmentController.signin = async (req, res) => {
  const response = getResponse();
  try {
    let { email, password } = req.body;
    let profile = await db.any(establishmentQuerys.getEstablishmentByEmail, [
      email,
    ]);

    if (profile.length) {
      profile = profile[0];
      //Comparo las passwords
      await new Promise((resolve, reject) => {
        bcrypt.compare(password, profile.e_password, async (err, check) => {
          if (err) {
            response.status = 500;
            response.error.push("GENERAL_ERROR");
            resolve();
          } else {
            //Si el password es correcto
            if (check) {
              const user = profile;
              user.role = 2;
              profile.e_password = undefined;
              profile.e_status = undefined;

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
    if (response.status == 200) {
      response.status = 500;
      response.error = error;
    }
  } finally {
    res.status(response.status).send(response);
  }
};

EstablishmentController.signup = async (req, res) => {
  const response = getResponse();
  try {
    let {
      email,
      password,
      name,
      latitude,
      longitude,
      direction,
      foto,
      available,
    } = req.body;
    let rs = await db.any(establishmentQuerys.getEstablishmentByEmail, [email]);

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

    rs = await db.any(establishmentQuerys.insertEstablishment, [
      email,
      password,
      name,
      latitude,
      longitude,
      direction,
      foto,
      available,
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

EstablishmentController.getEstablishments = async (req, res) => {
  try {
    let es = await db.any(establishmentQuerys.getEstablishement);
    console.log(es);
    res.status(200).send({
      msg: "Establishments Successfully Found",
      statusCode: 200,
      data: es,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "No establishments found",
      statusCode: 500,
    });
  }
};
EstablishmentController.getEstablishmentsById = async (req, res) => {
  try {
    const id = await req.params.id;
    const es = await db.any(establishmentQuerys.getEstablishementById, [id]);
    res.status(200).json({
      msg: "Establishment Successfully Found",
      statusCode: 200,
      data: es,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The establishment you are looking for does not exist... Sorry",
      statusCode: 500,
    });
  }
};

EstablishmentController.uptadeEstablishments = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      email,
      password,
      foto,
      available,
      latitude,
      longitude,
      direction,
    } = req.body;
    console.log(id);
    const es = await db.any(establishmentQuerys.updateEstablishment, [
      email,
      name,
      longitude,
      latitude,
      direction,
      foto,
      available,
      password,

      id,
    ]);
    res.status(200).json({
      msg: "Establishment Successfully Updated",
      statusCode: 200,
      data: es,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The establishment could not be updated",
      statusCode: 500,
    });
  }
};

EstablishmentController.deleteEstablishments = async (req, res) => {
  try {
    const id = await req.params.id;
    const es = await db.any(establishmentQuerys.deleteEstablishments, [id]);
    res.status(200).json({
      msg: "Establishment removed successfully",
      statusCode: 200,
      data: es,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "The establishment could not be eliminated",
      statusCode: 500,
    });
  }
};

module.exports = EstablishmentController;

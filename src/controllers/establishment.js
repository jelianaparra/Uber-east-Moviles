const bcrypt = require('bcrypt-nodejs')
const db = require('../services/db')
const jwt = require('../services/jwt');
const establishmentQuerys = require('../queries/establishment');

class EstablishmentController{

  constructor(){
  }

  getResponse = ()=>{
    return {
      status: 200,
      data: [],
      error: []
    }
  }

  signin = async (req,res) => {

    const response = this.getResponse();
    try {

      let {email, password} = req.body;
      let profile = await db.any(establishmentQuerys.getEstablishmentByEmail, [email]);

      if(profile.length) {
        profile = profile[0];
        //Comparo las passwords
        await new Promise((resolve,reject) =>{
          bcrypt.compare(password, profile.e_password, async (err, check) => {
            
            if(err) {
              response.status = 500;
              response.error.push('GENERAL_ERROR')
              resolve();
            }
  
            else {

              //Si el password es correcto
              if(check) {
                const user = profile;
                user.role = 2;
                profile.e_password = undefined;
                profile.e_status = undefined;

                response.data.push({
                  'token': jwt.createToken(user),
                  'profile': profile
                });

              }
              //Si no
              else {
                response.status = 403;
                response.error.push('INCORRECT_PASSWORD')
              }
              
              resolve();
            }
  
          })
        })

      }
      else {
        response.status = 404;
        response.error.push('INVALID_USER')
      }

    }catch(error){
      if(response.status == 200){
        response.status = 500;
        response.error = error;
      }
    }finally{
      res.status(response.status).send(response);
    }
  }

  signup = async (req,res) => {
    
    let response = this.getResponse();

    try {
      let {email, password, name, direction, foto, available, latitude, longitude} = req.body;
      let rs = await db.any(establishmentQuerys.getEstablishmentByEmail, [email]);

      if(rs.length){
        response.status = 403;
        response.error = "ALREADY_EXIST_EMAIL"
      }
      
      await new Promise((resolve,reject)=>{
        bcrypt.hash(password, null, null, (err, hash) => {
          if(err) {
            reject('PASSWORD_INVALID');
          }else{
            password = hash
            resolve();
          }
        })
      });

      rs = await db.any(establishmentQuerys.insertEstablishment,[email,password, name, direction, foto, available, latitude, longitude]);

      response.data = {
        status:   200
      }

    }catch (error){
      if(response.status == 200){
        response.status = 500;
        response.error = error;
      }
    }finally{
      res.status(response.status).send(response);
    }
  }

  getEstablishments = async (req,res) =>{
    let response = this.getResponse();
    try{
        const es = await db.any(establishmentQuerys.getEstablishement)
        res.status(200).json(response.rows)
    }catch(error){
      //MANEJO DEL ERROR
      respose.error = error;
      //respose.status = 500;
    }finally{
      //Y AL FINAL ENVIA LA RESPUESTA
      res.status(200).send(response);
           
    }
  }

  uptadeEstablishments= async (req,res) =>{
    let response = this.getResponse();
 /*
    try{
      const id = req.params.id;
      const { name, email, password, direction, available, direction, latitude, } = req.body;
  
      const response = await db.any(establishmentQuerys.updateEstablishment, [
          name,
          email,
          password,
          direction,
          id
      ]);
      res.status(200).json(response.rows);
    }catch{
      res.status(505);
    }finally{
      res.status(200).send(response)
    
  };
    try{
      const id = req.params.id ;
     // let rs = await db.any(establishmentQuerys.updateEstablishment, [email, name, password, direction, available]);
      const { email, password, direction, available, foto } = req.body;
      const response = await db.any(establishmentQuerys.updateEstablishment, [
      
        email,
        password,
        available,
        id,
        direction,
        foto
    ]);
    //res.status(200).json(response.rows);

    }catch(error){
      //MANEJO DEL ERROR
      respose.error = error;
      respose.status = 500;
    }finally{
      //Y AL FINAL ENVIA LA RESPUESTA
      res.status(200).send(response)
     
    }*/
  }


}

module.exports = new EstablishmentController();

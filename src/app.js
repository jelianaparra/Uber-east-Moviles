'use strict'

const express = require('express'),
      expressValidator = require('express-validator'),
      helmet = require('helmet'),
      cors = require('cors'),
      path = require('path'),
      config = require('./config'),
      app = express(),
      morgan = require('morgan'),
      mdAuth = require('./middlewares/auth'),
      sharp = require('sharp'),
      fs = require('fs'),

      //Agregar aqui las nuevas rutas
      driverRoute = require('./routes/driver'),
      userRoute = require('./routes/user'),
      establishmentRoute = require('./routes/establishment');

// configure response
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
  limit: '100mb'
}));
app.use(helmet())
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

switch(process.env.NODE_ENV){
  case 'production':
    break;
  default:
    app.use(morgan('tiny'));
  break
}

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

//Colocar para que funcionen las nuevas rutas
app.use('/api/v1',
[
  userRoute,
  establishmentRoute,
  driverRoute
])

app.get('/health', (req,res)=>{res.sendStatus(200)});

app.get('/static/*', (req,res,next)=>{
  let pathUrl = path.join(__dirname,('../public'+req.path));
  if(fs.existsSync(pathUrl)){
    res.status(200).sendFile(pathUrl);
  }else{
    res.sendStatus(404);
  }
})

app.get('/*', function (req, res,next) {
  res.sendFile(path.join(__dirname))
});

module.exports = app

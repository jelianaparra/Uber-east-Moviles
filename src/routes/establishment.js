const express = require('express')
const api = express.Router()
const mdAuth = require('../middlewares/auth')
const establishmentController = require('../controllers/establishment')

// rutas publicas 
api.post('/establishment/signin', establishmentController.signin)
api.post('/establishment/signup', establishmentController.signup)


// crud de los establecimientos
api.get('/establishment/getEstablishments', establishmentController.getEstablishments)
api.put('/establishment/uptadeEstablishments/:id', establishmentController.uptadeEstablishments)

module.exports = api;

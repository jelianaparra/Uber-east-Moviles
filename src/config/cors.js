'use strict'

const base = require('./base')


let allowDomains


switch(process.env.NODE_ENV) {

  case 'development':
  default:
  case 'staging':
  case 'production':
    allowDomains = '*'
    break
}


const Config = new Object({
  allowDomains: allowDomains
})


module.exports = Config

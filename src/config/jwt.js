'use strict'

let secret,
    expirationDays


switch(process.env.NODE_ENV) {

  case 'development':
  default:
    secret = 'OP123J4KRFWVCMR23MRC2CRM98198AAA25'
    expirationDays = 180
    break

  case 'staging':
    secret = '75QF1J4KRFWVCMR23MRC2GT211116R1R1E'
    expirationDays = 3
    break

  case 'production':
    secret = '75QF1J4KRFWVCMR23MRC2GT211116R1R1E'
    expirationDays = 3
    break
}


const Config = new Object({
  secret: secret,
  expirationDays: expirationDays
})


module.exports = Config

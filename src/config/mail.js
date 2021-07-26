'use strict'

let mailOptions


switch(process.env.NODE_ENV) {

  case 'development':
  default:
    mailOptions = {
      from: '',
      to: '',
      transporter: {
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: ``
        }
      }
    }
    break

  case 'staging':
    mailOptions = {
      from: '',
      to: '',
      transporter: {
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: ``
        }
      }
    }
    break

  case 'production':
    mailOptions = {
      from: '',
      to: '',
      transporter: {
        host: '',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: ``
        }
      }
    }
    break
}


const Config = new Object({
  mailOptions: mailOptions
})


module.exports = Config

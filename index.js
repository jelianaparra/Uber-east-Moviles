'use strict'

const app = require('./src/app'),
      server = require('http').Server(app),
      logService = require('./src/services/logger')
      
  
var port;

switch(process.env.NODE_ENV){
case 'production':
    port = process.env.PORT || 3000
    break;
default:
    port = process.env.PORT || 3002
break
}

server.listen(port, () => {
  logService.info(`Server running in http://localhost:${ port } with environment ${ process.env.NODE_ENV }`)
})

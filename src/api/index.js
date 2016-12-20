const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8080,
  routes: { cors: true }
})

server.register([
    require('./modules/dice'),
    require('./modules/spells')
  ], err => { 
  if (err) {
    console.error(err)
  }
})

// server.on('request-internal', request => console.log(request))

server.start(err => {
  if (err) {
    throw err
  }

  console.log('Server running at:', server.info.uri)
})

const Hapi = require('hapi')
const Boom = require('boom')
const Fuse = require('fuse.js')

const server = new Hapi.Server()
const diceEngine = require('dice-engine').default

server.connection({
  host: 'localhost',
  port: 8080,
  routes: { cors: true }
})


const roll = (id, rollString, next) => {
  diceEngine.Parse(rollString).then(result => {
    next(null, { value: result.toString(), roll: result })
  }).catch(next)
}

server.method('roll', roll, {
  cache: {
    expiresIn: 60 * 60 * 1000,
    segment: 'dice',
    generateTimeout: 10000
  }
})

const knownSpells = require('./data/spells.json')

const mappedSpells = Object.keys(knownSpells).map(name => { 
  let spell = knownSpells[name]
  spell.name = name
  return spell
})

const fuseOptions = {
  caseSensitive: false,
  keys: ['name', 'description'],
  include: ['score'],
  threshold: 0.2
}

const fused = new Fuse(mappedSpells, fuseOptions)
const findSpell = (query, next) => next(null, fused.search(query))

server.method('findSpell', findSpell , {
  cache: {
    expiresIn: 60 * 60 * 1000,
    segment: 'query',
    generateTimeout: 10000
  }
})

server.route({
  method: 'POST',
  path: '/roll/{id}',
  handler: (request, reply) => {
    server.methods.roll(request.params.id, request.payload.diceString, (err, result) => {
      if (err) {
        console.log(err)
        return reply(Boom.badRequest('Bad input'))
      }

      console.log('rolled', result.stats)
      return reply(result)
    })
  }
})


server.route({
  method: 'GET',
  path: '/spell/{query}',
  handler: (request, reply) => {
    server.methods.findSpell(request.params.query, (err, result) => {
      if(err) {
        console.log(err)
        return reply(Boom.badRequest('Bad input'))
      }

      console.log('queried', request.params.query)
      return reply(result)
    })
  }
})

// server.on('request-internal', request => console.log(request))

server.start(err => {
  if (err) {
    throw err
  }

  console.log('Server running at:', server.info.uri)
})

const Boom = require('boom')
const Fuse = require('fuse.js')
const knownSpells = require('../data/spells.json')

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

exports.register = (server, options, next) => {

  server.method('findSpell', (query, next) => next(null, fused.search(query)), {
    cache: {
      expiresIn: 60 * 60 * 1000,
      segment: 'query',
      generateTimeout: 10000
    }
  })

  server.route({
    method: 'GET',
    path: '/spell/{query}',
    handler: (request, reply) => {
      server.methods.findSpell(request.params.query, (err, result) => {
        if (err) {
          return reply(Boom.badRequest('Bad input'))
        }

        return reply(result)
      })
    }
  })

  next()
}

exports.register.attributes = {
  version: '0.5.0',
  name: 'spells'
}
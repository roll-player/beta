const Boom = require('boom')

const diceEngine = require('dice-engine').default

exports.register = (server, options, next) => {

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

  server.route({
    method: 'POST',
    path: '/roll/{id}',
    handler: (request, reply) => {
      server.methods.roll(request.params.id, request.payload.diceString, (err, result) => {
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
  name: 'rollApi',
  version: '0.1.0'
}
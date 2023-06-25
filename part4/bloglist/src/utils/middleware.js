const logger = require('./logger')
/*const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))
morgan('dev')
morgan(':body', {
  skip: (req, res) => {
    return !(req.method === 'PUT' || req.method === 'POST')
  },
})*/

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const checkAuthHeader = (request, response, next) => {
  if (!request.auth) {
    const error = new Error('Unauthorized')
    error.name = 'UnauthorizedError'
    next(error)
  }
}

const throwMyCustomError = (name, message) => {
  const error = new Error(message)
  error.name = name
  throw error
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  throwMyCustomError,
  checkAuthHeader,
  requestLogger,
  unknownEndpoint,
  errorHandler,
}

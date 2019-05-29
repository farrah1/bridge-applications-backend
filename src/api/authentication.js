const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// Initialize the app.
const authenticateRequest = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-ehchugtz.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'localhost:3400',
  issuer: 'https://dev-ehchugtz.auth0.com',
  algorithms: [ 'RS256' ]
})

class UnauthorizedError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 401
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

// TODO: change to real auth!
const authenticate = (req, res, next) => {
  try {
    token = req.headers.authorization
    if (!token) {
      console.log('no token')
      return next(new UnauthorizedError('Missing Token'))
    }

    req.user = {
      id: 1
    }

    return next()
  } catch (error) {
    next(new UnauthorizedError('Missing Token'))
  }
}

module.exports = {
  authenticateRequest,
  UnauthorizedError
}

const express = require('express')
const {
  check,
  checkBody,
  validationResult
} = require('express-validator/check')
const configuration = require('../../../knexfile')

const database = require('knex')(configuration)

const cohortsController = require('./cohorts.controller')

const router = express.Router()

class UnauthenticatedError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 403
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

// you do this here
// router.use(decodeToken)
// router.get('/', cohortsController.auth, function(req, res) {
//     res.send('authentication passed!');
// });

router.get('', (req, res, next) => {
  if (req.user.permissions.includes('read:cohorts')) {
    next()
  } else {
    UnauthenticatedError('Failed')
    next(err)
  }
}, cohortsController.index)

const isDate = value => {
  d = Date.parse(value)
  return !isNaN(d)
}

router.post(
  '',
  [
    check('name').exists(),
    check('start_date').custom(value => isDate(value)),
    check('end_date').custom(value => isDate(value)),
    check('welcome_text').isLength({ min: 2 }),
    check('thank_you_text').isLength({ min: 2 })
  ],
  cohortsController.create
)

router.get('/:id', cohortsController.get)

router.get('/:id/applications', cohortsController.getCohortApplications)

router.put('/:id', cohortsController.update)

router.delete('/:id', cohortsController.remove)

module.exports = {
  cohortsRouter: router
}

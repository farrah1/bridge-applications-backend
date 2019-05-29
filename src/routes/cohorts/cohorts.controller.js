const {
  check,
  checkBody,
  validationResult
} = require('express-validator/check')
const database = require('../../db')
const Cohort = require('./cohorts.model')
class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 404
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

const index = (req, res, next) => {
  Cohort.query()
    .then(cohorts => res.json({ data: cohorts }))
    .catch(error => next(error))
}

const create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('ERROR')
    return res.status(422).json({ errors: errors.array() })
  }
  return Cohort.insertCohort(req.body)
    .then(cohort => res.json(cohort))
    .catch(error => next(error))
}

const get = (req, res, next) => {
  return Cohort.query()
    .where('cohorts.id', req.params.id)
    .then(cohorts => {
      if (cohorts.length > 0) {
        return res.json({
          data: cohorts[0]
        })
      }
      throw new NotFoundError('Unable to find cohort')
    })
    .catch(error => next(error))
}

const update = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const id = req.params.id
  return Cohort.updateCohort(id, req.body)
    .then(cohort => res.json(cohort))
    .catch(error => next(error))
}

const remove = async (req, res, next) => {
  try {
    await Cohort.deleteCohort(req.params.id)
    res.json({ data: { id: req.params.id } })
  } catch (error) {
    next(error)
  }
}

const getCohortApplications = async (req, res, next) => {
  try {
    const applications = await Cohort.getCohortApplications(req.params.id)
    res.json({ data: applications })
  } catch (error) {
    next(error)
  }
}

// authentication
const auth = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    console.log('no token')
  }
  var decoded = Buffer.from(token, 'base64').toString('ascii')

  if (req.user.authenticated) {
    return next()
  } else {
    return 'unauthorized'
  }

  res.redirect('/')
}

module.exports = {
  index,
  get,
  update,
  create,
  remove,
  getCohortApplications,
  auth
}

const express = require('express')

const { authenticateRequest } = require('./authentication.js')
const { authorizeRequest } = require('./authorization')
const { healthRouter } = require('../routes/health/health.router')
const { usersRouter } = require('../routes/users/users.router')
const { cohortsRouter } = require('../routes/cohorts/cohorts.router')
const {
  applicationsRouter
} = require('../routes/applications/applications.router')

const router = express.Router()

// unauthenticated endpoints
router.use('/health', healthRouter)

router.use(authenticateRequest)
router.use(authorizeRequest)

// authenticated endpoints
router.use('/users', usersRouter)
router.use('/cohorts', cohortsRouter)
router.use('/applications', applicationsRouter)

module.exports = router

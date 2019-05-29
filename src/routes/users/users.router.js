const express = require('express')
const { check, validationResult } = require('express-validator/check')
const configuration = require('../../../knexfile')
const database = require('knex')(configuration)

const usersController = require('./users.controller')

const router = express.Router()

router.get('', usersController.index)

router.post('', [
  check('email').isEmail(),
  check('email').custom((value) => {
    return database('users').select('id').where({ email: value }).then((result) => {
      if (result.length) {
        return Promise.reject('Email in use')
      }
    })
  }),
  check('first_name').isLength({ min: 2 }),
  check('last_name').isLength({ min: 2 }),
  check('pronouns').exists(),
  check('employment_status').isIn(['full_time', 'part_time', 'in_school', 'looking', 'not_looking']),
  check('identifying_info').isArray(),
  check('permissions').isIn(['user']) // (["user", "admin", "superadmin"])
], usersController.create)

router.get('/:id', usersController.get)

router.put('/:id', usersController.update)

module.exports = {
  usersRouter: router
}

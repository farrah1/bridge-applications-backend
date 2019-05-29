// const express = require('express');
// const router = express.Router();

// router.get("", applicationsController.index);

// router.get("/:id", applicationsController.get);

// router.post("", [
//     check("cohort_id").exists(),
//     check("cohort_id").custom((value)=>{
//         return database('cohorts').select('id').where({ id: value })
//         .then((result)=> {
//             if(result.length === 0) {
//                 return Promise.reject('Cohort does not exist')
//             }
//         })
//     }),
//     check("user_id").exists(),
//     check("user_id").custom((value)=>{
//         return database('user').select('id').where({ id: value })
//         .then((result)=> {
//             if(result.length === 0) {
//                 return Promise.reject('User does not exist')
//             }
//         })
//     }),
//     check(["user_id", "cohort_id"]).custom((value)=>{
//         const [user_id, cohort_id] = value;
//         return database('applications').select('id').where({ user_id: user_id, cohort_id: cohort_id })
//         .then((result)=>{

//         })
//     })

// ], applicationsController.create);

// router.update("", )
// router.delete("/:id", applicationsController.delete);

// module.exports = {
//   applicationsRouter: router
// }

const express = require('express')
const { check } = require('express-validator/check')
const configuration = require('../../../knexfile')
const database = require('knex')(configuration)

const {
  list,
  create,
  get,
  update,
  remove
} = require('./applications.controllers')

const router = express.Router()

router.get('', list)
router.post(
  '',
  [
    check('cohort_id').exists(),
    check('cohort_id').custom(value => {
      return database('cohorts')
        .select('id')
        .where({ id: value })
        .then(result => {
          if (result.length) {
            return Promise.reject('This cohort does not exist')
          }
        })
    }),
    check('user_id').exists(),
    check('user_id').custom(value => {
      return database('users')
        .select('id')
        .where({ id: value })
        .then(result => {
          if (result.length) {
            return Promise.reject('This user does not exist')
          }
        })
    })
  ],
  create
)
router.get('/:id', get)
router.put(
  '/:id',
  [
    check('cohort_id').custom(value => {
      return database('cohorts')
        .select('id')
        .where({ id: value })
        .then(result => {
          if (result.length === 0) {
            return Promise.reject('This cohort does not exist')
          }
        })
    }),
    check('user_id').custom(value => {
      return database('users')
        .select('id')
        .where({ id: value })
        .then(result => {
          if (result.length === 0) {
            return Promise.reject('This user does not exist')
          }
        })
    })
  ],
  update
)
router.delete('/:id', remove)

exports.applicationsRouter = router

// const { Model } = require("objection");

// class Applications extends Model {
//   static insertApplication({
//     cohort_id,
//     user_id,
//     accepted_test,
//     accepted_cohort
//   }) {
//     return Cohort.query()
//       .insert({
//         cohort
//       })
//       .returning("*");
//   }
//   static get tableName() {
//     return "users";
//   }

//    static get relationMappings() {
//     const IdentifyingInfo = require("../identifyingInfo/identifyingInfo.model");
//     return {
//       identifying_info: {
//         relation: Model.ManyToManyRelation,
//         modelClass: IdentifyingInfo,
//         join: {
//           from: "users.id",
//           through: {
//             from: "user_identifying_info.user_id",
//             to: "user_identifying_info.identifying_info_id"
//           },
//           to: "identifying_info.id"
//         }
//       }
//     };
//   }
// }

//  module.exports = User;

const { Model } = require('objection')

class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 404
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

class Application extends Model {
  static async insertApplication ({ cohort_id, user_id }) {
    return await Application.query()
      .insert({
        cohort_id,
        user_id,
        accepted_test: false,
        accepted_cohort: false
      })
      .eager('user')
  }

  static async getApplicationById (id) {
    const application = await Application.query()
      .findById(id)
      .eager('user')
    if (application) {
      return application
    } else {
      throw new NotFoundError('Unable to find application')
    }
  }

  static async updateApplication (id, data) {
    // check if application exists before updating
    await this.getApplicationById(id)

    return await Application.query()
      .patchAndFetchById(id, data)
      .eager('user')
  }

  static async deleteApplication (id) {
    await this.getApplicationById(id)
    return await Application.query().deleteById(id)
  }

  static get tableName () {
    return 'applications'
  }

  static get relationMappings () {
    return {
      cohort: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../cohorts/cohorts.model'),
        join: {
          from: 'applications.cohort_id',
          to: 'cohorts.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../users/users.model'),
        join: {
          from: 'applications.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Application

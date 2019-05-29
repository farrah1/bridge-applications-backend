const { Model } = require('objection')

class NotFoundError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 404
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

class Cohort extends Model {
  static insertCohort ({
    name,
    cohort_type,
    start_date,
    end_date,
    welcome_text,
    thank_you_text
  }) {
    return Cohort.query()
      .insert({
        name,
        cohort_type,
        start_date,
        end_date,
        welcome_text,
        thank_you_text
      })
      .returning('*')
  }
  static async getCohortById (id) {
    const cohort = await Cohort.query().findById(id)

    if (cohort) {
      return cohort
    } else {
      throw new NotFoundError('Unable to find cohort')
    }
  }
  static get tableName () {
    return 'cohorts'
  }

  static updateCohort (id, update_params) {
    return Cohort.query()
      .findById(id)
      .patch(update_params)
      .returning('*')
  }

  static async deleteCohort (id) {
    await this.getCohortById(id)
    return await Cohort.query().deleteById(id)
  }

  static async getCohortApplications (id) {
    await this.getCohortById(id)

    return await Cohort.query().eager('applications')
  }

  static get relationMappings () {
    return {
      applications: {
        relation: Model.HasManyRelation,
        modelClass: require('../applications/applications.model'),
        join: {
          from: 'cohorts.id',
          to: 'applications.cohort_id'
        }
      }
    }
  }
}

module.exports = Cohort

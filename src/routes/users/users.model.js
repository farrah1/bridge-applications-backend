const { Model } = require('objection')

class User extends Model {
  static insertUser ({
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns,
    permissions
  }) {
    return User.query()
      .insert({
        first_name,
        last_name,
        email,
        employment_status,
        employer,
        pronouns,
        permissions
      })
      .returning('*')
  }
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    const IdentifyingInfo = require('../identifyingInfo/identifyingInfo.model')
    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: 'users.id',
          through: {
            from: 'user_identifying_info.user_id',
            to: 'user_identifying_info.identifying_info_id'
          },
          to: 'identifying_info.id'
        }
      },
      applications: {
        relation: Model.HasManyRelation,
        modelClass: require('../applications/applications.model'),
        join: {
          from: 'users.id',
          to: 'applications.cohort_id'
        }
      }
    }
  }
}

module.exports = User

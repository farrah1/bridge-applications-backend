const { Model } = require('objection')

class IdentifyingInfo extends Model {
  static get tableName () {
    return 'identifying_info'
  }

  static getInfoWithNames (names) {
    return IdentifyingInfo.query().whereIn('name', names)
  }
}

module.exports = IdentifyingInfo

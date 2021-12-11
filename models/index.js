const contacts = require('./Contact')
const user = require('./User')

module.exports = { ...contacts, ...user }

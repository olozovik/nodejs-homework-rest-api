const operations = require('../../model/contacts')

const listContacts = async (req, res, next) => {
  const contacts = await operations.listContacts()
  res.json(contacts)
}

module.exports = listContacts

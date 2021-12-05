const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json(contacts)
}

module.exports = listContacts

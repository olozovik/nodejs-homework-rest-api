const operations = require('../../model/contacts')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await operations.listContacts()
    res.json(contacts)
  } catch (err) {
    next(err)
  }
}

module.exports = listContacts

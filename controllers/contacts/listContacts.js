const {
  contacts: { Contact },
} = require('../../models')

const listContacts = async (req, res, next) => {
  console.log('LIST CONTACTS')
  const contacts = await Contact.find({})
  res.json(contacts)
}

module.exports = listContacts

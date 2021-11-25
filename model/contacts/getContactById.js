const listContacts = require('./listContacts')

const getContactById = async contactId => {
  try {
    const contacts = await listContacts()
    return contacts.find(item => String(item.id) === contactId)
  } catch (err) {
    throw err
  }
}

module.exports = getContactById

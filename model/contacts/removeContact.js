const listContacts = require('./listContacts')
const rewriteContacts = require('./rewriteContacts')

const removeContact = async contactId => {
  try {
    const contacts = await listContacts()
    const isContactExists = contacts.some(item => String(item.id) === contactId)
    const newContacts = contacts.filter(item => String(item.id) !== contactId)
    await rewriteContacts(newContacts)
    return isContactExists
  } catch (err) {
    throw err
  }
}

module.exports = removeContact

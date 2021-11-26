const listContacts = require('./listContacts')
const rewriteContacts = require('./rewriteContacts')

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactToChange = contacts.find(item => String(item.id) === contactId)

    if (!contactToChange) {
      return
    }

    const updatedContact = {
      id: contactToChange.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    }

    const newContacts = contacts.map(item => {
      if (String(item.id) === contactId) {
        return updatedContact
      }
      return item
    })
    await rewriteContacts(newContacts)
    return updatedContact
  } catch (err) {
    throw err
  }
}

module.exports = updateContact

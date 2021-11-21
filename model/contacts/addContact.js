const path = require('path')
const fs = require('fs/promises')
const listContacts = require('./listContacts')

const contactsPath = path.resolve(__dirname, 'contacts.json')

const addContact = async body => {
  try {
    const contacts = await listContacts()
    const id = Date.now()
    const newContact = { id, ...body }

    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return newContact
  } catch (err) {
    throw err
  }
}

module.exports = addContact

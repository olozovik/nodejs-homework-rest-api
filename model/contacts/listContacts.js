const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath))
  } catch (err) {
    throw err
  }
}

module.exports = listContacts

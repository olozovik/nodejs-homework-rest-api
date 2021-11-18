const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, 'contacts.json')

const getContacts = async () => {
  try {
    return JSON.parse(await fs.readFile(contactsPath))
  } catch (e) {
    console.log(e.message)
  }
}

const writeContacts = async newContacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  } catch (e) {
    console.log(e.message())
  }
}

module.exports = { getContacts, writeContacts }

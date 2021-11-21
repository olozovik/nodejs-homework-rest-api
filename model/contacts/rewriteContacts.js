const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, 'contacts.json')

const rewriteContacts = async newContacts => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  } catch (e) {
    console.log(e.message())
  }
}

module.exports = rewriteContacts

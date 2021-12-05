const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
  const body = req.body
  const newContact =
    body.favorite === undefined ? { ...body, favorite: false } : body
  const contact = await Contact.create(newContact)
  res.status(201).json(contact)
}

module.exports = addContact

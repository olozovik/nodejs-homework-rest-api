const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
  const body = req.body
  const { _id: userId } = req.user
  const newContact =
    body.favorite === undefined
      ? { ...body, owner: userId, favorite: false }
      : body
  const contact = await Contact.create(newContact)
  res.status(201).json(contact)
}

module.exports = addContact

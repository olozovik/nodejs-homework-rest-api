const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
  const { name, phone } = req.body
  const { _id: userId } = req.user

  const newContact = { owner: userId, name, phone }
  const contact = await Contact.create(newContact)

  res.status(201).json({
    status: 'success',
    code: 201,
    contact,
  })
}

module.exports = addContact

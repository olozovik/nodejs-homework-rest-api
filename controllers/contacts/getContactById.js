const { Contact } = require('../../models')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId).exec()

  if (!contact) {
    const error = new Error('Not found')
    error.status = 404
    return next(error)
  }

  res.json(contact)
}

module.exports = getContactById

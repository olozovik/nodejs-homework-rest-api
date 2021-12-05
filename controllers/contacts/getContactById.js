const mongoose = require('mongoose')
const { Contact } = require('../../models')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params

  const isValidId = mongoose.Types.ObjectId.isValid(contactId)
  if (!isValidId) {
    const error = new Error('Id is not valid')
    error.status = 400
    next(error)
  }

  const contact = await Contact.findById(contactId).exec()
  if (!contact) {
    const error = new Error('Not found')
    error.status = 404
    return next(error)
  }

  res.json(contact)
}

module.exports = getContactById

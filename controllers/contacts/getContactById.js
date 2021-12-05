const mongoose = require('mongoose')
const { Contact } = require('../../models')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: userId } = req.user

  const contact = await Contact.find({
    _id: contactId,
    owner: userId,
  }).populate('owner', 'id email')

  if (contact.length === 0) {
    const error = new Error('Not found')
    error.status = 404
    return next(error)
  }

  res.json(contact)
}

module.exports = getContactById

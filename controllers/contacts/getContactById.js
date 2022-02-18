const { Contact } = require('../../models')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: userId } = req.user

  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate('owner', 'id email')

  if (!contact) {
    const error = new Error('The contact is not found')
    error.status = 404
    return next(error)
  }

  res.json({
    status: 'success',
    code: 200,
    contact,
  })
}

module.exports = getContactById

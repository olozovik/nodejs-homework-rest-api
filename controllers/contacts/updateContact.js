const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: userId } = req.user
  const body = req.body

  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    body,
    {
      new: true,
    },
  ).populate('owner', 'id email')

  if (!contact) {
    const err = new Error('Not found')
    err.status = 404
    return next(err)
  }

  res.json(contact)
}

module.exports = updateContact

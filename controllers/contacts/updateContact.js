const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const body = req.body

  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  })

  if (!contact) {
    const err = new Error('Not found')
    err.status = 404
    return next(err)
  }

  res.json(contact)
}

module.exports = updateContact

const { Contact } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id: userId } = req.user

  const contact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })

  if (!contact) {
    const err = new Error('Not found')
    err.status = 404
    return next(err)
  }

  res.json({ message: 'contact deleted' })
}

module.exports = removeContact

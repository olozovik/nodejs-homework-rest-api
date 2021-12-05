const { Contact } = require('../../models')

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body

  if (!favorite) {
    const err = new Error('missing field favorite')
    err.status = 400
    return next(err)
  }

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    },
  )

  if (!contact) {
    const err = new Error('Not found')
    err.status = 404
    return next(err)
  }

  res.json(contact)
}

module.exports = updateFavorite

const { Contact } = require('../../models')

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const { _id: userId } = req.user

  if (favorite === undefined) {
    const err = new Error('missing field favorite')
    err.status = 400
    return next(err)
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    {
      new: true,
    },
  ).populate('owner', 'id email')

  if (!contact) {
    const err = new Error('Not found')
    err.status = 404
    return next(err)
  }

  res.json({
    status: 'success',
    code: 200,
    contact,
  })
}

module.exports = updateFavorite

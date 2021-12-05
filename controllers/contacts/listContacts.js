const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  const { _id: userId } = req.user
  const { page = 1, limit = 10, favorite } = req.query

  const skip = (page - 1) * limit

  let filter = { owner: userId }
  if (favorite) {
    filter = { owner: userId, favorite }
  }

  const contacts = await Contact.find(filter, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'id email')

  res.json(contacts)
}

module.exports = listContacts

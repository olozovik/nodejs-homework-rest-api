const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  const { _id: userId } = req.user
  const contacts = await Contact.find({ owner: userId }).populate(
    'owner',
    'id email',
  )
  res.json(contacts)
}

module.exports = listContacts

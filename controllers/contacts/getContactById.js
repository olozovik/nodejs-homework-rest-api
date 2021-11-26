const operations = require('../../model_/contacts')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await operations.getContactById(contactId)

    if (!contact) {
      const error = new Error('Not found')
      error.status = 404
      return next(error)
    }

    res.json(contact)
  } catch (err) {
    next(err)
  }
}

module.exports = getContactById

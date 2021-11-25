const operations = require('../../model/contacts')

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const isContactExists = await operations.removeContact(contactId)

    if (!isContactExists) {
      const err = new Error('Not found')
      err.status = 404
      return next(err)
    }

    res.json({ message: 'contact deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = removeContact

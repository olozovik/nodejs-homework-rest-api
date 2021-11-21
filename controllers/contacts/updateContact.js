const { contactValidation } = require('../../validations/contacts')
const operations = require('../../model/contacts')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const body = req.body

    const { error } = await contactValidation(body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      return next(err)
    }

    const updatedContact = await operations.updateContact(contactId, body)

    if (!updatedContact) {
      const err = new Error('Not found')
      err.status = 404
      return next(err)
    }

    res.json(updatedContact)
  } catch (err) {
    next(err)
  }
}

module.exports = updateContact

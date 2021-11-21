const { contactValidation } = require('../../validations/contacts')

const operations = require('../../model/contacts')

const addContact = async (req, res, next) => {
  try {
    const body = req.body
    const { error } = contactValidation(body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      return next(err)
    }

    const newContact = await operations.addContact(body)
    res.status(201).json(newContact)
  } catch (err) {
    next(err)
  }
}

module.exports = addContact

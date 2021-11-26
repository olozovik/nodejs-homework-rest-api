const operations = require('../../model_/contacts')

const addContact = async (req, res, next) => {
  try {
    const body = req.body

    const newContact = await operations.addContact(body)
    res.status(201).json(newContact)
  } catch (err) {
    next(err)
  }
}

module.exports = addContact

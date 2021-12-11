const mongoose = require('mongoose')

const validContactId = async (req, res, next) => {
  const { contactId } = req.params

  const isValidId = await mongoose.Types.ObjectId.isValid(contactId)

  if (!isValidId) {
    const error = new Error('Not found. Id is not valid')
    error.status = 404
    next(error)
    return
  }

  next()
}

module.exports = validContactId

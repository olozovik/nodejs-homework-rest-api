const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authError = (code, message) => {
  const error = new Error(message)
  if (code) {
    error.status = code
  }
  return error
}

const authorization = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        next(authError(401, 'No token'))
        return
      }

      const [type, token] = authorization.split(' ')

      const { id } = await jwt.verify(token, process.env.SECRET)
      if (!id) {
        next(authError(401, 'Not authorized'))
        return
      }

      const user = await User.findOne({ _id: id })
      if (!user) {
        next(authError(401, 'Not authorized'))
        return
      }

      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authorization()

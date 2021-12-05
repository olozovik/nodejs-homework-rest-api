const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authError = () => {
  const error = new Error('Not authorized')
  error.status = 401
  return error
}

const authorization = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        next(authError())
        return
      }

      const [type, token] = authorization.split(' ')

      const { id } = await jwt.verify(token, process.env.SECRET)
      if (!id) {
        next(authError())
        return
      }

      const user = await User.findOne({ _id: id })
      if (!user) {
        next(authError())
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

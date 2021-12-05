const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authError = (message = 'Not authorized') => {
  const error = new Error(message)
  error.status = 401
  return error
}

const authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      next(authError())
      return
    }

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') {
      next(authError())
      return
    }

    const { id } = await jwt.verify(token, process.env.SECRET)
    if (!id) {
      next(authError())
      return
    }

    const user = await User.findOne({ _id: id })
    if (!user || token !== user.token) {
      next(authError())
      return
    }

    req.user = user
    next()
  } catch (error) {
    next(authError(error.message))
  }
}

module.exports = authorization

const { User } = require('../../models')
const bcrypt = require('bcrypt')

const signup = async (req, res, next) => {
  const { email, password } = req.body

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    const error = new Error('Email in use')
    error.status = 409
    throw error
  }

  const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))
  const user = await User.create({
    email,
    password: hashPassword,
  })

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

module.exports = signup

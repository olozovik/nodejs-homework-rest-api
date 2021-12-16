const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { User } = require('../../models')

const signup = async (req, res, next) => {
  const { email, password } = req.body

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    const error = new Error('Email in use')
    error.status = 409
    throw error
  }

  const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))

  const gravatarUrl = gravatar.url(email)

  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatarUrl,
  })

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  })
}

module.exports = signup

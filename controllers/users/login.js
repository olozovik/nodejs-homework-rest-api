const { User } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res, nex) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  let isPasswordValid = false
  if (user) {
    isPasswordValid = await bcrypt.compare(password, user.password)
  }

  if (!user || !isPasswordValid) {
    const error = new Error('Email or password is wrong')
    error.status = 401
    throw error
  }

  const { SECRET } = process.env
  const token = await jwt.sign({ id: user._id }, SECRET)
  await User.findByIdAndUpdate(user._id, { token })

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

module.exports = login

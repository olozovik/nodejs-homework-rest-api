const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const { User } = require('../../models')
const { sendEmail } = require('../../utils')

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

  const verifyToken = nanoid()

  const verifyUrl = `${process.env.BASE_URL}api/users/verify/${verifyToken}`

  await sendEmail({
    email,
    subject: 'Verification email',
    html: `<p>To verify your email please pass the <a href=${verifyUrl} target="_blank">LINK</a></p>`,
  })

  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatarUrl,
    verifyToken,
  })

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
      verifyToken: user.verifyToken,
      verify: user.verify,
    },
  })
}

module.exports = signup

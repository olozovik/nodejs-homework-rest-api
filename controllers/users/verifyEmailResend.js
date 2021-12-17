const { nanoid } = require('nanoid')
const { User } = require('../../models')
const { sendEmail } = require('../../utils')

const verifyEmailResend = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'missing required field email' })
    return
  }

  const user = await User.findOne({ email })

  if (user.verify) {
    res.status(400).json({ message: 'Verification has already been passed' })
    return
  }

  const verifyToken = user ? user.verifyToken : nanoid()

  const verifyUrl = `${process.env.BASE_URL}api/users/verify/${verifyToken}`

  await sendEmail({
    email,
    subject: 'Verification email',
    html: `<p>To verify your email please pass the <a href=${verifyUrl} target="_blank">LINK</a></p>`,
  })

  res.json({ message: 'Verification email sent' })
}

module.exports = verifyEmailResend

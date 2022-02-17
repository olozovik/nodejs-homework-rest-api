const { User } = require('../../models')

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params

  const user = await User.findOne({ verifyToken: verificationToken })

  if (!user) {
    const error = new Error('User not found')
    error.status = 404
    throw error
  }

  await User.findOneAndUpdate(
    { verifyToken: verificationToken },
    { verify: true, verifyToken: null },
  )

  res.json({ message: 'Verification successful' })
  // redirect to front login ?
}

module.exports = verifyEmail

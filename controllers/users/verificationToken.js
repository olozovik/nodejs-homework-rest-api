const { User } = require('../../models')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params

  const user = await User.findOneAndUpdate(
    { verifyToken: verificationToken },
    { verify: true },
  )

  if (!user) {
    const error = new Error('User not found')
    error.status = 404
    throw error
  }

  res.json({ message: 'Verification successful' })
}

module.exports = verify

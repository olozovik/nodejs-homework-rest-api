const { User } = require('../../models')

const logout = async (req, res, next) => {
  const { _id } = req.user
  await User.findOneAndUpdate({ _id }, { token: null })
  res.status(204).json({ message: 'No Content' })
}

module.exports = logout

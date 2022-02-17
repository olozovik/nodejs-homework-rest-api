const { User } = require('../../models')

const logout = async (req, res, next) => {
  const { _id } = req.user
  await User.findOneAndUpdate({ _id }, { token: null })
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Succeeded logout',
  })
}

module.exports = logout

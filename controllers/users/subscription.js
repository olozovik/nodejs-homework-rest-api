const { User } = require('../../models')

const subscription = async (req, res, next) => {
  const { _id: userId } = req.user

  const { subscription } = req.body
  const subscriptionValues = ['starter', 'pro', 'business']
  const isValueCorrect = subscriptionValues.some(item => item === subscription)
  if (!isValueCorrect) {
    const error = new Error('There is no such a type of subscription')
    error.status = 400
    throw error
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { subscription },
    { new: true, runValidators: true },
  )

  res.json({
    status: 'success',
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  })
}

module.exports = subscription

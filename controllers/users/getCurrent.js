const getCurrent = (req, res, next) => {
  const { email, subscription, avatarURL } = req.user
  res.json({
    status: 'success',
    code: 200,
    user: { email, subscription, avatarURL },
  })
}

module.exports = getCurrent

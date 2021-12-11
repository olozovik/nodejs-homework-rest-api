const getCurrent = (req, res, next) => {
  const { email, subscription, avatarURL } = req.user
  res.json({ email, subscription, avatarURL })
}

module.exports = getCurrent

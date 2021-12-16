const express = require('express')
const router = express.Router()

const {
  getCurrent,
  subscription,
  avatar,
  verify,
} = require('../../controllers')

const {
  ctrlWrapper,
  authorization,
  uploadAvatar,
} = require('../../middlewares')

router.get('/current', authorization, ctrlWrapper(getCurrent))
router.patch('/subscription', authorization, ctrlWrapper(subscription))
router.patch(
  '/avatars',
  authorization,
  uploadAvatar.single('avatar'),
  ctrlWrapper(avatar),
)
router.get('/verify/:verificationToken', ctrlWrapper(verify))

module.exports = router

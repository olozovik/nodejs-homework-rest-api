const express = require('express')
const router = express.Router()

const {
  getCurrent,
  subscription,
  avatar,
  verifyEmail,
  verifyEmailResend,
} = require('../../controllers')

const { joinVerifyEmail } = require('../../models')

const {
  ctrlWrapper,
  authorization,
  uploadAvatar,
  validation,
} = require('../../middlewares')

router.get('/current', authorization, ctrlWrapper(getCurrent))
router.patch('/subscription', authorization, ctrlWrapper(subscription))
router.patch(
  '/avatar',
  authorization,
  uploadAvatar.single('avatar'),
  ctrlWrapper(avatar),
)
router.get('/verify/:verificationToken', ctrlWrapper(verifyEmail))
router.get(
  '/verify',
  validation(joinVerifyEmail),
  ctrlWrapper(verifyEmailResend),
)

module.exports = router

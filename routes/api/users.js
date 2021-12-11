const express = require('express')
const router = express.Router()

const { getCurrent, subscription } = require('../../controllers')

const { ctrlWrapper, authorization } = require('../../middlewares')

router.get('/current', authorization, ctrlWrapper(getCurrent))
router.patch('/subscription', authorization, ctrlWrapper(subscription))

module.exports = router

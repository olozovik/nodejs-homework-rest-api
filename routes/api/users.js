const express = require('express')
const router = express.Router()

const { signup, login } = require('../../controllers')

const { joiRegisterSchema } = require('../../models')
const { validation, ctrlWrapper } = require('../../middlewares')

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(signup))
router.post('/login', validation(joiRegisterSchema), ctrlWrapper(login))

module.exports = router

const express = require('express')
const router = express.Router()

const { signup, login, logout } = require('../../controllers')

const { joiRegisterSchema } = require('../../models')
const { validation, ctrlWrapper, authorization } = require('../../middlewares')

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(signup))
router.post('/login', validation(joiRegisterSchema), ctrlWrapper(login))
router.post('/logout', authorization, ctrlWrapper(logout))

module.exports = router

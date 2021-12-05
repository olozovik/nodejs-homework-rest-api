const { Schema, model } = require('mongoose')
const Joi = require('joi')
const regExp = require('./regExp')

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
})

const User = model('user', userSchema)

const joiRegisterSchema = Joi.object({
  email: Joi.string().min(5).max(50).required().pattern(regExp.email),
  password: Joi.string().min(7).max(20).required().pattern(regExp.phone),
})

module.exports = {
  User,
  joiRegisterSchema,
}

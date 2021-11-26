const { Schema, model } = require('mongoose')
const Joi = require('joi')

const regEx = {
  email: new RegExp('^[^@s]+@[^@s]+.[^@s]+$'),
  phone: new RegExp(
    '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
  ),
}

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: regEx.email,
      min: 5,
      max: 50,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: regEx.phone,
      min: 7,
      max: 20,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

const joiContactsSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(5).max(50).required().pattern(regEx.email),
  phone: Joi.string().min(7).max(20).required().pattern(regEx.phone),
  favorite: Joi.bool(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactsSchema,
}

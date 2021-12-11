const { Schema, SchemaTypes, model } = require('mongoose')
const Joi = require('joi')
const regExp = require('./regExp')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      match: regExp.name,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: regExp.email,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: regExp.phone,
      minlength: 7,
      maxlength: 20,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

const joiContactsSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().pattern(regExp.name),
  email: Joi.string().min(5).max(50).required().pattern(regExp.email),
  phone: Joi.string().min(7).max(20).required().pattern(regExp.phone),
  favorite: Joi.bool(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactsSchema,
}

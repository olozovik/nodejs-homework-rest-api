const { Schema, model } = require('mongoose')
const Joi = require('joi')

const regExp = {
  name: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
  email: /^(.+)@(.+)\.(.+)$/,
  phone:
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
}

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
  },
  { versionKey: false, timestamps: true },
)

const joiContactsSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().pattern(regExp.name),
  email: Joi.string().min(5).max(50).required().pattern(regExp.email),
  phone: Joi.string().min(7).max(20).required().pattern(regExp.phone),
  favorite: Joi.bool(),
})

const joiContactsFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactsSchema,
  joiContactsFavoriteSchema,
}

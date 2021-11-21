const Joi = require('joi')

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .min(5)
    .max(50)
    .required()
    .regex(RegExp('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')),
  phone: Joi.string()
    .min(7)
    .max(20)
    .required()
    .pattern(
      new RegExp(
        '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
      ),
    ),
})

module.exports = contactsSchema

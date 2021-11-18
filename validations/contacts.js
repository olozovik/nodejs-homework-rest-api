const Joi = require('joi')

const contactAddValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(5).max(30).required().email(),
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

  return schema.validate(data)
}

const contactUpdateValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(5).max(30).email(),
    phone: Joi.string()
      .min(7)
      .max(20)
      .pattern(
        new RegExp(
          '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
        ),
      ),
  })

  return schema.validate(data)
}

module.exports = { contactAddValidation, contactUpdateValidation }

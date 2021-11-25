const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      next(err)
    }
    next()
  }
}

module.exports = validation

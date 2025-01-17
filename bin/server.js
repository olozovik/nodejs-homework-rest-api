const app = require('../app')
const mongoose = require('mongoose')

const { DB_HOST, PORT = 8081 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    }),
  )
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })

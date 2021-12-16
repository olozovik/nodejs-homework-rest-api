const multer = require('multer')
const path = require('path')

const tempPath = path.join(__dirname, '../', 'temp')

const multerConfigure = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const uploadAvatar = multer({
  storage: multerConfigure,
})

module.exports = uploadAvatar

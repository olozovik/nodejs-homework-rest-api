const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const { User } = require('../../models')
const { resize } = require('jimp')

const avatar = async (req, res, next) => {
  const { path: tempPath, originalname } = req.file
  const name = Date.now() + '_' + originalname
  const avatarsPath = path.join(__dirname, '../../', 'public', 'avatars', name)

  try {
    await fs.rename(tempPath, avatarsPath)
    const relativeAvatarPath = path.join('public', 'avatars', name)
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatarURL: relativeAvatarPath },
      { new: true, runValidators: true },
    )
    const avatar = await Jimp.read(avatarsPath)
    avatar.resize(250, 250).write(avatarsPath)
    res.json({
      status: 'success',
      code: 200,
      ResponseBody: {
        avatarURL: user.avatarURL,
      },
    })
  } catch (e) {
    await fs.unlink(tempPath)
    next(e)
  }
}

module.exports = avatar

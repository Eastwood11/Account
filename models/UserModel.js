const mongoose = require('mongoose')
let UserModelSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
let UserModel = mongoose.model('users', UserModelSchema)

module.exports = UserModel

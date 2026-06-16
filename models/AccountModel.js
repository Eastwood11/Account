const mongoose = require('mongoose')
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: Date,
  type: {
    type: Number,
    default: -1,
  },
  money: {
    type: mongoose.Decimal128,
    required: true,
  },
  remark: String,
})
let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel

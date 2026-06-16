function connectDB(
  success,
  error = (err) => {
    console.log(err)
  }
) {
  // 安装mongoose模块
  // npm install mongoose
  const mongoose = require('mongoose')
  const { DB_HOST, DB_PORT, DB_NAME } = require('../config/config')
  mongoose.set('strictQuery', true)
  // 连接数据库
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  // 连接成功
  mongoose.connection.on('open', () => {
    success()
  })
  // 连接失败
  mongoose.connection.once('error', (err) => {
    error(err)
  })
  // 连接断开
  mongoose.connection.on('close', () => {
    console.log('数据库连接断开')
  })

  // 关闭数据库连接
  setTimeout(() => {
    // mongoose.disconnect()
  }, 2000)
}
module.exports = connectDB

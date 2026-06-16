const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')
const checkTokenMiddleware = function (req, res, next) {
  const token = req.get('Authorization')
  if (!token) {
    res.json({ code: 2004, msg: 'token不存在', data: null })
    return
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.json({ code: 401, msg: 'token验证失败', data: null })
      return
    }
    req.user = decoded
    next()
  })
}

module.exports = checkTokenMiddleware

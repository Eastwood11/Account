const express = require('express')
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const router = express.Router()
const { SECRET } = require('../../config/config')
// 登录提交
router.post('/login', async function (req, res, next) {
  console.log(req.body)
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      password: md5(req.body.password),
    })
    if (user) {
      let token = jwt.sign({ username: user.username, _id: user._id }, SECRET, {
        expiresIn: '1h',
      })
      res.json({ code: 0, msg: '登录成功', data: { token } })
    } else {
      res.json({ code: 2002, msg: '用户名或密码错误', data: null })
    }
  } catch (err) {
    res.json({ code: 2001, msg: '登录失败,服务器错误', data: null })
  }
})

router.post('/logout', function (req, res, next) {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router

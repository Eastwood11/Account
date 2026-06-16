const express = require('express')
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

const router = express.Router()
// 注册页面
router.get('/reg', function (req, res, next) {
  res.render('reg')
})

// 注册提交
router.post('/reg', async function (req, res, next) {
  console.log(req.body)
  try {
    const user = await UserModel.create({
      ...req.body,
      password: md5(req.body.password),
    })
    res.render('success', { msg: '注册成功', url: '/login' })
  } catch (err) {
    res.status(500).send(err)
  }
})

// 登录页面
router.get('/login', function (req, res, next) {
  res.render('login')
})

// 登录提交
router.post('/login', async function (req, res, next) {
  console.log(req.body)
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      password: md5(req.body.password),
    })
    if (user) {
      console.log(user)
      req.session.userName = user.username
      res.render('success', { msg: '登录成功', url: '/account' })
    } else {
      res.render('error', { msg: '登录失败,用户名或密码错误', url: '/login' })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/logout', function (req, res, next) {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = router

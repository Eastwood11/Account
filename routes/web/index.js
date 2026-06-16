const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const AccountModel = require('../../models/AccountModel')
const checkLogin = require('../../middlewares/checkLoginMiddlewares')

router.get('/', function (req, res, next) {
  res.redirect('/account')
})

router.get('/account', checkLogin, function (req, res, next) {
  AccountModel.find()
    .then((accounts) => {
      res.render('list', { accounts })
    })
    .catch((err) => {
      res.send({ code: 500, msg: '获取记录失败' })
    })
})

/* 添加记录 */
router.get('/account/create', checkLogin, function (req, res, next) {
  res.render('create')
})

/* 新增记录 */
router.post('/account', function (req, res, next) {
  console.log(req.body)
  AccountModel.create({
    ...req.body,
    type: Number(req.body.type),
    money: Number(req.body.money),
    date: dayjs(req.body.date).toDate(),
  })
    .then(() => {
      res.render('success', { msg: '新增记录成功', url: '/account' })
    })
    .catch((err) => {
      res.send({ code: 500, msg: '新增记录失败' })
    })
})

router.get('/account/delete/:id', function (req, res, next) {
  AccountModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.render('success', { msg: '删除记录成功', url: '/account' })
    })
    .catch((err) => {
      res.send({ code: 500, msg: '删除记录失败' })
    })
})

module.exports = router

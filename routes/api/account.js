const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const AccountModel = require('../../models/AccountModel')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

/* 记账本列表 */
router.get('/account', checkTokenMiddleware, function (req, res, next) {
  console.log(req.user)
  // 验证通过，获取记录
  AccountModel.find()
    .then((accounts) => {
      res.json({
        code: '0000',
        msg: '获取记录成功',
        data: accounts,
      })
    })
    .catch((err) => {
      res.json({
        code: '1001',
        msg: '获取记录失败',
        data: null,
      })
    })
})

/* 新增记录 */
router.post('/account', checkTokenMiddleware, function (req, res, next) {
  console.log(req.body)
  AccountModel.create({
    ...req.body,
    type: Number(req.body.type),
    money: Number(req.body.money),
    date: dayjs(req.body.date).toDate(),
  })
    .then((account) => {
      res.json({
        code: '0000',
        msg: '新增记录成功',
        data: account,
      })
    })
    .catch((err) => {
      res.json({
        code: '1002',
        msg: '新增记录失败',
        data: null,
      })
    })
})

router.delete('/account/delete/:id', checkTokenMiddleware, function (req, res, next) {
  AccountModel.deleteOne({ _id: req.params.id })
    .then((account) => {
      res.json({
        code: '0000',
        msg: '删除记录成功',
        data: account,
      })
    })
    .catch((err) => {
      res.json({
        code: '1003',
        msg: '删除记录失败',
        data: null,
      })
    })
})

router.get('/account/:id', checkTokenMiddleware, function (req, res, next) {
  AccountModel.findById(req.params.id)
    .then((account) => {
      res.json({
        code: '0000',
        msg: '获取记录成功',
        data: account,
      })
    })
    .catch((err) => {
      res.json({
        code: '1004',
        msg: '获取记录失败',
        data: null,
      })
    })
})

// 更新记录
router.patch('/account/:id', checkTokenMiddleware, function (req, res, next) {
  AccountModel.updateOne({ _id: req.params.id }, req.body)
    .then((account) => {
      AccountModel.findById(req.params.id)
        .then((account) => {
          res.json({
            code: '0000',
            msg: '更新记录成功',
            data: account,
          })
        })
        .catch((err) => {
          res.json({
            code: '1001',
            msg: '获取记录失败',
            data: null,
          })
        })
    })
    .catch((err) => {
      res.json({
        code: '1005',
        msg: '更新记录失败',
        data: null,
      })
    })
})

module.exports = router

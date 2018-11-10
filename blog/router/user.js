const express = require('express')
const router = express.Router()
const ctrl = require('../controller/user.js')


router.get('/register',ctrl.showRegisterPage)
// 请求登录页面
router.get('/login',ctrl.showLoginPage)
// 注册新用户
router.post('/register',ctrl.reg)
// 监听登录的请求
router.post('/login',ctrl.login)
// 监听 注销请求
router.get('/logout',ctrl.logout)

module.exports = router
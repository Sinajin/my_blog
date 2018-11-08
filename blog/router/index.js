const express = require('express')
const router = express.Router()

const ctrl = require('../controller/index.js')

// 用户请求的项目首页
router.get('/',ctrl.showIndexPage)
module.exports = router
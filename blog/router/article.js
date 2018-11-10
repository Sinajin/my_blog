const express = require('express')
const router = express.Router()

const ctrl = require('../controller/article.js')
// 监听客户端的get请求地址,显示文章添加页面
router.get('/article/add',ctrl.showAddArticlePage)

// 监听客户端发表文章的请求
router.post('/article/add',ctrl.addArticle)
module.exports = router
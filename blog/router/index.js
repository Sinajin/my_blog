const express = require('express')
const router = express.Router()

// 用户请求的项目首页
router.get('/',(req,res)=>{
    res.render('index.ejs',{name:'zs',age:22})
})
module.exports = router
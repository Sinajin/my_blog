const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

// 导入session中间件
const session = require('express-session')
app.use(
    session({
      secret: '这是加密的密钥',
      resave: false,
      saveUninitialized: false
    })
  )



// 设置默认采用的模板引擎
app.set('view engine','ejs')
// 设置模板页面存放路径
app.set('views','./views')
// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules', express.static('./node_modules'))
// 导入router/index.js路由模块
// const router1 = require('./router/index.js')
// app.use(router1)
// app.get('/',(req,res)=>{
//     res.render('index.ejs',{name:'lula',age:22})
// })
// 请求注册页面
// 导入用户相关的模块
// const router2 = require('./router/user.js')
// app.use(router2)

fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    if(err) return console.log('读取router目录中的路由失败')
    filenames.forEach(fname=>{
        // console.log(path.join(__dirname,'./router',fname))
        const router = require(path.join(__dirname,'./router',fname))
        app.use(router)
    })
})
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})
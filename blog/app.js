const express = require('express')

const app = express()
const bodyParser = require('body-parser')





// 设置默认采用的模板引擎
app.set('view engine','ejs')
// 设置模板页面存放路径
app.set('views','./views')
// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules', express.static('./node_modules'))
// 导入router/index.js路由模块
const router1 = require('./router/index.js')
app.use(router1)
// app.get('/',(req,res)=>{
//     res.render('index.ejs',{name:'lula',age:22})
// })
// 请求注册页面
// 导入用户相关的模块
const router2 = require('./router/user.js')
app.use(router2)

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})
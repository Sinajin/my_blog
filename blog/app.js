const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host:'127.0.0.1',
    database:'boke',
    user:'root',
    password:'root'
})

// 设置默认采用的模板引擎
app.set('view engine','ejs')
// 设置模板页面存放路径
app.set('views','./views')
// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/node_modules', express.static('./node_modules'))
app.get('/',(req,res)=>{
    res.render('index.ejs',{name:'lula',age:22})
})
// 请求注册页面
app.get('/register',(req,res)=>{
    res.render('./user/register.ejs',{})
})
// 请求登录页面
app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})
// 注册新用户
app.post('/register',(req,res)=>{
    const body = req.body
    // console.log(body)
    // 判断表单数据填写是否完整
    if(body.username.trim().length<=0||body.password.trim().length<=0 || body.nickname.trim().length<=0){
        return res.send({msg:"请认真填写表单数据哦,亲!",status:501})
    }
    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_users where username=?'
    conn.query(sql1,body.username,(err,result)=>{
        // 如果查询失败,告知客户端失败
        if(err) return res.send({msg:'用户名查询失败!',status:502})
        // console.log(result)
        if(result[0].count!==0)return res.send({msg:'用户名已存在',status:503}) 
        // 执行注册业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into blog_users set ?'
        conn.query(sql2,body,(err,result)=>{
            if(err) return res.send({msg:'注册新用户失败',status:504})
            // console.log(result)
            if(result.affectedRows !==1) return res.send({msg:'注册新用户失败',status:505})
            res.send({msg:'注册成功',status:200})
        })
    })
   
})
// 监听登录的请求
app.post('/login',(req,res)=>{
    res.send({msg:'ok',status:200})
    const body = req.body
    // console.log(body)
    // 执行sql语句,查询用户名是否存在
    const sql1 = 'select *from blog_users where username=? and password=?'
    conn.query(sql1,[body.username,body.password],(err,result)=>{
        if(err) return res.send({msg:'用户登录失败',status:501})
        console.log(result)
       if(result.length !==1) return res.send({msg:'用户登录失败',status:502})
       res.send({msg:'ok',status:200})
    })

})
app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})
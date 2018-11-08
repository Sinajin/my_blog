const moment = require('moment')
// 导入数据库操作模块
const conn = require('../db/index.js')

const showRegisterPage = (req,res)=>{
    res.render('./user/register.ejs',{})
}
const showLoginPage = (req,res)=>{
    res.render('./user/login.ejs',{})
}
const reg = (req,res)=>{
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
   
}
const login = (req,res)=>{
    const body = req.body
    // 执行sql语句,查询用户是否存在
    const sql1 = 'select * from blog_users where username=? and password=?'
    conn.query(sql1,[body.username, body.password],(err,result)=>{
      if(err) return res.send({msg:'用户名登录失败',status:501})  
      if(result.length !==1)return res.send({msg:'用户登录失败',status:502})
    //   console.log(result)
    // 把登录成功之后哦的用户信息,挂在到session 上
    req.session.user = result[0]
    // 把用户登录成功之后的结果,挂在到session上
    req.session.islogin = true
    // console.log(req.session)
     res.send({msg:'ok',status:200})
    })
  
}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login
}
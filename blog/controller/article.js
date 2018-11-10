const moment = require('moment')
const showAddArticlePage = (req,res)=>{
    if(!req.session.islogin) return res.redirect('/')
    res.render('./article/add.ejs',{
        user:req.session.user,
        islogin:req.session.islogin

    })
}
const addArticle = (req,res)=>{
    // console.log(req.body)
    // 如果在服务器端获取作者的ID,会有问题,如果文章编写了很长时间,session可能会失效
    const body = req.body
    body.authorId = req.session.user.id
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(body)
}
module.exports = {
    showAddArticlePage,
    addArticle
}
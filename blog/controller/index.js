// 展示首页面
const showIndexPage =(req,res)=>{
    res.render('index.ejs',{name:'zs',age:22})
}

module.exports = {
    showIndexPage
}
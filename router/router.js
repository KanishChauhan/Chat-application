const express=require('express')
const router=express.Router()
const user=require('../controller/control');
const { reqAuthentication, reqNotAuthentication } = require('../token/token.js')
const cookieParser = require('cookie-parser');
router.use(cookieParser());


// router.get('/',(req,res)=>{
   
//     res.render('index')
// })
// router.get('/hello',user.findQ)
router.get('/signup',reqNotAuthentication,user.signpage)
router.post('/signup',reqNotAuthentication,user.register)
router.post('/',reqNotAuthentication,user.login)

router.get('/chat',reqAuthentication,user.chat)
router.get('/index',reqNotAuthentication,user.loginG)
router.get('/',reqNotAuthentication,user.loginG)



module.exports=router

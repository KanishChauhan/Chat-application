const express=require('express')
const router=express.Router()
const user=require('../controller/control');
const { reqAuthentication, reqNotAuthentication } = require('../token/token.js')

router.get('/',(req,res)=>{
   
    res.render('index')
})
// router.get('/hello',user.findQ)
router.get('/signup',user.signpage)
router.post('/signup',user.register)
router.post('/',user.login)

router.get('/chat',user.chat)
router.get('/index',user.loginG)
router.get('/',user.loginG)



module.exports=router
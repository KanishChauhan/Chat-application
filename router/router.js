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
router.post('/',reqAuthentication,user.login)
router.get('/chat',(req,res) => {
res.render('chatpage')
})



module.exports=router
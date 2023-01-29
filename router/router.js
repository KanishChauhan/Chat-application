const express=require('express')
const router=express.Router()
const user=require('../controller/control');

router.get('/',(req,res)=>{
   
    res.render('index')
})
// router.get('/hello',user.findQ)
router.get('/signup',user.signpage)
router.post('/signup',user.sign)
router.post('/index',user.signup)
router.get('/chat',(req,res) => {
res.render('chatpage')
})


module.exports=router
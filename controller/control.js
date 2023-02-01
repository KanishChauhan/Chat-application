
require('dotenv').config()
const Joi=require('joi')
const mongoose=require('mongoose')
const router = require('express').Router();
const user = require("../models/user");
const msg = require("../models/conversation");

const bcrypt = require("bcrypt")
const { reqAuthentication, reqNotAuthentication } = require('../token/token.js')
const jwt = require('jsonwebtoken');

//COOKIE PARSER
const cookieParser = require('cookie-parser');
router.use(cookieParser());
//
module.exports.findQ=async (req,res)=>{
    // console.log('first')
    let result=await Student.find({},(err,doc)=>{
if(!err){

    console.log(doc)
    res.render('chatpage')
}else{
    console.log('error'+err)
}
    }).clone().catch(function(err){ console.log(err)})
}

module.exports.signpage = (req,res)=>{
    res.render('signup')
}





//register validation
const schema=Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required().min(4),
    cpassword:Joi.string().required().min(4)
}).options({abortEarly:false})


//REGISTER ROUTE CONTROLLER
module.exports.register=async (req,res)=>{
   
//applying register validation
const { error } = schema.validate(req.body);
if (error)
{     return res.render('signup', {error: error.details[0].message});} 

    
    const {first_name,last_name,email,password,cpassword}=req.body

// searching whether user already exists in database 
    const usernameExist = await user.findOne({ first_name: req.body.first_name,last_name:req.body.last_name});
    if (usernameExist){
        return res.render('signup', {error: 'This username already exists. Please try another.'});
    } 


    if(password==cpassword){

        //adding user in database
        try{
            
            const add1=new user({
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:password,
                cpassword:cpassword,
                token:jwt.sign({ id: req.body._id }, process.env.TOKEN_SECRET)
                
            })

            //hashing a password
            




            const registered = await add1.save((err, user) => {
                
                if (err) throw err;
                
                jwt.sign({ id: req.body._id  }, process.env.TOKEN_SECRET, (err, token) => {
                    console.log(token)
                    
                    // let oneDay = 86400000;
                    console.log('JWT is in browser cookie');
                    
                    //redirecting
                    res.render('index',{msg:"User added Successfully, Now Login"})
                });
                
            })
            
            
            
            
            //     let result=await add1.save()
        
    //     var obj=await user.findOne({email:email,password:password}).clone()
    //     // console.log(id)
        
    //     //generate a new token
    //  let token= jwt.sign({ id: obj._id }, process.env.token_secret)

    //  console.log(token)
    //         //setting token to browser cookies to save in local storage
    //         res.cookie('jwt', token, { maxAge: 86400000, httpOnly: true });
    
    //         console.log('JWT is in browser cookie');
    //         res.redirect('index')
        

                
}catch(err){
    console.log('error occured'+err)
}
}
    
    // console.log(result)
    
    


   
}

  
// adduser
const adduser=async (first_name,last_name,email,password)=>{
    // Student.create(
       
}





// validation for login
const schemaLogin=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required().min(4)
}).options({abortEarly:false})



module.exports.login = async (req,res) => {
    // console.log(req.body)

    //LOGIN INPUT VALIDATION USING JOI 
    const {error} = schemaLogin.validate(req.body);
if (error){
 res.render('index', {error: error.details[0].message});
 console.log(error)
}    
    

	
    console.log(req.body)
    const {email,password}=req.body
    // console.log(result)
    try{

        var result=await user.findOne({email:email,password:password}).clone()
        res.render('chatpage',{name:result.first_name})
    }catch(err){
        res.render('error')
        
    }       
       

    
    mongoose.disconnect()
}

// const searching=async (email,password) => {
//     let result=await Student.findOne({email:email,password:password},function(err,result){
//         if(err) {
//             res.render('')
//         }
//     }).clone()
//     return result
// }

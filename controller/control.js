
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

    
// searching whether user already exists in database 
const {first_name,last_name,email,password,cpassword}=req.body
    const usernameExist = await user.findOne({ first_name: req.body.first_name,last_name:req.body.last_name});
    if (usernameExist){
        return res.render('signup', {error: 'This username already exists. Please try another.'});
    }
    
    const emailExist = await user.findOne({email:email});
    if(emailExist){
        return res.render('signup', {error: 'This email already exists. Please try another.'});

    }


    if(password==cpassword){
        //hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const add1=new user({
                            first_name:first_name,
                            last_name:last_name,
                            email:email,
                            password:hashedPassword,
                            token:jwt.sign({ id: req.body._id }, process.env.TOKEN_SECRET)
                            
                        })

        const registered = await add1.save((err, user) => {
            if (err) throw err;
// console.log(user)
            jwt.sign({ id:user._id,first_name:first_name }, process.env.TOKEN_SECRET, (err, token) => {

                let oneDay = 86400000;

                //setting token to browser cookies to save in local storage
                res.cookie('jwt', token, { maxAge: oneDay, httpOnly: true })

                console.log('JWT is in browser cookie');

                //redirecting
                res.redirect('/chat?valid=' +user.email)
            });
        });
    }
}        




// validation for login
const schemaLogin=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required().min(4)
}).options({abortEarly:false})



//login get request
module.exports.loginG = (req,res) => {
    // res.cookie('jwt','k')
    res.render('index')
    // console.log('hi')
}




//login post request
module.exports.login = async (req,res) => { 
       
    try {
        const {email,password}=req.body;
        

        //validating
        const { error } = schemaLogin.validate(req.body);
        if (error) return res.render('index', {error: error.details[0].message});

        //finding user
        const result = await user.findOne({ email:email });
        if (!user) return res.render('index', {error: 'Credentials entered are incorrect.'});

        //user correct or not (hasing) 
        const validPassword = await bcrypt.compare(password, result.password);
        if (!validPassword) return res.render('index', {error: 'Credentials entered are incorrect.'});

        // if validPassword return true then send 
        if (validPassword) {

            // create and assign json web token
            result.token;
            await user.save((err, user) => {
                if (err) throw err;

                jwt.sign({ id: result._id,email:email }, process.env.TOKEN_SECRET, (err, token) => {

                    let oneDay = 86400000;

                    //setting token to browser cookies to save in local storage
                    res.cookie('jwt', token, { maxAge: oneDay, httpOnly: true }) //1s = 1000

                    console.log('JWT is in browser cookie');

                    //redirecting
                    res.redirect('/chat?valid=' + result.first_name)
                });

            });
            // res.send({token: token});   
        }

    } catch (error) {

        res.status(400).send("Invalid" + error);

    }

    
    mongoose.disconnect()
}



//chat get request
module.exports.chat = async (req,res) => {


    res.render('chatpage',{name:req.query.valid})
}





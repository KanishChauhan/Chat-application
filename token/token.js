const jwt = require('jsonwebtoken');
const User = require('../models/user');


const reqAuthentication = (req,res,next)=>{

    try{

        const token = req.cookies.jwt;
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedUser)=>{
            if (err) {
                res.redirect('/signup',{error:"REGISTER FIRST"});
                
            }
            else{
                console.log('next')
                next();
                
            }
        }); 
    }catch(err){
        res.render('signup',{error:" USER NOT FOUND! REGISTER FIRST"});
        // res.redirect('')
    }
}

const reqNotAuthentication = (req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(token){
        res.redirect('/api/index');
    }
    if(!token){
        next();
    } 
}

module.exports = {reqAuthentication, reqNotAuthentication};


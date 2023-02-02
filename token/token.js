const jwt = require('jsonwebtoken');
const User = require('../models/user');


const reqAuthentication = (req,res,next)=>{

    try{

        const token = req.cookies.jwt;
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedUser)=>{
            // if (err) {
            //     res.redirect('/signup',{error:"REGISTER FIRST"});
                
            // }
            // else{
                console.log(decodedUser)
                let valid=decodedUser.first_name
                res.render('chatpage',{name:decodedUser.first_name});
                // res.redirect()
                // next();
                
            // }
        }); 
    }catch(err){
        res.render('signup',{error:" USER NOT FOUND! REGISTER FIRST"});
        // res.redirect('')
    }
}

const reqNotAuthentication = (req,res,next)=>{
   

    const token = req.cookies.jwt;

    // console.log(req.body)
    if(token){
        let obj=parseJwt(token)
        res.redirect('/chat?valid='+obj.email);
    }
    if(!token){
        next();
    } 
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

module.exports = {reqAuthentication, reqNotAuthentication};


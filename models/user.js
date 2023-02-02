
const { required } = require('joi');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const user=new mongoose.Schema({
    last_name:{type:String},
    first_name:{type:String},
    email:{
        type:String,
        required:true,
        minLength:11

    },
    
    password:{type:String,required:true},
    token: {
        type: String,
        default: null,
        max:255
    }

 },{versionKey: false})


//pre middlweware is used for hashing function call
user.pre('save',async function(next ){
    this.password=await bcrypt.hash(this.password,10)
    next()
    // console.log(this.password)
})

 const User=new mongoose.model('ExistingUsers',user)
module.exports=User

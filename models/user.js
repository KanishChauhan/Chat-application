
const { required } = require('joi');
const mongoose = require('mongoose');
const student=new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
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

 const Student=new mongoose.model('ExistingUsers',student)
module.exports=Student
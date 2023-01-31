    const mongoose=require('mongoose')

    const messageSchema= new mongoose.Schema({
        id:{type: String},
        sender:{type:String},
        sender:{type:String}
    },{timestamps:true})

    module.exports.user=mongoose.model('Message',messageSchema)
    
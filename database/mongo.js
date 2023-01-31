


const mongoose=require('mongoose')
const url='mongodb://127.0.0.1:27017/ChattingApp'
mongoose.set('strictQuery',true)
let db=mongoose.connect(url,{useNewUrlParser: true}).then(()=>{console.log('DATABASE CONNECTED')
})
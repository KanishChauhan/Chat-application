const express=require('express')

const app=express()
const path=require('path')
const hbs=require('express-handlebars')
const port=process.env.PORT ||8000;
const router=require('./router/router.js')
const jwt=require('jsonwebtoken')
// const mongo=require('./database/mongo.js')
app.engine('hbs',hbs.engine({extname:'.hbs'}))
app.set('view engine','hbs')
const http = require('http').createServer(app)
const cookie = require('cookie');

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
// console.log(path.join(__dirname,'public'))


//Database connection
require('./database/mongo.js')


//socket
const io= require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('SOCKET CONNECTED')
    
    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})




app.use('/',router)



// const token=jwt.sign({id:'kanish'},"asdjkahsidahbfiafnks")
// console.log(token)

http.listen(port,()=>{
    console.log('LISTENING TO THE PORT '+port)

})




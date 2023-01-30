const express=require('express')

const app=express()
const path=require('path')
const hbs=require('express-handlebars')
const port=process.env.PORT ||8000;
const router=require('./router/router.js')
// const mongo=require('./database/mongo.js')
app.engine('hbs',hbs.engine({extname:'.hbs'}))
app.set('view engine','hbs')

const http = require('http').createServer(app)
//socket
const io= require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('socket connect')
    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
console.log(path.join(__dirname,'public'))



app.use('/',router)



http.listen(port,()=>{
    console.log('listening on port '+port)

})



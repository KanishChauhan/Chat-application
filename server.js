const express=require('express')

const app=express()
const path=require('path')
const hbs=require('express-handlebars')
const port=process.env.PORT ||8000;
const router=require('./router/router.js')
// const mongo=require('./database/mongo.js')
app.engine('hbs',hbs.engine({extname:'.hbs'}))
app.set('view engine','hbs')



app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
console.log(path.join(__dirname,'public'))



app.use('/',router)



app.listen(port,()=>{
    console.log('listening on port '+port)

})



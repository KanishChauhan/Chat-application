const express=require('express')
const app=express()
const hbs=require('express-handlebars')
const port=process.env.PORT ||8000;
app.engine('handlebars',hbs.engine())
app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log('listening on port '+port)
})
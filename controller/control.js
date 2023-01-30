// app.use(mongo)
const mongoose=require('mongoose')
const url='mongodb://127.0.0.1:27017/ChattingApp'
mongoose.set('strictQuery',true)
let db=mongoose.connect(url,{useNewUrlParser: true}).then(()=>{console.log('connection established')
})


const student=new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        minLength:11
    },
    
    password:String

 },{versionKey: false})
const Student=new mongoose.model('ExistingUsers',student)



module.exports.findQ=async (req,res)=>{
    // console.log('first')
    let result=await Student.find({},(err,doc)=>{
if(!err){

    console.log(doc)
    res.render('chatpage')
}else{
    console.log('error'+err)
}
    }).clone().catch(function(err){ console.log(err)})
}

module.exports.signpage = (req,res)=>{
    res.render('signup')
}

module.exports.sign=(req,res)=>{
    // console.log('first')
    // let result=await Student.find({})
    const {first_name,last_name,email,password}=req.body
    adduser(first_name,last_name,email,password)
    // console.log(req.body.first_name)
    
    // console.log(result)
    
    res.render('signup')

    mongoose.disconnect(()=>{
        console.log('CONNECTION CLOSED')
    })
}

  
// adduser
const adduser=async (first_name,last_name,email,password)=>{
    // Student.create(
        const add1=new Student({
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password,
            
        })
        let result=await add1.save()
}


module.exports.login = async (req,res) => {
    // console.log(req.body)
    
    //    let result= await searching(email,password)
    
    const {email,password}=req.body
    // console.log(result)
    try{

        var result=await Student.findOne({email:email,password:password}).clone()
        res.render('chatpage',{name:result.first_name})
    }catch(err){
        res.render('error')
        
    }       
    
        


    
    
    
}

// const searching=async (email,password) => {
//     let result=await Student.findOne({email:email,password:password},function(err,result){
//         if(err) {
//             res.render('')
//         }
//     }).clone()
//     return result
// }

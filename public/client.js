const socket=io()


let bt=document.getElementById('bt')
bt.addEventListener('click',fun)
document.getElementById('textarea').addEventListener('keyup',(event)=>{
    
        if (event.key == "Enter") {
            // event.preventDefault();
            // let a=''
            // console.log(event.target.value.trim()=='');
            // console.log()
            

            fun()
        }
         
})

// document.getElementById('name').innerHTML=''

function fun(){
    var msg=document.getElementById('msg').value
    let nam=document.getElementById('username').lastElementChild.innerHTML    // let serverM={
        //     message:msg
        // }
        
        var dt = new Date();
var hours = dt.getHours() ; // gives the value in 24 hours format
var AmOrPm = hours >= 12 ? 'pm' : 'am';
hours = (hours % 12) || 12;
var minutes = dt.getMinutes() ;

if(minutes<10){
    minutes='0'+minutes
}
var finalTime = hours + ":" + minutes + " " + AmOrPm; 
        
        
        if(msg.trim()!=''){
            
            let div=document.createElement('div')
            let div3=document.createElement('div')
            // let div3=document.createElement('div')
        // console.log(nam)
        let div2=document.createElement('div')
        div.innerHTML=`<p>${nam} : ${msg}</p>`
        // div.innerHTML=
        div3.innerHTML=`<p>${finalTime}</p>`
        div2.classList.add('outg')
        div3.classList.add('time')
        div2.appendChild(div)
        div2.appendChild(div3)
        div.classList.add('outgoingmsg')
        let msgarea=document.getElementById('msgarea')
        msgarea.appendChild(div2)
        document.getElementById('msg').value=''
        div2.scrollIntoView();
        
        div2.scrollIntoView({behavior: "smooth"});
    }

    let obj={msg:msg, nam:nam,time:finalTime}
    // consoleg(msg)
    socket.emit('message',obj)
}


//recieve msg

socket.on('message',(obj)=>{
    // console.log(msg)
    // document.getElementById('name').innerHTML=`Chatting with ${obj.nam}`
    let div3=document.createElement('div')
    let div=document.createElement('div')
    div.innerHTML=`<p>${obj.nam} : ${obj.msg}</p>`
    // div.innerHTML=`<p>time</p>`
    div3.innerHTML=`<p>${obj.time}</p>`
    div.classList.add('incomingmsg')
    div3.classList.add('timeI')
    let msgarea=document.getElementById('msgarea')
    msgarea.appendChild(div)
    msgarea.appendChild(div3)

})
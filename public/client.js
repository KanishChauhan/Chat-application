const socket=io()



let bt=document.getElementById('bt')
bt.addEventListener('click',fun)
document.getElementById('textarea').addEventListener('keyup',(event)=>{
    
        if (event.key === "Enter") {
            // event.preventDefault();
            // console.log(event.target.value)
            fun()
        }
         
})


function fun(){
    var msg=document.getElementById('msg').value
// let serverM={
//     message:msg
// }
    if(msg!=''){

        let div=document.createElement('div')
        let div2=document.createElement('div')
        div.innerHTML=`<p>${msg}</p>`
        div2.classList.add('outg')
        div2.appendChild(div)
        div.classList.add('outgoingmsg')
        let msgarea=document.getElementById('msgarea')
        msgarea.appendChild(div2)
        document.getElementById('msg').value=''
    }
    // console.log(msg)
socket.emit('message', msg)
}


//recieve msg

socket.on('message',(msg)=>{
    // console.log(msg)
    let div=document.createElement('div')
    div.innerHTML=`<p>${msg}</p>`
    div.classList.add('incomingmsg')
    let msgarea=document.getElementById('msgarea')
    msgarea.appendChild(div)

})
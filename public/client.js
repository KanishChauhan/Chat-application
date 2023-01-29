let bt=document.getElementById('bt')
bt.addEventListener('click',fun)
bt.addEventListener('keypress',(event)=>{
    
        if (event.key === "Enter") {
            // event.preventDefault();
            fun()
        }
         
})


function fun(){
    var msg=document.getElementById('msg').value
    let div=document.createElement('div')
    div.innerHTML=`<p>${msg}</p>`
    div.classList.add('outgoingmsg')
    let msgarea=document.getElementById('outg')
    msgarea.appendChild(div)
    document.getElementById('msg').value=''
    console.log(msg)

}
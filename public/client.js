let bt=document.getElementById('bt')
bt.addEventListener('click',fun)

function fun(){
    var msg=document.getElementById('msg').value
    let div=document.createElement('div')
    div.innerHTML=`<p>${msg}</p>`
    div.classList.add('incomingmsg')
    let msgarea=document.getElementById('msgarea')
    msgarea.appendChild(div)
    console.log(msg)

}
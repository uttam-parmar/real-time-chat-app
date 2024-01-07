const socket=io()
let username;
let textarea=document.querySelector("#typemessage")
let messagearea=document.querySelector(".messagearea")
do {
    username=prompt("enter your name");
} while (!username);

textarea.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"){
        sendmessage(e.target.value)
    }
})

function sendmessage(message){
    let msg={
        user:username,
        message:message.trim()
    }

    appendmessage(msg,"outgoingmsg")
    textarea.value=""
    scroll()
    socket.emit("message",msg)
}

function appendmessage(msg,type){
    let div=document.createElement("div")
    let classname=type
    div.classList.add(classname,"message")
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    div.innerHTML=markup
    messagearea.appendChild(div)
}

socket.on("message",(msg)=>{
    appendmessage(msg,"incomingmsg")
    scroll()
})

function scroll(){
    messagearea.scrollTop=messagearea.scrollHeight
}
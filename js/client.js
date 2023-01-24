// const socket = io('http://localhost:8000');
const socket = io('http://localhost:8000',{transports:['websocket']});

const form = document.getElementById('send-container');
const messageInp =  document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('Notification.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

const names = prompt("Enter your name to join the chat...");
socket.emit('new-user-joined', names);


socket.on('user-joined', names =>{
    append(`${names} joined the chat`, 'centerJoined');
})

socket.on('receive', data =>{
    append(`${data.names}: ${data.message}`, 'left');
})

socket.on('leftChat', names =>{
    append(`${names} left the chat`, 'centerLeft');
})


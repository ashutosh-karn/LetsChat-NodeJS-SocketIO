// const socket = io('http://localhost:8000'); {doesn't work due to CORS policy}
const socket = io('http://localhost:8000',{transports:['websocket']});

//Get DOM in the respective JavaScript variables
const form = document.getElementById('send-container');
const messageInp =  document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//Notification tone which will play when a message is received
var audio = new Audio('Notification.mp3');

//Function which will append events information to the container
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

//Ask new user their name before joining, and let the server know
const names = prompt("Enter your name to join the chat...");
socket.emit('new-user-joined', names);

//If user joins, the server receives their name
socket.on('user-joined', names =>{
    append(`${names} joined the chat`, 'centerJoined');
})

//If server sends a message, it is received here
socket.on('receive', data =>{
    append(`${data.names}: ${data.message}`, 'left');
})

//If a user leaves the chat, append the information to the container
socket.on('leftChat', names =>{
    append(`${names} left the chat`, 'centerLeft');
})

//If the form is submitted, send the message to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})
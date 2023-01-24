//Node server which will handle socket io connections
const io = require('socket.io')(8000);
const users = {};

io.on('connection', socket =>{
    //If new user joins, broadcast joining message with users name to all other online members
    socket.on('new-user-joined', names=>{
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names);
    });
    //When a user sends a message, broadcast it to every joined user
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, names: users[socket.id]})
    });
    //If a user leaves the chat, broadcast it with that user's name
    socket.on('disconnect', message =>{
        socket.broadcast.emit('leftChat', users[socket.id])
        delete users[socket.id];
    });
    
})
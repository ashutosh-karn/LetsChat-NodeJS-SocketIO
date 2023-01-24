//Node server which will handle socket io connections
const io = require('socket.io')(8000);
const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', names=>{
        users[socket.id] = names;
        socket.broadcast.emit('user-joined', names);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, names: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('leftChat', users[socket.id])
        delete users[socket.id];
    });
    
})
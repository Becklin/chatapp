const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, getUser } = require('../server/users');

io.on('connection', (socket) => {
    console.log('we have connection!!!');
    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } =  addUser({ id: socket.id, name, room });
        if(error) return callback(error);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        // broadcast: send message to everyone besides to that user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});
        socket.join(user.room);
        callback();
    })
    socket.on('sendMessage', (message, callback) => {
        console.log('接收到了', message);
        const user = getUser(socket.id);
        //io.to要查
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    })

    socket.on('disconnect', () => {
        console.log('disconnect!!!');
    })
})


app.use(router);
server.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});


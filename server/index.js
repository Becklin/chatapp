const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { addUser, getUser, removeUser, getUsersInRoom } = require('../server/users');

io.on('connection', (socket) => {
    console.log('we have connection!!!');
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } =  addUser({ id: socket.id, name, room });
        if(error) return callback(error);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        // broadcast: send message to everyone besides to that user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});
        //要查
        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        //io.to要查
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })

    socket.on('disconnect', () => {
        console.log('disconnect!!!');
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        }
    })
})


app.use(router);
server.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});


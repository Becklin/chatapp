const express = require('express');
const socketio = require('socket.io');
var ss = require('socket.io-stream');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom
} = require('../server/users');
io.on('connection', socket => {
  console.log('we have connection!!!');

  //   fs.readFile(__dirname + '/images/img1.jpg', function(err, buf) {
  //     console.log(buf);
  //     socket.emit('image', { image: true, buffer: buf.toString('base64') });
  //     console.log('image file is initialized');
  //   });
  // let medium = '';
  // var readableStream = fs.createReadStream('../DigitalGlobe_QuickBird_60cm_8bit_RGB_DRA_Boulder_2005JUL04_8bits_sub_r_1.jpg');
  // readableStream.on('data', function(chunk) {
  //   console.log('強克', chunk);
  //   medium+=chunk;
  // });
  // readableStream.on('end', function() {
  //     console.log(medium);
  // });

  socket.on('join', ({ name, room }, errorCallback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return errorCallback(error);
    socket.join(user.room);
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.emit('image', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`
    });

    // broadcast: send message to everyone besides to that user
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });
    //要查
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    errorCallback();
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const isGoogleTyping = message.includes('@gg=');
    if (isGoogleTyping) {
      const destination = message.split('@gg=').pop();
      const addressDom = `<a target="blank" href='https://www.google.com.tw/maps/search/${destination}'>${destination}</a>`;
      io.to(user.room).emit('message', {
        user: user.name,
        text: null,
        address: addressDom
      });
      callback(); //奇怪
      return;
    }
    //io.to要查
    io.to(user.room).emit('message', { user: user.name, text: message });
    // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    callback(); //奇怪
  });

  // socket.on('sendFile', (data, callback) => {
  //   const user = getUser(socket.id);
  //   //io.to要查
  //   console.log('data', data); //自動轉換成bufferz
  //   io.to(user.room).emit('file', {
  //     user: user.name,
  //     upload: data.buf.toString('base64'),
  //     type: data.type
  //   });
  //   callback();
  // });
  ss(socket).on('sendFile', (stream, data) => {
    console.log('data', data);
    console.log('stream', stream);
    const user = getUser(socket.id);
    //io.to要查
    const filename = path.basename(data.name);
    console.log('filename', filename);
    stream.pipe(fs.createWriteStream(filename));
    // io.to(user.room).emit('file', {
    //   user: user.name,
    //   upload: data.buf.toString('base64'),
    //   type: data.type
    // });
    // callback();
  });
  socket.on('disconnect', () => {
    console.log('disconnect!!!');
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`
      });
    }
  });
});

app.use(router);
server.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});

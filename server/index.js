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

  // 方法零 一次整個傳輸
  //   fs.readFile(__dirname + '/images/img1.jpg', function(err, buf) {
  //     console.log(buf);
  //     socket.emit('image', { image: true, buffer: buf.toString('base64') });
  //     console.log('image file is initialized');
  //   });

  // 方法一利用pipepipe就是寫進去的動作
  // let readableStream = fs.createReadStream('./images/img2.jpg');
  // let writableStream = fs.createWriteStream('./images/testimg2.jpg');
  // readableStream.on('data', function (chunk) {
  //   console.log(chunk);
  // })
  // readableStream.pipe(writableStream);
  // readableStream.on('end', function(chunk) {
  //   console.log('結束');
  // });

  // 方法二
  // var sourceStream = fs.createReadStream('./images/img1.jpg');
  // var sinkStream = fs.createWriteStream('./images/testimg1.jpg');
  // sourceStream.on('data', function (chunk) {
  //   console.log(chunk);
  //   sinkStream.write(chunk);
  // }).on('end', function () {
  //   sinkStream.end();
  // });

  //來玩玩socket.io-stream
  ss(socket).on('sendFile', function(stream, data) {
    console.log('data', data);
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  });





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
  ss(socket).on('sendFile_bak', (stream, data) => {
    console.log('data', data);
    console.log('stream', stream);
    const user = getUser(socket.id);
    //io.to要查
    const filename = path.basename(data.name);
    console.log('filename', filename);
    stream.on('data', (chunk) => {
      console.log(chunk);
    })
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

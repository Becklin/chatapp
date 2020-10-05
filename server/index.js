require('dotenv').config();

const express = require('express');
const socketio = require('socket.io');
var ss = require('socket.io-stream');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const AppError = require('./utils/AppError');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});

// provides Express middleware to enable CORS
const corsOptions = {
  // origin: `http://localhost:${PORT}`
  origin: 'http://localhost:3000'
};
// provides Express middleware to enable CORS
app.use(cors(corsOptions));

// parse requests of content-type - application/json
// body-parser helps to parse the request and create the req.body object
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/index.routes')(app);

// const app_setting = require('./app.json');
// console.log('app_setting', app_setting);
// const uri = `mongodb+srv://beckLin:${app_setting.MONGO_PW}@cluster1.juqcg.mongodb.net/${app_setting.MONGO_DB}?retryWrites=true&w=majority`;
// console.log(' uri', uri);
// const db = require('./models');
// const Role = db.role;
// db.mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('Successfully connect to MongoDB.');
//     initial();
//   })
//   .catch(err => {
//     console.error('Connection error', err);
//     process.exit();
//   });

const initial = () => {
  /* Returns the count of all documents in a collection or view.
  The method wraps the count command. */
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        // create a new User: object.save()
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY
});
// let myBucket = 'eazychat';
// let myKey = 'test';
// s3.createBucket({ Bucket: myBucket }, function(err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     params = { Bucket: myBucket, Key: myKey, Body: "Hello!" };

//     s3.putObject(params, function(err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// });

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
  // ss(socket).on('sendFile', function(stream, data) {
  //   console.log('data', data);
  //   var filename = path.basename(data.name);
  //   stream.pipe(fs.createWriteStream(filename));
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

  /* 可用的snippet
  socket.on('sendFile', (file, data, callback) => {
    const user = getUser(socket.id);
    //io.to要查
    console.log('file', file); //自動轉換成buffer
    console.log('data', data); //自動轉換成buffer
    io.to(user.room).emit('file', {
      user: data.name,
      upload: file.toString('base64'),
      type: data.type
    });
    callback();
  });
  */

  const uploadFileToAws = (bufferData, fileName, userName) => {
    const params = {
      Bucket: 'easychat', // pass your bucket name
      Key: fileName, // file will be saved as testBucket/contacts.csv
      Body: bufferData //JSON.stringify(data, null, 2)
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`上傳成功位子在 ${data.Location}`);
    });
  };

  ss(socket).on('sendFile', (stream, data, callback) => {
    const user = getUser(socket.id);
    //io.to要查
    // const filename = path.basename(data.name);
    let size = 0;
    let fileBuffer = [];
    stream.on('data', chunk => {
      size += chunk.length;
      console.log(Math.floor((size / data.size) * 100) + '%');
      fileBuffer.push(chunk);
    });
    stream.on('end', () => {
      /* TODO 以上會在上傳到aws，上傳前直接在前端把圖檔preview就好，以下可以不用作
    右邊為轉成webP技巧網站 https://css-tricks.com/using-webp-images/ */
      // stream.on("end", () => {
      const sentFile = Buffer.concat(fileBuffer).toString('base64');
      io.to(user.room).emit('file', {
        user: user.name,
        upload: sentFile,
        type: data.type
      });
    });

    // stream.pipe(fs.createWriteStream(filename));

    // });
    //來玩玩socket.io-stream
    // ss(socket).on('sendFile', function(stream, data) {
    //   console.log('data', data);
    //   var filename = path.basename(data.name);
    //   stream.pipe(fs.createWriteStream(filename));
    // });
    callback && callback();
  });

  ss(socket).on('uploadFile', (stream, data, callback) => {
    const user = getUser(socket.id);
    //io.to要查
    // const filename = path.basename(data.name);
    let size = 0;
    let fileBuffer = [];
    stream.on('data', chunk => {
      size += chunk.length;
      console.log(Math.floor((size / data.size) * 100) + '%');
      fileBuffer.push(chunk);
    });
    stream.on('end', () => {
      const BufferData = Buffer.concat(fileBuffer);
      uploadFileToAws(BufferData, data.name, user.name);
      /* TODO 以上會在上傳到aws，上傳前直接在前端把圖檔preview就好，以下可以不用作
    右邊為轉成webP技巧網站 https://css-tricks.com/using-webp-images/ */
    });

    // stream.pipe(fs.createWriteStream(filename));

    // });
    //來玩玩socket.io-stream
    // ss(socket).on('sendFile', function(stream, data) {
    //   console.log('data', data);
    //   var filename = path.basename(data.name);
    //   stream.pipe(fs.createWriteStream(filename));
    // });
    callback && callback();
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

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// error handler middleware
app.use((error, req, res, next) => {
  console.log('這裏', error, '===', error.status, '===');
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
});

server.listen(PORT, () => {
  console.log('2=', PORT);
  console.log(`listening ${PORT}`);
});

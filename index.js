require('dotenv').config();
const cluster = require('cluster'); // Only required if you want the worker id
const sticky = require('sticky-session');
const server = require('http').createServer(function (req, res) {
  console.log('server: ', server);
});

const childProcess = () => {
  const express = require('express');
  const ss = require('socket.io-stream');

  const bodyParser = require('body-parser');
  const cors = require('cors');
  const path = require('path');
  const app = express();
  const io = require('socket.io')(server);
  const AppError = require('./utils/AppError');
  const { v4: uuid } = require('uuid');
  const Message = require('./utils/Message');

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

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  require('./routes/index.routes')(app);

  const uri = `mongodb+srv://beckLin:${process.env.MONGO_PW}@cluster1.juqcg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const db = require('./models');
  const Role = db.role;
  db.mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Successfully connect to MongoDB.');
      initial();
    })
    .catch(err => {
      console.error('Connection error');
      // process.exit();
    });

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

  const { addUser, getUser, removeUser, getUsersInRoom } = require('./users');
  io.on('connection', socket => {
    console.log('we have connection!!!');
    console.log('socketio', socket.id, 'process.pid', process.pid);
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

    socket.on('join', ({ name, room }, errorCallback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return errorCallback(error);
      socket.join(user.room);

      socket.emit(
        'message',
        Message({
          id: uuid(),
          type: 'text',
          content: `${user.name}, welcome to the room ${user.room}`,
          user: 'admin',
          // name,
          //percent,
          date: new Date()
        })
      );

      // broadcast: send message to everyone besides to that user
      // socket跟io都可以to https://socket.io/docs/rooms/, 但是socket發出不會傳個自己
      console.log('房間', user.room, user.name);
      socket.broadcast.to(user.room).emit(
        'message',
        Message({
          id: uuid(),
          type: 'text',
          content: `${user.name} has joined!`,
          user: 'admin',
          date: new Date()
        })
      );
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
      errorCallback();
    });
    socket.on('sendMessage', (text, callback) => {
      const user = getUser(socket.id);
      const isGoogleTyping = text.includes('@gg=');
      const addressDom = '';

      if (isGoogleTyping) {
        const destination = text.split('@gg=').pop();
        addressDom = `<a target="blank" href='https://www.google.com.tw/maps/search/${destination}'>${destination}</a>`;
      }
      io.to(user.room).emit(
        'message',
        Message({
          id: uuid(),
          type: 'text',
          content: text,
          user: user.name,
          date: new Date(),
          address: addressDom
        })
      );
      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      callback(); //奇怪
    });

    const AWS = require('aws-sdk');

    const uploadFileToAws = (bufferData, fileName, userName) => {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
        apiVersion: 'test-1027'
      });
      const pathFileName = path.basename(fileName);
      const params = {
        Bucket: 'easychat', // pass your bucket name
        Key: pathFileName, // file will be saved as testBucket/contacts.csv
        Body: bufferData //JSON.stringify(data, null, 2)
      };

      s3.upload(params, function (err, data) {
        if (err) throw err;
        console.log('資料', data);
        console.log(`上傳成功位子在  ${data.Location}`);
      });
    };

    ss(socket).on('sendFile', (stream, data, callback) => {
      const user = getUser(socket.id);
      // const filename = path.basename(data.name);
      let size = 0;
      let fileBuffer = [];
      const id = uuid();
      stream.on('data', chunk => {
        size += chunk.length;
        io.to(user.room).emit('percent', (size / data.size) * 100, {
          user: user.name,
          type: data.type,
          id: id
        });
        //TODO要再寄通知到前端 > 注意NODE EVENTLOOP 優先權 !!!
        fileBuffer.push(chunk);
      });
      stream.on('end', () => {
        /* TODO 以上會在上傳到aws，上傳前直接在前端把圖檔preview就好，以下可以不用作
      右邊為轉成webP技巧網站 https://css-tricks.com/using-webp-images/ */
        const sentFile = Buffer.concat(fileBuffer).toString('base64');
        io.to(user.room).emit('file', {
          user: user.name,
          upload: sentFile,
          type: data.type,
          id
        });
      });
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
        console.log('要上傳了!!!!!!!!!!!!!!!!!!!!!!!!!!!!', BufferData);
        console.log(data, user);
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
        io.to(user.room).emit(
          'message',
          Message({
            id: uuid(),
            type: 'text',
            content: `${user.name} has left.`,
            user: 'admin',
            date: new Date()
          })
        );
      }
    });
  });

  app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error'
      }
    });
  });
};

const PORT = process.env.PORT || 5000;
server.listen(PORT);

const os = require('os');
sticky.listen() will return false if Master

if (!sticky.listen(server, PORT)) {
  // Master code
  server.once('listening', function () {
    console.log(`server started on ${PORT} port`);
  });
} else {
  // Worker code
  console.log('i am worker', cluster.worker.id);
/**
 *  For multiple processes service, Heroku may have extra charge in production; otherewiese,
 *  we may get this https://devcenter.heroku.com/articles/error-codes#h22-connection-limit-reached due to free dyno
 */
childProcess();
}

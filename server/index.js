// const cluster = require("cluster"); // Only required if you want the worker id
// const sticky = require("sticky-session");
// const server = require("http").createServer(function (req, res) {
//   console.log("server: ", server);
// });

const {
  MONGO_PW,
  MONGO_DB,
} = process.env;

const childProcess = () => {
  const plusOne = require('./test');
  const cal = plusOne();
  console.log('test', cal());


  const dev_uri = `mongodb+srv://beckLin:${MONGO_PW}@cluster1.juqcg.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
  const db = require('./models');
  const Role = db.role;
  db.mongoose
    .connect(dev_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('成功Successfully connect to MongoDB.');
      initial();
      const ExpressLoader = require( "./loaders/expressLoader" );
      new ExpressLoader();
    })
    .catch(err => {
      console.error('Connection error', err);
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
};


const os = require('os');

//sticky.listen() will return false if Master

// if (!sticky.listen(server, PORT)) {
//   // Master code
//   server.once("listening", function () {
//     console.log(`server started on ${PORT} port`);
//   });
// } else {
//   // Worker code
//   console.log("i am worker", cluster.worker.id);
/**
 *  For multiple processes service, Heroku may have extra charge in production; otherewiese,
 *  we may get this https://devcenter.heroku.com/articles/error-codes#h22-connection-limit-reached due to free dyno
 */
childProcess();
// }

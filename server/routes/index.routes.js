const AppError = require('../utils/AppError');
const main = require('./main.routes');
const user = require('./user.routes');
const auth = require('./auth.routes');

module.exports = app => {
  main(app);
  user(app);
  auth(app);
};

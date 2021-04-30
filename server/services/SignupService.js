// services/SignupService.js
const db = require('../models');
const User = db.user;
var bcrypt = require('bcryptjs');

class SignupService {
  /**
   * @description Create a user of SignupService
   */
  constructor() {
    // this.MongooseServiceInstance = new MongooseService(PostModel);
  }
  /**
   * @description Attempt to create a post with the provided object
   * @param postToCreate {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async create({ username, email, password }) {
    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 8)
    });
    user.save((err, user) => {
      console.log('ser.save', user);
      if (err) {
        console.log('有錯');
        res.status(500).send({ message: err });
        return false;
      }
      console.log("created successfully")
    });
  }
}

module.exports = SignupService;
// services/SignupService.js
var bcrypt = require('bcryptjs');

class SignupService {
  /**
   * @description Create a user of SignupService
   */
  constructor(userModel) {
    this.userModel = userModel;
    // this.MongooseServiceInstance = new MongooseService(PostModel);
  }
  /**
   * @description Attempt to create a post with the provided object
   * @param postToCreate {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  create({ username, email, password }) {
    const user = new this.userModel({
      username,
      email,
      password: bcrypt.hashSync(password, 8)
    });
    return new Promise((resolve, reject) => {
      user.save((err, user) => {
        if (err) {
          console.log('有錯');
          res.status(500).send({ message: err });
          reject(err)
        }
        console.log("created successfully")
        resolve(true);
      });
    })
  }
}

module.exports = SignupService;
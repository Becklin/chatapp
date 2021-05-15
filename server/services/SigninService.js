// services/SignupService.js
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

class SigninService {
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
    signin({ username, password }, res) {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({
                username
            })
                /**
                 * 在定義Schema的時候，如果設定某個 field 關聯另一個Schema，
                 * 那麼在獲取 document 的時候就可以使用 Population 功能通過關聯Schema的 field 找到關聯的另一個 document，
                 * 並且用被關聯 document 的內容替換掉原來關聯欄位(field)的內容。
                 * https://codertw.com/%E8%B3%87%E6%96%99%E5%BA%AB/18236/
                 */
                .exec((err, user) => {
                    console.log("user", user);
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (!user) {
                        return res.status(404).send({ message: 'User Not found.' });
                    }
                    var passwordIsValid = bcrypt.compareSync(
                        password,
                        user.password
                    );
                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: 'Invalid Password!'
                        });
                    }
                    var token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });

                    res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        accessToken: token
                    });
                    resolve({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        accessToken: token
                    });
                });
        })
    }
}

module.exports = SigninService;
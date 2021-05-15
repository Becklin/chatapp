const SignupService = require( "../services/SignupService" );
const SigninService = require( "../services/SigninService" );

// get the reference of EventEmitter class of events module
var events = require('events');
const db = require('../models');
const UserModel = db.user;
//create an object of EventEmitter class by using above reference
var em = new events.EventEmitter();

em.on('user_signup', ({ user }) => {
    console.log("we have sent email to you");
  })

const SignupServiceInstance = new SignupService(UserModel); //Dependency Injection
/**
 * @description Create a cord with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function signupUser ( req, res ) {
  try {
    // We only pass the body object, never the req object
    await SignupServiceInstance.create( req.body );
    em.emit('user_signup', { user: req.body })
    return res.send( { message: 'User was registered successfully!' } );
  } catch ( err ) {
    console.log("err", err);
    res.status( 500 ).send( err );
  }
}
exports.signup = signupUser;

const SigninServiceInstance = new SigninService(UserModel);
/**
 * @description Login in
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function signinUser ( req, res ) {
  try {
    // We only pass the body object, never the req object
    await SigninServiceInstance.signin( req.body, res );
    return res.send( { message: 'You has signed in successfully!' } );
  } catch ( err ) {
    console.log("err", err);
    res.status( 500 ).send( err );
  }
}
exports.signin = signinUser;

// exports.signin = (req, res) => {
//   UserModel.findOne({
//     username: req.body.username
//   })
//     /**
//      * 在定義Schema的時候，如果設定某個 field 關聯另一個Schema，
//      * 那麼在獲取 document 的時候就可以使用 Population 功能通過關聯Schema的 field 找到關聯的另一個 document，
//      * 並且用被關聯 document 的內容替換掉原來關聯欄位(field)的內容。
//      * https://codertw.com/%E8%B3%87%E6%96%99%E5%BA%AB/18236/
//      */
//     .exec((err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (!user) {
//         return res.status(404).send({ message: 'User Not found.' });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         req.body.password,
//         user.password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: 'Invalid Password!'
//         });
//       }

//       var token = jwt.sign({ id: user.id }, config.secret, {
//         expiresIn: 86400 // 24 hours
//       });
//       res.status(200).send({
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         accessToken: token
//       });
//     });
// };

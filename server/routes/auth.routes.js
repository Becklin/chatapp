const verifySignUp = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  // app.use(function(req, res, next) {
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'x-access-token, Origin, Content-Type, Accept'
  //   );
  //   next();
  // });
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};

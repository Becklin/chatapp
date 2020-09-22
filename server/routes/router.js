const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.send("router is all set and server is running");
});

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
console.log(controller.signup);
router
  .route("/api/auth/signup")
  .post(
    controller.signup
  );

router
  .route("/api/auth/signin")
  .post(controller.signin);

module.exports = router;

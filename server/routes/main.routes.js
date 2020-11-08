module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("router is all set and server is running");
  });
};

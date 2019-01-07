const auth = require("./controllers/authentication");
const passport = require("passport");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { sesson: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = app => {
  app.get("/", requireAuth, (req, res, next) => {
    res.send("Hello World");
  });
  app.post("/signin", requireSignIn, auth.signin);
  app.post("/signup", auth.signup);
};
